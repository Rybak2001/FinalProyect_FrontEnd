import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  name = new FormControl('Hola');
  title = 'AngularFront';

  updateName() {
    this.name.setValue('Nancy');
  }
  onSubmit() {
    console.warn(this.profileForm.value);
  }
}





