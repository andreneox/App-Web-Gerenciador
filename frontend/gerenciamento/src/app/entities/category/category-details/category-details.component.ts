import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  category = {} as Category;
  categories: Category[] = [];
  id: string = '';
  response: HttpStatusCode = 505;
  

  checkoutForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.getCategoryById(parseInt(this.id))
  }

  // pega o produto para ser editado por id
  getCategoryById(id: number) {
    this.categoryService.getCategoryById(id).subscribe((category: Category) => {
      this.category = category;
    });
  }

  cancelCategory(){
    this.router.navigate(['/categories'])
  }

  onSubmit(): void {
    this.category = this.checkoutForm.value;
    this.category.id = parseInt(this.id);
    this.categoryService.updateCategory(this.category).subscribe((res: Category) =>{
      this.router.navigate(['/categories'])
    })    
  }
}
