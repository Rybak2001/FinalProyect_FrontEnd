import { catchError, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

export class User {
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  constructor(firstName: any, lastName: any, email: any, password: any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

}
