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
        <button mat-icon-button (click)="toggleSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        
        <span class="brand-name">Kabbiiin</span>
      </div>

      <div class="header-right">
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
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-name {
      font-weight: 500;
      letter-spacing: 1px;
    }
  `]
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();

  toggleSidebar() {
    this.menuClick.emit();
  }
}