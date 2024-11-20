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
import { HttpClientModule } from '@angular/common/http';

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
    'open',
    'closed',
    'cancelled',
    'sold',
    'draft',
    'scheduled',
    'running',
    'paused',
    'ended',
  ];
  selectedFile: File | null = null;
  enchere!: Enchere;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private enchereService: EnchereService
  ) {
    this.enchereForm = this.fb.group({
      id: [{ value: null, disabled: true }], // ID field is disabled
      title: ['', Validators.required],
      description: [''],
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
    if (id) {
      this.enchereService.getEnchere(id).subscribe((enchere) => {
        this.enchere = enchere;
        this.populateForm();
      });
    }
  }

  populateForm() {
    this.enchereForm.patchValue({
      title: this.enchere.title,
      description: this.enchere.description,
      startDate: this.enchere.startDate,
      duration: this.enchere.duration,
      status: this.enchere.status,
      image: this.enchere.image,
    });
  }

  onSubmit() {
    if (this.enchereForm.valid) {
      const formData = new FormData();
      console.log('Form data:', this.enchereForm.value);

      Object.keys(this.enchereForm.controls).forEach((key) => {
        formData.append(key, this.enchereForm.get(key)?.value);
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
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
