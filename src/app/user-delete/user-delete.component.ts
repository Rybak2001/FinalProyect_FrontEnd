import { Component, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {
  @Input() userId!: string;

  constructor(private userService: UserService) {}

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe(() => {
      console.log('User deleted');
    });
  }
}
