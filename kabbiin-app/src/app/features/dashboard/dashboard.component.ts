// FILE: src/app/features/dashboard/dashboard.component.ts
// VERSION: 1.2 (Elegant V1 Base + Tasks/Messages + Cabin Images)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-wrapper custom-scrollbar">
      
      <div class="dash-header">
        <div>
          <h2 class="welcome-text">Hola, Esteban 👋</h2>
          <p class="subtitle">Resumen general de tu negocio.</p>
        </div>
        <div class="date-badge">26 Ene 2026</div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon money-bg"><span class="material-icons-outlined">attach_money</span></div>
          <div class="kpi-content">
            <span class="kpi-label">Ingresos este Mes</span>
            <h3 class="kpi-value">₡2,450,000</h3>
            <span class="kpi-trend positive">+12% vs mes anterior</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon booking-bg"><span class="material-icons-outlined">book_online</span></div>
          <div class="kpi-content">
            <span class="kpi-label">Reservas Totales</span>
            <h3 class="kpi-value">24</h3>
            <span class="kpi-trend neutral">8 Pendientes de pago</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon occupancy-bg"><span class="material-icons-outlined">home</span></div>
          <div class="kpi-content">
            <span class="kpi-label">Ocupación</span>
            <h3 class="kpi-value">78%</h3>
            <div class="progress-bar"><div class="fill" style="width: 78%"></div></div>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon checkin-bg"><span class="material-icons-outlined">login</span></div>
          <div class="kpi-content">
            <span class="kpi-label">Check-ins Hoy</span>
            <h3 class="kpi-value">3</h3>
            <div class="avatar-stack">
               <div class="av" style="background:#003580">JP</div>
               <div class="av" style="background:#FF385C">FS</div>
               <div class="av" style="background:#4F6F52">RD</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mid-section-grid">
        
        <div class="content-card">
           <div class="card-header">
             <h3><span class="material-icons-outlined icon-title orange">check_circle</span> Tareas Pendientes</h3>
             <span class="counter-badge orange">5</span>
           </div>
           <div class="list-container custom-scrollbar">
              <div class="list-item" *ngFor="let task of tasks">
                 <input type="checkbox" class="task-check">
                 <div class="list-info">
                    <span class="primary-text">{{ task.title }}</span>
                    <span class="sub-text">{{ task.cabin }}</span>
                 </div>
                 <span class="priority-tag" [ngClass]="task.priority">{{ task.priority }}</span>
              </div>
           </div>
        </div>

        <div class="content-card">
           <div class="card-header">
             <h3><span class="material-icons-outlined icon-title blue">chat</span> Mensajes Nuevos</h3>
             <span class="counter-badge blue">3</span>
           </div>
           <div class="list-container custom-scrollbar">
              <div class="list-item msg-item" *ngFor="let msg of messages">
                 <div class="msg-avatar">{{ msg.initials }}</div>
                 <div class="list-info">
                    <span class="primary-text">{{ msg.user }}</span>
                    <span class="sub-text truncate">{{ msg.text }}</span>
                 </div>
                 <span class="time-tag">{{ msg.time }}</span>
              </div>
           </div>
        </div>

        <div class="content-card">
           <div class="card-header">
             <h3>Actividad Reciente</h3>
             <a href="#" class="link-view">Ver todo</a>
           </div>
           <div class="list-container custom-scrollbar">
              <div class="list-item activity-item" *ngFor="let act of activities">
                 <div class="act-icon" [ngClass]="act.typeClass">
                    <span class="material-icons-outlined">{{ act.icon }}</span>
                 </div>
                 <div class="list-info">
                    <span class="primary-text"><strong>{{ act.user }}</strong></span>
                    <span class="sub-text">{{ act.action }}</span>
                 </div>
                 <span class="time-tag">{{ act.time }}</span>
              </div>
           </div>
        </div>

      </div>

      <div class="content-card table-card">
         <div class="card-header compact-header">
            <h3>Próximas Llegadas (Check-ins)</h3>
         </div>
         
         <table class="kabin-table">
            <thead>
               <tr>
                  <th>Huésped</th>
                  <th>Cabaña</th>
                  <th>Plataforma</th>
                  <th>Fechas</th>
                  <th>Estado</th>
                  <th>Acción</th>
               </tr>
            </thead>
            <tbody>
               <tr *ngFor="let booking of upcomingBookings">
                  <td>
                     <div class="flex-cell">
                        <div class="guest-avatar">{{ booking.initials }}</div>
                        <div class="details-col">
                           <span class="primary-text">{{ booking.guest }}</span>
                           <span class="sub-text">{{ booking.pax }} Personas</span>
                        </div>
                     </div>
                  </td>
                  
                  <td>
                     <div class="flex-cell">
                        <div class="cabin-thumb">
                           <span class="material-icons-outlined">bungalow</span>
                        </div>
                        <div class="details-col">
                           <span class="primary-text">{{ booking.cabinName }}</span>
                           <span class="sub-text">{{ booking.cabinType }}</span>
                        </div>
                     </div>
                  </td>

                  <td><span class="badge" [ngClass]="booking.sourceClass">{{ booking.source }}</span></td>
                  <td><span class="text-date">{{ booking.dates }}</span></td>
                  <td><span class="status-dot">Confirmado</span></td>
                  <td><button class="btn-action">Ver</button></td>
               </tr>
            </tbody>
         </table>
      </div>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

    /* LAYOUT COMPRIMIDO */
    .dashboard-wrapper { padding: 20px 24px; height: 100%; display: flex; flex-direction: column; gap: 16px; font-family: 'Inter', sans-serif; overflow-y: auto; }
    
    /* HEADER COMPACTO */
    .dash-header { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 4px; }
    .welcome-text { font-size: 1.4rem; font-weight: 800; color: #1E293B; margin: 0; }
    .subtitle { color: #64748B; font-size: 0.85rem; margin: 0; }
    .date-badge { background: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; color: #1E293B; border: 1px solid #E2E8F0; }

    /* KPI GRID (Financiero) */
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    
    .kpi-card { 
       background: white; border-radius: 12px; padding: 16px; border: 1px solid #E2E8F0; 
       box-shadow: 0 2px 4px -1px rgba(0,0,0,0.02); display: flex; align-items: flex-start; gap: 12px;
       transition: transform 0.2s;
    }
    .kpi-card:hover { transform: translateY(-2px); }
    .kpi-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
    
    .money-bg { background: #ECFDF5; color: #059669; }
    .booking-bg { background: #EFF6FF; color: #2563EB; }
    .occupancy-bg { background: #FFF7ED; color: #EA580C; }
    .checkin-bg { background: #F5F3FF; color: #7C3AED; }

    .kpi-content { flex: 1; display: flex; flex-direction: column; }
    .kpi-label { font-size: 0.75rem; color: #64748B; font-weight: 600; margin-bottom: 2px; }
    .kpi-value { font-size: 1.35rem; font-weight: 800; color: #1E293B; margin: 0 0 2px 0; }
    .kpi-trend { font-size: 0.7rem; font-weight: 600; }
    .positive { color: #059669; } .neutral { color: #64748B; }
    .progress-bar { height: 5px; width: 100%; background: #F1F5F9; border-radius: 3px; overflow: hidden; margin-top: 4px; }
    .progress-bar .fill { height: 100%; background: #EA580C; border-radius: 3px; }
    .avatar-stack { display: flex; margin-top: 4px; }
    .avatar-stack .av { width: 24px; height: 24px; border-radius: 50%; color: white; font-size: 0.55rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid white; margin-right: -6px; }

    /* SECCIÓN MEDIA: 3 COLUMNAS (Tareas | Mensajes | Actividad) */
    .mid-section-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; min-height: 240px; }
    
    .content-card { background: white; border-radius: 12px; border: 1px solid #E2E8F0; padding: 16px; display: flex; flex-direction: column; overflow: hidden; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #F8FAFC; }
    .compact-header { margin-bottom: 0; padding-bottom: 12px; border-bottom: none; }
    
    .card-header h3 { font-size: 0.95rem; font-weight: 800; color: #1E293B; margin: 0; display: flex; align-items: center; gap: 8px; }
    .icon-title { font-size: 1.1rem; }
    .orange { color: #F97316; } .blue { color: #3B82F6; }

    .counter-badge { background: #F1F5F9; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; font-weight: 700; color: #64748B; }
    .counter-badge.orange { background: #FFF7ED; color: #F97316; }
    .counter-badge.blue { background: #EFF6FF; color: #3B82F6; }
    
    .link-view { font-size: 0.75rem; color: #2563EB; font-weight: 600; text-decoration: none; }

    /* LISTAS INTERNAS */
    .list-container { flex: 1; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; max-height: 220px; padding-right: 4px; }
    
    .list-item { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; border-bottom: 1px solid #F8FAFC; }
    .list-item:last-child { border-bottom: none; }

    .task-check { margin-top: 4px; accent-color: #2563EB; cursor: pointer; }
    
    .list-info { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .primary-text { font-size: 0.85rem; font-weight: 600; color: #334155; }
    .sub-text { font-size: 0.75rem; color: #94A3B8; }
    .truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .priority-tag { font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
    .priority-tag.Alta { background: #FEF2F2; color: #DC2626; }
    .priority-tag.Media { background: #FFF7ED; color: #EA580C; }

    /* MENSAJES */
    .msg-avatar { width: 32px; height: 32px; background: #EEF2FF; color: #4F46E5; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }
    .time-tag { font-size: 0.65rem; color: #94A3B8; white-space: nowrap; }

    /* ACTIVIDAD */
    .act-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
    .act-icon.new-booking { background: #EFF6FF; color: #2563EB; }
    .act-icon.payment { background: #ECFDF5; color: #059669; }
    .act-icon.msg { background: #FFF7ED; color: #F59E0B; }

    /* TABLA (Compacta) */
    .table-card { padding: 0; }
    .table-card .card-header { padding: 16px 20px; margin-bottom: 0; }
    
    .kabin-table { width: 100%; border-collapse: collapse; }
    .kabin-table th { text-align: left; font-size: 0.7rem; color: #64748B; font-weight: 700; text-transform: uppercase; padding: 10px 20px; background: #F8FAFC; border-top: 1px solid #F1F5F9; border-bottom: 1px solid #E2E8F0; }
    .kabin-table td { padding: 10px 20px; border-bottom: 1px solid #F1F5F9; color: #1E293B; font-size: 0.85rem; }
    .kabin-table tr:last-child td { border-bottom: none; }
    
    .flex-cell { display: flex; align-items: center; gap: 12px; }
    .guest-avatar { width: 28px; height: 28px; background: #1E293B; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; }
    .details-col { display: flex; flex-direction: column; }

    /* FOTO CABAÑA (Thumbnail) */
    .cabin-thumb { width: 40px; height: 40px; background: #F1F5F9; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #94A3B8; overflow: hidden; flex-shrink: 0; }
    .cabin-thumb img { width: 100%; height: 100%; object-fit: cover; }
    
    .badge { padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    .badge.airbnb { background: #FFF1F2; color: #E11D48; }
    .badge.booking { background: #EFF6FF; color: #2563EB; }
    .badge.direct { background: #F0FDF4; color: #16A34A; }
    
    .text-date { font-weight: 500; color: #475569; font-size: 0.8rem; }
    .status-dot { color: #059669; font-weight: 600; font-size: 0.75rem; }
    .status-dot::before { content: '●'; margin-right: 4px; }
    .btn-action { border: 1px solid #E2E8F0; background: white; padding: 4px 10px; border-radius: 6px; cursor: pointer; color: #475569; font-weight: 600; font-size: 0.75rem; }
    .btn-action:hover { background: #F8FAFC; border-color: #CBD5E1; }

    @media (max-width: 1024px) {
        .mid-section-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardComponent {
  
  // DATOS: Tareas
  tasks = [
    { title: 'Revisar fuga de agua', cabin: 'Cabaña #2 - Río', priority: 'Alta' },
    { title: 'Comprar insumos de limpieza', cabin: 'General', priority: 'Media' },
    { title: 'Confirmar hora llegada', cabin: 'Familia Smith', priority: 'Media' },
    { title: 'Enviar factura pendiente', cabin: 'Juan Pérez', priority: 'Alta' },
    { title: 'Actualizar precios Airbnb', cabin: 'Todas', priority: 'Media' },
  ];

  // DATOS: Mensajes
  messages = [
    { initials: 'LF', user: 'Luisa F.', text: 'Hola, ¿tienen disponibilidad para el...', time: '10 min' },
    { initials: 'AB', user: 'Airbnb Support', text: 'Recordatorio: Nueva política de canc...', time: '1h' },
    { initials: 'MR', user: 'Mario Ruiz', text: 'Gracias, ya hicimos el pago del ant...', time: '3h' },
  ];

  // DATOS: Actividad
  activities = [
    { icon: 'book_online', user: 'Familia Rodríguez', action: 'nueva reserva', time: 'Hace 10 min', typeClass: 'new-booking' },
    { icon: 'payments', user: 'Juan Pérez', action: 'pagó saldo', time: 'Hace 2 h', typeClass: 'payment' },
    { icon: 'chat', user: 'Luisa F.', action: 'preguntó disponib.', time: 'Hace 3 h', typeClass: 'msg' },
  ];

  // DATOS: Tabla
  upcomingBookings = [
    { initials: 'JP', guest: 'Juan Pérez', pax: 2, cabinName: 'Cabaña #2 - Río', cabinType: 'Parejas', source: 'Booking', sourceClass: 'booking', dates: '26-28 Ene' },
    { initials: 'FS', guest: 'Familia Smith', pax: 4, cabinName: 'Cabaña #1 - Bosque', cabinType: 'Familiar', source: 'Airbnb', sourceClass: 'airbnb', dates: '26-30 Ene' },
    { initials: 'RD', guest: 'Reserva Directa', pax: 2, cabinName: 'Glamping Domo', cabinType: 'Deluxe', source: 'Directo', sourceClass: 'direct', dates: '27-29 Ene' },
  ];
}