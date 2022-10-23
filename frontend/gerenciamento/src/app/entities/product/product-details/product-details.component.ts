import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { ProductFormService } from '../../../services/product-form.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product = {} as Product;
  category = {} as Category;
  categories: Category[] = [];
  id: string = '';
  response: HttpStatusCode = 505;
  

  checkoutForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    serie: [0, Validators.required],
    category_id: [0, Validators.required]
  });

  constructor(private productService: ProductFormService, 
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.getCategories();
    this.getProductById(parseInt(this.id))
  }

  // pega o produto para ser editado por id
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe((product: Product) => {
      this.product = product;
      this.checkoutForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        serie: this.product.serie,
        category_id: this.product.category_id
      })
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  cancelProduct(){
    this.router.navigate(['/products'])
  }

  onSubmit(): void {
    this.product = this.checkoutForm.value;
    this.product.id = parseInt(this.id);
    this.productService.updateProduct(this.product).subscribe((res: Product) =>{
      this.router.navigate(['/products'])
    })    
  }

}
