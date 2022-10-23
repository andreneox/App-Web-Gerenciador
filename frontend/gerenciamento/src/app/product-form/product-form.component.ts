import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { ProductFormService } from '../services/product-form.service';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product = {} as Product;
  category = {} as Category;
  products: Product[] = [];
  categories: Category[] = [];
  

  constructor(private productService: ProductFormService, 
            private categoryService: CategoryService,
            private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.getCategories();
  }

  // defini se um produto será criado ou atualizado
  saveProduct(form: NgForm) {
    if (this.product.id !== undefined) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.productService.saveProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }


  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getCategories();
    form.resetForm();
    this.product = {} as Product;
  }

  test(product: Product){
    console.log(product)
  }


  

}
