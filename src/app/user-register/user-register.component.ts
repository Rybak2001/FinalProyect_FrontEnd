import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [AsyncPipe,ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {


  user$!: Observable<User>;

  userService:UserService;
  constructor(userService: UserService) {
    this.userService=userService
  }
  ngOnInit(): void {

  }

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(){
    const firstName=this.profileForm.controls.firstName.value
    const lastName=this.profileForm.controls.lastName.value
    const email=this.profileForm.controls.email.value
    const password=this.profileForm.controls.password.value

    const newUser=new User(firstName,lastName,email,password)

    this.userService.createUser(newUser).subscribe((value:User)=>{
      console.log(value);
    });


  }
}
