import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  category = {} as Category;
  categories: Category[] = [];
  id: string = '';

  checkoutForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {}

  cancelCategory(){
    this.router.navigate(['/categories'])
  }

  onSubmit(): void {
    this.category = this.checkoutForm.value;
    this.categoryService.saveCategory(this.category).subscribe((res: Category) =>{
      this.router.navigate(['/categories'])
    })    
  }

}
