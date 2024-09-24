import { Component, Injector, ProviderToken } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from './http.service';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,
     ReactiveFormsModule,
    LoginComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private injector: Injector,private userService: UserService,private router: Router) { }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  // Function to check if the current route is login
  showNavbar(): boolean {
    // You can adjust this check based on your login route path
    return this.router.url !== '/login';
  }
}





