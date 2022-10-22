import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0 ,
    serie: 0
  };
  submitted = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

}
