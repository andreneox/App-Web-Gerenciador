import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(value: {name: string, price: number, serie: number}): void {
    for(const key in this.validateForm.controls){
      if(this.validateForm.controls.hasOwnProperty(key)){
        this
      }
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
