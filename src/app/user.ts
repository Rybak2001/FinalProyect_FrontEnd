import { catchError, Observable } from 'rxjs';

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
  addUser(user: User): Observable<User> {
    try {
        return this.http.post<User>().pipe(
            catchError(this.handleError('addUser',user))
        )
    } catch (error: any) {
      return console.warn(error);
    }
  }
}
