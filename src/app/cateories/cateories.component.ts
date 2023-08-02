import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-cateories',
  templateUrl: './cateories.component.html',
  styleUrls: ['./cateories.component.css'],
})
export class CateoriesComponent implements OnInit {
  categoryArray?: any[];
  formCategory: any;
  formStatus: any = 'Add';
  categoryId: any;
  constructor(private categoryServices: CategoriesService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoryServices.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }
  onSubmit(formData: any) {
    // console.log(formData.value)
    let categoryData: Category = {
      category: formData.value.category,
    };
    if (this.formStatus == 'Add') {
      this.categoryServices.saveData(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryServices.updateData(this.categoryId, categoryData);
      formData.reset();
    }
  }

  onEdit(category: any, id: any) {
    console.log(category);
    this.formCategory = category;
    this.categoryId = id;
    this.formStatus = 'Edit';
  }
  onDelete(id:any){
    this.categoryServices.daleteDate(id)
  }
}
