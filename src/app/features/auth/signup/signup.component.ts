import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { countries } from '../../../core/store/create-country.store';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [AuthService],
})
export class SignupComponent {
  public countries: any = countries;
  selectedCountry: any = null;
  user: any = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    country: '',
    countryid: '',
    tempCountry: {},
  };
  constructor(private authService: AuthService) {}
  onSubmit() {
    if (this.validateForm()) {
      console.log('Form Submitted', this.user);
      const user = {
        ...this.user,
        country: this.user.tempCountry.name,
        countryid: this.user.tempCountry.code,
      };

      delete user.tempCountry;
      console.log('user', user);

      this.authService.register(user).subscribe({
        next: (res) => {
          console.log('res', res);
        },
        error: (err) => {
          console.log('err', err);
        },
      });
    }
  }

  private validateForm(): boolean {
    // Additional custom validation can be added here
    return true;
  }
}
