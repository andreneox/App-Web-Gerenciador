import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor (
    private productService: ProductService
  ) {  }


  

  loadAll = () => {
    this.products$ = this.productService.findAll();
  }

  ngOnInit(): void {
    this.products$ = this.productService.findAll();
  }
} 