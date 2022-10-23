import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './entities/product/product-form/product-form.component';
import { ProductListComponent } from './entities/product/product-list/product-list.component';
import { ProductDetailsComponent } from './entities/product/product-details/product-details.component';
import { CategoryFormComponent } from './entities/category/category-form/category-form.component';
import { CategoryDetailsComponent } from './entities/category/category-details/category-details.component';
import { CategoryListComponent } from './entities/category/category-list/category-list.component';

const routes: Routes = [
  { path: 'product', component: ProductFormComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'category', component: CategoryFormComponent },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: 'categories', component: CategoryListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
