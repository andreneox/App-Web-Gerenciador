import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { ProductFormService } from '../services/product-form.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { Category } from '../models/category';

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
  
  checkoutForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    serie: [0, Validators.required],
    category_id: [0, Validators.required],
  });

  constructor(private productService: ProductFormService, 
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

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
      });
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}
