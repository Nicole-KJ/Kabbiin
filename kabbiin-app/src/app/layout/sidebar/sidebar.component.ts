import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 

// Ajusta esta ruta si es necesario (debe apuntar a core/services/calendar.service.ts)
import { CalendarService } from '../../core/services/calendar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html', 
  styleUrls: ['./sidebar.component.css']    
})
export class SidebarComponent {
  
  private calendarService = inject(CalendarService);

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'calendar_today', label: 'Calendario', route: '/calendario' },
    { icon: 'bungalow', label: 'Mis Cabinas', route: '/cabinas' },
    { icon: 'inventory_2', label: 'Inventario', route: '/inventario' },
    { icon: 'assignment', label: 'Tareas', route: '/tareas' },
    { icon: 'chat', label: 'Mensajería', route: '/mensajes' },
    { icon: 'attach_money', label: 'Gastos', route: '/gastos' },
    { icon: 'description', label: 'Reportes', route: '/reportes' },
    { icon: 'settings', label: 'Configuración', route: '/configuracion' }
  ];

  crearNuevaReserva() {
    this.calendarService.triggerNewReservation();
  }
}