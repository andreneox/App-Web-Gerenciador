import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { ProductFormService } from '../../../services/product-form.service';
import { Product } from '../../../models/product';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product = {} as Product;
  category = {} as Category;
  categories: Category[] = [];
  id: string = '';


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
    this.getCategories();
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
    this.productService.saveProduct(this.product).subscribe((res: Product) =>{
      this.router.navigate(['/products'])
    })    
  }

}
