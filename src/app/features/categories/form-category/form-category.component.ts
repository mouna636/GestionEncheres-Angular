import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule,NgIf], 
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private router: Router
  ) {
   
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addCategory(): void {
    if (this.categoryForm.invalid) {
      return; 
    }

    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: () => {
        console.log('Catégorie ajoutée avec succès');
        console.log(this.categoryForm.value)
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la catégorie :', err);
      },
    });
  }
}
