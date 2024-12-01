import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { CommonModule, NgFor } from '@angular/common';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule,NgFor,SideBarComponent,TopBarComponent], 
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent {
  
  categories: any[] = [];
  constructor(private router: Router,private categorieService:CategoriesService,private http:HttpClient){}
    ngOnInit() {
     this.getAllCategories();
    }
    getAllCategories(){
      this.categorieService.getCategories().subscribe(
      (data) => {
  this.categories=data;
  console.log(data)
  this.router.navigate(['/list-category'])
        }
      )
    }
    deleteCategory(id: number) {
      this.http.delete(`http://localhost:3000/categories/${id}`)
        .subscribe(
          () => {
            console.log("Produit supprimé avec succès");
            this.categories = this.categories.filter(c => c.id !== id);
          },
         
        );
    }


  
}
