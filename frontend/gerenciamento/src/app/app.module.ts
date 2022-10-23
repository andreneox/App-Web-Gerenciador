import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './entities/product/product-form/product-form.component';
import { ProductListComponent } from './entities/product/product-list/product-list.component';
import { ProductDetailsComponent } from './entities/product/product-details/product-details.component';
import { CategoryFormComponent } from './entities/category/category-form/category-form.component';
import { CategoryDetailsComponent } from './entities/category/category-details/category-details.component';
import { CategoryListComponent } from './entities/category/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CategoryFormComponent,
    CategoryDetailsComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }