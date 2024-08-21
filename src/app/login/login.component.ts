import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.userService.login(email, password).subscribe((response) => {
      console.log('Login successful:', response);
      localStorage.setItem('authToken', response.token);
    });
  }
}
