import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  @Input() userId!: string;
  user$!: Observable<User>;
  userService: UserService;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.userId);
    this.user$.subscribe(user => {
      this.profileForm.patchValue(user);
    });
  }

  onSubmit() {
    const updatedUser = new User(
      this.profileForm.value.firstName!,
      this.profileForm.value.lastName!,
      this.profileForm.value.email!,
      this.profileForm.value.password!
    );

    this.userService.updateUser(this.userId, updatedUser).subscribe(result => {
      console.log('User updated:', result);
    });
  }
}
