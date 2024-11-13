import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],

  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [AuthService],
})
export class SigninComponent {
  user: any = {
    username: '',

    password: '',
  };
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    if (this.validateForm()) {
      this.authService.login(this.user).subscribe({
        next: (res) => {
          console.log('res', res);
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          console.log('err', err.message);
        },
      });
    }
  }

  private validateForm(): boolean {
    // Additional custom validation can be added here
    return true;
  }
}
