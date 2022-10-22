import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { GerenciamentoCategoriaComponent } from './components/gerenciamento-categoria/gerenciamento-categoria.component'; 
import { DispositivoGestaoComponent } from './components/dispositivo-gestao/dispositivo-gestao.component';
import { ProductFormComponent } from './product-form/product-form.component'; 





@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    AddProductComponent,
    GerenciamentoCategoriaComponent,
    DispositivoGestaoComponent,
    ProductFormComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
