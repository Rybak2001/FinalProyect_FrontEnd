import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  @Input() userId!: string;


  userList$!: Observable<User[]>;
  userService:UserService;
  constructor(userService: UserService) {
    this.userService=userService
  }
  ngOnInit(): void {
    this.userList$ = this.userService.getUsers();
  }
}
