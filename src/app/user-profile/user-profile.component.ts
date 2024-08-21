import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() userId!: string;
  user$!: Observable<User>;
  userService:UserService;
  constructor(userService: UserService) {
    this.userService=userService
  }
  ngOnInit(): void {
    this.user$ = this.userService.getUser("2");
  }
}
