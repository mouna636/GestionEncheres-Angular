import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorie } from '../../categories/categorie';
import { ProductService } from '../product.service';
import { CategoriesService } from '../../categories/categories.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule], 
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: any;
  selectedFile: File | null = null;
  categories: Categorie[] = []; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoriesService,private router:Router
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      image: [null]  
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.addProductForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.addProductForm.value.name);
    formData.append('description', this.addProductForm.value.description);
    formData.append('price', this.addProductForm.value.price);
    formData.append('category', this.addProductForm.value.category);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.productService.addProductWithImage(formData).subscribe(
      (response) => {
        console.log('Produit ajouté:', response);
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit:', error);
      }
    );
  }
}
