import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { ProductFormService } from '../../../services/product-form.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  product = {} as Product;
  products: Product[] = [];
  category = {} as Category;
  
  constructor(private productService: ProductFormService,
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // Chama o serviço para obtém todos os produtos
  getProducts() {
    
    this.productService.getProducts().subscribe((products: Product[]) => {
      products.map(prod => {
        this.categoryService.getCategoryById(prod.category_id).subscribe((cat: Category) =>{
          prod.category_name = cat.name
        })
        return prod.category_name = this.category.name;
      })
      this.products = products;      
    });
  }

  editProduct(product: Product){
    this.router.navigate(['/product',product.id])
  }

  newProduct(){
    this.router.navigate(['/product'])
  }

  // deleta um produto
  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.getProducts();
    });
  }

}
