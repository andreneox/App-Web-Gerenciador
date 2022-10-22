import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { NgForm } from '@angular/forms';
import { ProductFormService } from '../services/product-form.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = {} as Product;
  category = {} as Category;
  products: Product[] = [];
  categories: Category[] = [];

  constructor(private productService: ProductFormService, 
            private categoryService: CategoryService) {}
  
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

  // Chama o serviço para obtém todos os produtos
  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    
  }

  // deleta um produto
  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.getProducts();
    });
  }

  // copia o produto para ser editado.
  editProduct(product: Product) {
    this.product = { ...product };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getProducts();
    form.resetForm();
    this.product = {} as Product;
  }

  test(product: Product){
    console.log(product)
  }


  

}
