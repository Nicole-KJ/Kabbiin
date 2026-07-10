import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// 1. IMPORTAMOS TUS 3 MÓDULOS
import { CalendarComponent } from './features/dashboard/calendar/calendar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CabinsComponent } from './features/cabins/cabins.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. DECLARAMOS LOS COMPONENTES EN LOS IMPORTS
  imports: [
    CommonModule, 
    RouterOutlet, 
    CalendarComponent, 
    DashboardComponent, 
    CabinsComponent
  ], 
  template: `
    <div class="app-layout">
      
      <aside class="sidebar">
        
        <div class="logo-area">
           <div class="logo-icon">K</div>
           <span class="logo-text">KABBIIN</span>
        </div>
        
        <div class="user-card">
           <div class="user-avatar">EC</div>
           <div class="user-info">
             <span class="user-name">Esteban Test</span>
             <span class="user-role">ADMIN</span>
           </div>
        </div>
        
        <div class="action-area">
          <button class="btn-new-booking">
            <span class="material-icons-outlined">add</span> Nueva Reserva
          </button>
        </div>
        
        <nav class="nav-menu custom-scrollbar">
          
          <a class="nav-item" [class.active]="currentView === 'Dashboard'" (click)="currentView = 'Dashboard'">
            <span class="material-icons-outlined">dashboard</span> Dashboard
          </a>
          
          <a class="nav-item" [class.active]="currentView === 'Calendario'" (click)="currentView = 'Calendario'">
            <span class="material-icons-outlined">calendar_today</span> Calendario
          </a>
          
          <a class="nav-item" [class.active]="currentView === 'Mis Cabinas'" (click)="currentView = 'Mis Cabinas'">
            <span class="material-icons-outlined">home</span> Mis Cabinas
          </a>
          
          <a class="nav-item" [class.active]="currentView === 'Inventario'" (click)="currentView = 'Inventario'">
            <span class="material-icons-outlined">inventory_2</span> Inventario
          </a>
          <a class="nav-item" [class.active]="currentView === 'Tareas'" (click)="currentView = 'Tareas'">
            <span class="material-icons-outlined">check_circle</span> Tareas
          </a>
          <a class="nav-item" [class.active]="currentView === 'Mensajería'" (click)="currentView = 'Mensajería'">
            <span class="material-icons-outlined">chat</span> Mensajería
          </a>
          <a class="nav-item" [class.active]="currentView === 'Gastos'" (click)="currentView = 'Gastos'">
            <span class="material-icons-outlined">receipt_long</span> Gastos
          </a>
          <a class="nav-item" [class.active]="currentView === 'Reportes'" (click)="currentView = 'Reportes'">
            <span class="material-icons-outlined">bar_chart</span> Reportes
          </a>
          <a class="nav-item" [class.active]="currentView === 'Configuración'" (click)="currentView = 'Configuración'">
            <span class="material-icons-outlined">settings</span> Configuración
          </a>

        </nav>
        
        <div class="logout-area">
           <a class="nav-item logout">
             <span class="material-icons-outlined">logout</span> Salir
           </a>
        </div>
      </aside>

      <main class="main-content">
        
        <header class="top-header">
           <div class="header-left">
             <button class="menu-toggle"><span class="material-icons-outlined">menu</span></button>
             <h1 class="page-title">{{ currentView }}</h1>
           </div>
           <div class="header-right">
              <button class="icon-btn"><span class="material-icons-outlined">notifications</span></button>
              <div class="mini-avatar">EC</div>
           </div>
        </header>

        <div class="content-body">
           
           <app-dashboard *ngIf="currentView === 'Dashboard'"></app-dashboard>
           
           <app-calendar *ngIf="currentView === 'Calendario'"></app-calendar>
           
           <app-cabins *ngIf="currentView === 'Mis Cabinas'"></app-cabins>

           <div *ngIf="currentView !== 'Calendario' && currentView !== 'Dashboard' && currentView !== 'Mis Cabinas'" class="placeholder-view">
              <h2>{{ currentView }}</h2>
              <p>Módulo en desarrollo</p>
           </div>

        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

    :host { 
        display: block; 
        height: 100vh; 
        font-family: 'Inter', sans-serif; 
        color: #1E293B; 
    }
    
    .app-layout { 
        display: flex; 
        height: 100%; 
        background-color: #F8FAFC; 
    }

    /* --- SIDEBAR --- */
    .sidebar { 
        width: 260px; 
        background: white; 
        border-right: 1px solid #E2E8F0; 
        display: flex; 
        flex-direction: column; 
        flex-shrink: 0; 
    }
    
    .logo-area { 
        height: 72px; 
        display: flex; align-items: center; 
        padding: 0 24px; 
        border-bottom: 1px solid #F1F5F9; 
        gap: 12px; 
    }
    .logo-icon { font-size: 1.5rem; font-weight: 900; color: #2563EB; }
    .logo-text { font-size: 1.2rem; font-weight: 800; color: #1E293B; letter-spacing: -0.5px; }
    
    .user-card { 
        margin: 20px 20px 10px 20px; 
        padding: 12px; 
        border: 1px solid #F1F5F9; 
        border-radius: 12px; 
        display: flex; align-items: center; gap: 12px; 
        background: #FFFFFF; 
    }
    .user-avatar { 
        width: 40px; height: 40px; 
        border-radius: 50%; 
        background-color: #2563EB; 
        color: white; 
        font-weight: 700; 
        display: flex; align-items: center; justify-content: center; 
    }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: 0.85rem; font-weight: 700; color: #1E293B; }
    .user-role { font-size: 0.65rem; font-weight: 800; color: #2563EB; }
    
    .action-area { padding: 10px 20px; }
    .btn-new-booking { 
        width: 100%; padding: 12px; 
        background: #2563EB; color: white; 
        border: none; border-radius: 10px; 
        font-weight: 600; font-size: 0.9rem; 
        cursor: pointer; 
        display: flex; align-items: center; justify-content: center; gap: 8px; 
        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); 
        transition: all 0.2s; 
    }
    .btn-new-booking:hover { background: #1D4ED8; }
    
    .nav-menu { 
        flex: 1; 
        padding: 0 12px; 
        display: flex; flex-direction: column; gap: 2px; 
        overflow-y: auto; 
    }
    
    .nav-item { 
        display: flex; align-items: center; gap: 12px; 
        padding: 10px 16px; 
        border-radius: 8px; 
        color: #64748B; 
        font-weight: 500; font-size: 0.9rem; 
        cursor: pointer; 
        transition: all 0.2s; 
    }
    .nav-item:hover { background-color: #F8FAFC; color: #1E293B; }
    .nav-item.active { background-color: #EFF6FF; color: #2563EB; font-weight: 700; }
    
    .logout-area { padding: 20px; border-top: 1px solid #F1F5F9; }
    .logout { color: #EF4444; } 
    .logout:hover { background: #FEF2F2; color: #DC2626; }

    /* --- MAIN CONTENT --- */
    .main-content { 
        flex: 1; 
        display: flex; flex-direction: column; 
        overflow: hidden; 
    }
    .content-body { 
        flex: 1; 
        overflow: hidden; 
        position: relative; 
    }
    
    .top-header { 
        height: 72px; 
        background: white; 
        border-bottom: 1px solid #E2E8F0; 
        display: flex; align-items: center; justify-content: space-between; 
        padding: 0 32px; 
    }
    .header-left { display: flex; align-items: center; gap: 16px; height: 100%; }
    .menu-toggle { 
        display: flex; align-items: center; justify-content: center; 
        background: none; border: none; cursor: pointer; color: #64748B; padding: 0; 
    }
    .page-title { 
        font-size: 1.25rem; font-weight: 800; color: #1E293B; 
        margin: 0; line-height: 1; transform: translateY(1px); 
    }
    .header-right { display: flex; align-items: center; gap: 16px; }
    .icon-btn { background: none; border: none; cursor: pointer; color: #94A3B8; display: flex; }
    .mini-avatar { 
        width: 32px; height: 32px; 
        background: #2563EB; color: white; 
        border-radius: 50%; 
        font-size: 0.75rem; font-weight: 700; 
        display: flex; align-items: center; justify-content: center; 
    }
    
    .placeholder-view { padding: 40px; text-align: center; color: #94A3B8; }
  `]
})
export class AppComponent {
  // Iniciamos en 'Mis Cabinas' para que veas el resultado nuevo
  currentView: string = 'Mis Cabinas';
}