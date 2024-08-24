import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-dashboard-crud',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule, LogoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  selectedUser$!: Observable<User>;
  userForm: FormGroup;
  selectedUserId: string | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), this.noWhitespaceValidator]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), this.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  createUser(): void {
    if (this.userForm.valid) {
      const newUser = new User(
        this.userForm.value.firstName,
        this.userForm.value.lastName,
        this.userForm.value.email,
        this.userForm.value.password
      );

      this.checkEmailExists(newUser.email).pipe(
        take(1)
      ).subscribe(exists => {
        if (exists) {
          this.errorMessage = 'Email already exists';
        } else {
          this.userService.createUser(newUser).subscribe({
            next: (createdUser: User) => {
              console.log('User created:', createdUser);
              this.loadUsers();
              this.userForm.reset();
              this.errorMessage = '';
            },
            error: (error) => {
              console.error('Error creating user:', error);
              this.errorMessage = 'Error creating user';
            }
          });
        }
      });
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.users$.pipe(
      map(users => users.some(user => user.email === email))
    );
  }

  selectUser(userId: string): void {
    this.selectedUserId = userId;
    this.selectedUser$ = this.userService.getUser(userId);
    this.selectedUser$.subscribe(user => {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: ''
      });
    });
  }

  updateUser(): void {
    if (this.userForm.valid && this.selectedUserId) {
      const updatedUser = new User(
        this.userForm.value.firstName,
        this.userForm.value.lastName,
        this.userForm.value.email,
        this.userForm.value.password
      );

      this.userService.updateUser(this.selectedUserId, updatedUser).subscribe({
        next: (result: User) => {
          console.log('User updated:', result);
          this.loadUsers();
          this.selectedUserId = null;
          this.userForm.reset();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Error updating user';
        }
      });
    }
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log('User deleted');
        this.loadUsers();
        if (this.selectedUserId === userId) {
          this.selectedUserId = null;
          this.userForm.reset();
        }
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.errorMessage = 'Error deleting user';
      }
    });
  }

  // Custom validators
  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }

  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    if (email && !email.endsWith('@example.com')) {
      return { 'invalidDomain': true };
    }
    return null;
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { 'weakPassword': true } : null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    }

    return null;
  }
}
