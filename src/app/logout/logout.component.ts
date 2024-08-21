import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '<button (click)="logout()">Logout</button>',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout();
    console.log('Logged out');
  }
}
