import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'; // Quitamos 'Breakpoints' que no usaremos
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      
      <mat-sidenav #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isSmallScreen$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isSmallScreen$ | async) ? 'over' : 'side'"
        [opened]="(isSmallScreen$ | async) === false">
        
        <app-sidebar></app-sidebar>
        
      </mat-sidenav>

      <mat-sidenav-content>
        <app-header (menuClick)="drawer.toggle()"></app-header>
        
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
        
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    
    .sidenav {
      width: 260px;
      background-color: white; 
      border-right: 1px solid rgba(0,0,0,0.08);
    }

    .main-content {
      padding: 24px;
      background-color: #f8f9fa;
      /* Esto asegura que el contenido no se corte */
      min-height: calc(100vh - 64px); 
      overflow-x: hidden; 
    }
  `]
})
export class MainLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  // CAMBIO CLAVE: Detectamos si el ancho es menor a 900px manualmente
  isSmallScreen$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 900px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}