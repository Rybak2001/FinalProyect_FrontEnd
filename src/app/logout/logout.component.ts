import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AsyncPipe, NgFor, NgIf,NgStyle } from '@angular/common';
import { Router } from '@angular/router';
  @Component({
    selector: 'app-logout',
    standalone: true,
    imports: [AsyncPipe, NgFor, NgIf,NgStyle],
    template: `
      <button
        (click)="logout()"
        [ngStyle]="{
          'background-color': '#dc3545',
          'color': 'white',
          'border': 'none',
          'padding': '10px 20px',
          'border-radius': '4px',
          'font-size': '16px',
          'cursor': 'pointer',
          'transition': 'background-color 0.3s'
        }"
        (mouseenter)="onHover($event)"
        (mouseleave)="onHover($event)"
      >
        Logout
      </button>
    `,
    styles: []
  })
  export class LogoutComponent {
    constructor(private userService: UserService, private router: Router) {}

    logout() {
      this.userService.logout();
      console.log('Logged out');
      this.router.navigate(['/login']);
    }

    onHover(event: MouseEvent) {
      const target = event.target as HTMLButtonElement;
      if (event.type === 'mouseenter') {
        target.style.backgroundColor = '#bd2130';
      } else {
        target.style.backgroundColor = '#dc3545';
      }
    }
  }
