import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="app-header">
      
      <div class="header-left">
        <button mat-icon-button (click)="onMenuClick()">
          <mat-icon>menu</mat-icon>
        </button>
        
        <span class="brand-name">Kabbiiin</span>
      </div>

      <div class="header-right">
        <span class="user-name">Esteban</span>
        <button mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </button>
      </div>

    </mat-toolbar>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-name {
      font-weight: 500;
      font-size: 1.2rem;
      margin-left: 8px;
    }
    .user-name {
      font-size: 0.9rem;
      font-weight: 400;
    }
  `]
})
export class HeaderComponent {
  // Creamos la "antena" para enviarle la señal al MainLayout
  @Output() menuClick = new EventEmitter<void>();

  onMenuClick() {
    this.menuClick.emit(); // ¡Enviamos la señal!
  }
}