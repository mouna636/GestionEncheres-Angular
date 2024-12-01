import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnchereService } from '../../../core/services/enchere.service';
import { Enchere } from '../../../core/models/Enchere';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-enchere-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, TitleCasePipe],
  templateUrl: './enchere-form.component.html',
})
export class EnchereFormComponent implements OnInit {
  enchereForm: FormGroup;
  statusOptions = [
    'upcoming',
    'cancelled',
    'sold',
    'running',
    'paused',
    'ended',
  ];

  products: any[] = [];
  selectedFile: File | null = null;
  enchere!: Enchere;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private enchereService: EnchereService,
    private http: HttpClient
  ) {
    this.enchereForm = this.fb.group({
      id: [{ value: null, disabled: true }], // ID field is disabled
      title: ['', Validators.required],
      description: [''],
      product: [null, Validators.required],
      startDate: ['', Validators.required],
      duration: ['', Validators.required],
      status: ['upcoming', Validators.required],
      image: [''],
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.fetchProducts();
    if (id) {
      this.enchereService.getEnchere(id).subscribe((enchere) => {
        this.enchere = enchere;
        this.populateForm();
      });
    }
  }

  fetchProducts() {
    this.http.get('http://localhost:3000/products').subscribe({
      next: (res) => {
        console.log('Products:', res);

        this.products = res as any[];
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  populateForm() {
    this.enchereForm.patchValue({
      title: this.enchere.title,
      description: this.enchere.description,
      productId: this.enchere.product,
      startDate: this.enchere.startDate,
      duration: this.enchere.duration,
      status: this.enchere.status,
      image: this.enchere.image,
    });
  }

  onSubmit() {
    if (this.enchereForm.valid) {
      console.log('Form data:', this.enchereForm.value);

      const formData = new FormData();
      console.log('Form data:', this.enchereForm.value);

      Object.keys(this.enchereForm.controls).forEach((key) => {
        if (key === 'product') {
          const prod = JSON.stringify(this.enchereForm.get(key)?.value);
          formData.append(key, prod);
        } else {
          const controlValue = this.enchereForm.get(key)?.value;
          formData.append(key, controlValue);
        }
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Log the form data to verify its content
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.enchereService.createEnchere(formData).subscribe({
        next: (res) => {
          console.log('Enchere saved:', res);
        },
        error: (error) => {
          console.error('Error saving enchere:', error);
        },
      });
    }
  }
}
