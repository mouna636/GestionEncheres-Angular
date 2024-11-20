import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,NgFor], 
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent {
  categories:any={};
  constructor(private router: Router,private categorieService:CategoriesService){}
    ngOnInit() {
     this.getAllCategories();
    }
    getAllCategories(){
      this.categorieService.getCategories().subscribe(
      (data) => {
  this.categories=data;
  console.log(data)
  this.router.navigate(['/list-categorie'])
        }
      )
    }
  
}
