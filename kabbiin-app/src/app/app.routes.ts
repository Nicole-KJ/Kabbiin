import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
// Importamos tu nuevo componente de Calendario
import { CalendarComponent } from './features/dashboard/calendar/calendar.component'; 

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // El marco principal
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      // Ruta 1: Dashboard
      { path: 'dashboard', component: DashboardComponent },
      
      // Ruta 2: Calendario (¡LA NUEVA!)
      { path: 'calendario', component: CalendarComponent },
      
      // Aquí iremos agregando las demás (cabinas, inventario...)
    ]
  }
];