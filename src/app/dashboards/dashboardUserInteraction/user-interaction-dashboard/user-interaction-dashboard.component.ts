import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInteraction } from '../../../models/user-interaction.model';
import { UserInteractionService } from '../../../services/user-interaction.service';
import { UserService } from '../../../services/user.service'; // Importa el servicio de usuarios
import { AnchorPointService } from '../../../services/anchor-point.service'; // Importa el servicio de AnchorPoint
import { User } from '../../../models/user';
import { AnchorPoint } from '../../../models/anchor-point.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userinteraction-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-interaction-dashboard.component.html',
  styleUrls: ['./user-interaction-dashboard.component.css']
})
export class UserInteractionDashboardComponent implements OnInit {
  private userInteractionsSubject = new BehaviorSubject<UserInteraction[]>([]);
  userInteractions$ = this.userInteractionsSubject.asObservable();
  selectedUserInteraction$!: Observable<UserInteraction>;
  userInteractionForm: FormGroup;
  selectedUserInteractionId: string | null = null;
  errorMessage: string = '';

  // Variables para almacenar los usuarios y anchor points
  users: User[] = [];
  anchorPoints: AnchorPoint[] = [];

  constructor(
    private userInteractionService: UserInteractionService,
    private userService: UserService, // Inyecta el servicio de usuarios
    private anchorPointService: AnchorPointService, // Inyecta el servicio de AnchorPoint
    private fb: FormBuilder
  ) {
    this.userInteractionForm = this.fb.group({
      user_id: ['', Validators.required],
      anchor_id: ['', Validators.required],
      interaction_type: ['', Validators.required],
      timestamp: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserInteractions();
    this.loadUsers(); // Carga los usuarios al iniciar
    this.loadAnchorPoints(); // Carga los anchor points al iniciar
  }

  loadUserInteractions(): void {
    this.userInteractionService.getUserInteractions().subscribe((userInteractions: UserInteraction[]) => {
      this.userInteractionsSubject.next(userInteractions);
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadAnchorPoints(): void {
    this.anchorPointService.getAnchorPoints().subscribe(anchorPoints => {
      this.anchorPoints = anchorPoints;
    });
  }

  createUserInteraction(): void {
    if (this.userInteractionForm.valid) {
      const newUserInteraction = new UserInteraction(
        '', // Deja vacío para que el backend asigne el ID automáticamente
        this.userInteractionForm.value.user_id,
        this.userInteractionForm.value.anchor_id,
        this.userInteractionForm.value.interaction_type,
        new Date(this.userInteractionForm.value.timestamp)
      );

      this.userInteractionService.createUserInteraction(newUserInteraction).subscribe({
        next: (createdUserInteraction: UserInteraction) => {
          console.log('UserInteraction created:', createdUserInteraction);
          this.loadUserInteractions();
          this.userInteractionForm.reset();
          this.errorMessage = '';
        },
        error: (error: any) => {
          console.error('Error creating UserInteraction:', error);
          this.errorMessage = 'Error creating UserInteraction';
        }
      });
    }
  }

  selectUserInteraction(userInteractionId: string): void {
    this.selectedUserInteractionId = userInteractionId;
    this.selectedUserInteraction$ = this.userInteractionService.getUserInteraction(userInteractionId);
    this.selectedUserInteraction$.subscribe(userInteraction => {
      this.userInteractionForm.patchValue({
        user_id: userInteraction.user_id,
        anchor_id: userInteraction.anchor_id,
        interaction_type: userInteraction.interaction_type,
        timestamp: new Date(userInteraction.timestamp).toISOString().slice(0, 16),
      });
    });
  }

  updateUserInteraction(): void {
    if (this.userInteractionForm.valid && this.selectedUserInteractionId) {
      const updatedUserInteraction = new UserInteraction(
        this.selectedUserInteractionId,
        this.userInteractionForm.value.user_id,
        this.userInteractionForm.value.anchor_id,
        this.userInteractionForm.value.interaction_type,
        new Date(this.userInteractionForm.value.timestamp)
      );

      this.userInteractionService.updateUserInteraction(this.selectedUserInteractionId, updatedUserInteraction).subscribe({
        next: (result: UserInteraction) => {
          console.log('UserInteraction updated:', result);
          this.loadUserInteractions();
          this.selectedUserInteractionId = null;
          this.userInteractionForm.reset();
          this.errorMessage = '';
        },
        error: (error: any) => {
          console.error('Error updating UserInteraction:', error);
          this.errorMessage = 'Error updating UserInteraction';
        }
      });
    }
  }

  deleteUserInteraction(userInteractionId: string): void {
    this.userInteractionService.deleteUserInteraction(userInteractionId).subscribe({
      next: () => {
        console.log('UserInteraction deleted');
        this.loadUserInteractions();
        if (this.selectedUserInteractionId === userInteractionId) {
          this.selectedUserInteractionId = null;
          this.userInteractionForm.reset();
        }
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Error deleting UserInteraction:', error);
        this.errorMessage = 'Error deleting UserInteraction';
      }
    });
  }
}
