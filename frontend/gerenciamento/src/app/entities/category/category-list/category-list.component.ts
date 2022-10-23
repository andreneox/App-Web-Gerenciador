import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  category = {} as Category;
  
  constructor(
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  // Chama o serviço para obtém todos os produtos
  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;      
    });
  }

  editCategory(category: Category){
    this.router.navigate(['/category',category.id])
  }

  newCategory(){
    this.router.navigate(['/category'])
  }

  // deleta um produto
  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category).subscribe(() => {
      this.getCategories();
    });
  }

}
