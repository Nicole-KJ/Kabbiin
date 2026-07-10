import { Component, OnInit, ViewChild, inject, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Subscription } from 'rxjs';

import { CalendarService } from '../../../core/services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="calendar-wrapper">
      
      <div class="cal-header">
         <div class="nav-group">
            <button class="nav-icon" (click)="handlePrev()"><</button>
            <span class="date-display">{{ currentTitle }}</span>
            <button class="nav-icon" (click)="handleNext()">></button>
         </div>

         <div class="view-group">
            <button [class.active]="currentView === 'resourceTimelineWeek'" (click)="changeView('resourceTimelineWeek')">Semana</button>
            <button [class.active]="currentView === 'resourceTimelineMonth'" (click)="changeView('resourceTimelineMonth')">Mes</button>
            <button [class.active]="currentView === 'resourceTimelineYear'" (click)="changeView('resourceTimelineYear')">Año</button>
         </div>
      </div>

      <div class="fc-container">
         <full-calendar #calendar [options]="calendarOptions"></full-calendar>
      </div>

      <div class="modal-overlay" *ngIf="isModalOpen">
        <div class="modal-content large-modal">
          <div class="modal-header">
            <h3>{{ selectedReservation.id ? 'Editar Reserva' : 'Nueva Reserva' }}</h3>
            <button class="close-btn" (click)="closeModal()">×</button>
          </div>
          
          <div class="modal-body" *ngIf="selectedReservation">
            <div class="form-grid">
              <div class="form-group">
                <label>HUÉSPED / TÍTULO</label>
                <input type="text" [(ngModel)]="selectedReservation.title" placeholder="Ej. Familia Smith">
              </div>
              <div class="form-group">
                <label>CABAÑA</label>
                <select [(ngModel)]="selectedReservation.resourceId">
                  <option *ngFor="let c of calendarOptions.resources" [value]="c.id">{{ c.title }}</option>
                </select>
              </div>
            </div>

            <div class="form-grid three-cols">
              <div class="form-group">
                <label>LLEGADA</label>
                <input type="date" [ngModel]="formatDateForInput(selectedReservation.start)" (ngModelChange)="updateStartDate($event)">
              </div>
              <div class="form-group">
                <label>NOCHES</label>
                <input type="number" [(ngModel)]="selectedReservation.extendedProps.nights" min="1">
              </div>
              <div class="form-group">
                <label>PERSONAS</label>
                <input type="text" [(ngModel)]="selectedReservation.extendedProps.guests">
              </div>
            </div>

            <div class="form-grid three-cols">
              <div class="form-group">
                <label>PRECIO X NOCHE</label>
                <input type="number" [(ngModel)]="selectedReservation.extendedProps.price">
              </div>
              <div class="form-group">
                <label>TOTAL ESTIMADO</label>
                <div class="input-readonly">
                  ₡ {{ calculateTotal() | number }}
                </div>
              </div>
              <div class="form-group">
                <label>FORMA DE PAGO</label>
                <select [(ngModel)]="selectedReservation.extendedProps.paymentMethod">
                  <option *ngFor="let method of paymentMethods" [value]="method">{{ method }}</option>
                </select>
              </div>
            </div>
            
            <div class="form-grid">
               <div class="form-group">
                  <label>ORIGEN</label>
                  <select [(ngModel)]="selectedReservation.extendedProps.source">
                     <option value="Directo">Directa (Manual)</option>
                     <option value="Airbnb">Airbnb</option>
                     <option value="Booking">Booking.com</option>
                     <option value="Expedia">Expedia</option>
                  </select>
               </div>
               <div class="form-row-check" style="margin-top: 24px;">
                 <input type="checkbox" id="evCheck" [(ngModel)]="selectedReservation.extendedProps.hasElectricCar">
                 <label for="evCheck">
                   <strong>Vehículo Eléctrico</strong><br>
                   <small>Requiere carga</small>
                 </label>
               </div>
            </div>
          </div>

          <div class="modal-footer">
            <button *ngIf="selectedReservation.id" class="btn-delete" (click)="deleteReservation()">Eliminar</button>
            <div class="footer-actions">
               <button class="btn-cancel" (click)="closeModal()">Cancelar</button>
               <button class="btn-primary" (click)="saveReservation()">Guardar Reserva</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ESTILOS BASE */
    .calendar-wrapper { padding: 20px 32px; height: 100%; display: flex; flex-direction: column; font-family: 'Inter', sans-serif; }
    .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .nav-group { display: flex; align-items: center; gap: 16px; }
    .nav-icon { background: white; border: 1px solid #E2E8F0; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display:flex; align-items:center; justify-content:center; }
    .date-display { font-size: 1.25rem; font-weight: 800; color: #1E293B; text-transform: uppercase; }
    .view-group { background: white; padding: 4px; border-radius: 8px; display: flex; gap: 4px; border: 1px solid #E2E8F0; }
    .view-group button { background: transparent; border: none; padding: 6px 16px; font-weight: 600; color: #64748B; cursor: pointer; border-radius: 6px; }
    .view-group button.active { background: #EFF6FF; color: #2563EB; }
    .fc-container { flex: 1; background: white; border-radius: 16px; border: 1px solid #E2E8F0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; }
    .fc-header-toolbar { display: none !important; }
    .fc-timeline-event { background: transparent !important; border: none !important; margin-top: 2px !important; }
    
    .fc-custom-card {
       border-radius: 6px; height: 36px; display: flex; align-items: center; padding: 0 10px;
       color: white; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.02em;
       box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255,255,255,0.1);
       white-space: nowrap; cursor: pointer; position: relative;
    }
    .bg-booking { background-color: #003580 !important; border-left: 3px solid rgba(255,255,255,0.4); }
    .bg-airbnb { background-color: #FF385C !important; border-left: 3px solid rgba(255,255,255,0.4); }
    .bg-direct { background-color: #4F6F52 !important; border-left: 3px solid rgba(255,255,255,0.4); }
    .bg-expedia { background-color: #FFC107 !important; color: #333 !important; }
    .year-bar { height: 6px; width: 100%; border-radius: 3px; margin-bottom: 2px; opacity: 0.9; }

    /* TOOLTIP BLANCO CLICKABLE */
    .kabin-tooltip {
      position: fixed; background: white; color: #1e293b; padding: 16px;
      border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15);
      border: 1px solid #e2e8f0; z-index: 10000; font-size: 0.85rem;
      pointer-events: auto; cursor: pointer; opacity: 0; transition: opacity 0.2s ease-in-out;
      width: 220px;
    }
    .kabin-tooltip:hover { border-color: #2563eb; transform: scale(1.02); transition: all 0.2s; }
    .tt-title { font-weight: 800; color: #2563eb; margin-bottom: 8px; display: block; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .tt-row { display: flex; justify-content: space-between; margin-bottom: 4px; color: #64748b; }
    .tt-action { margin-top:10px; font-size:0.75rem; color:#2563eb; text-align:right; border-top:1px solid #f1f5f9; padding-top:6px; font-weight: 700; display: flex; justify-content: flex-end; align-items: center; gap: 4px; }

    /* MODAL */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; justify-content: center; align-items: center; }
    .large-modal { background: white; width: 650px; max-width: 90%; padding: 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .modal-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; }
    .modal-header h3 { margin: 0; color: #1e293b; font-size: 1.2rem; }
    .close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #64748b; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
    .form-grid.three-cols { grid-template-columns: 1.2fr 0.8fr 0.8fr; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; text-transform: uppercase; }
    .form-group input, .form-group select, .input-readonly { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; height: 38px; box-sizing: border-box; width: 100%; }
    .input-readonly { background: #f8fafc; color: #16a34a; font-weight: 700; display: flex; align-items: center; }
    .form-row-check { display: flex; align-items: center; background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px dashed #cbd5e1; }
    .form-row-check input { width: 18px; height: 18px; margin-right: 10px; }
    .modal-footer { margin-top: 25px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f0f0f0; padding-top: 15px; }
    .footer-actions { display: flex; gap: 10px; }
    .btn-cancel { background: white; border: 1px solid #cbd5e1; color: #475569; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .btn-primary { background: #2563eb; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-delete { background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
  `]
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  private calendarService = inject(CalendarService);
  private sub: Subscription = new Subscription(); // Para manejar la suscripción

  currentTitle: string = '';
  currentView: string = 'resourceTimelineMonth';
  paymentMethods = ['Sinpe Móvil', 'Efectivo', 'Transferencia', 'Tarjeta', 'PayPal'];

  hideTooltipTimeout: any = null;
  activeTooltip: HTMLElement | null = null;
  selectedReservation: any = null;
  isModalOpen: boolean = false;

  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin, resourceTimelinePlugin],
    initialView: 'resourceTimelineMonth',
    locale: esLocale,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    headerToolbar: false,
    resourceAreaHeaderContent: 'Cabaña',
    resourceAreaWidth: '240px',
    height: '100%', contentHeight: 'auto', expandRows: true,

    views: {
      resourceTimelineMonth: { slotMinWidth: 38, slotLabelContent: (arg: any) => this.renderMonthHeader(arg) },
      resourceTimelineWeek: { duration: { weeks: 1 }, slotDuration: { days: 1 }, slotLabelContent: (arg: any) => this.renderWeekHeader(arg) },
      resourceTimelineYear: { duration: { years: 1 }, slotDuration: { months: 1 }, slotLabelContent: (arg: any) => this.renderYearHeader(arg) }
    },

    datesSet: (arg: any) => {
      if (arg.view.type === 'resourceTimelineYear') this.currentTitle = arg.view.currentStart.getFullYear().toString();
      else this.currentTitle = arg.view.title;
      this.currentView = arg.view.type;
    },

    resourceLabelContent: (arg: any) => {
      return { html: `<div style="display:flex;align-items:center;gap:12px;"><div style="width:32px;height:32px;background:#F1F5F9;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#64748B;font-weight:bold;">IMG</div><span>${arg.resource.title}</span></div>` };
    },

    eventMouseEnter: (info: any) => {
      if (this.hideTooltipTimeout) { clearTimeout(this.hideTooltipTimeout); this.hideTooltipTimeout = null; }
      this.showTooltip(info);
    },
    eventMouseLeave: () => {
      this.hideTooltipTimeout = setTimeout(() => { this.removeTooltip(); }, 1500);
    },
    eventClick: (info: any) => { this.openEditModal(info.event); },

    eventContent: (arg: any) => {
      const props = arg.event.extendedProps;
      const source = (props['source'] || 'Manual').toLowerCase();
      let bgClass = 'bg-direct';
      if (source.includes('airbnb')) bgClass = 'bg-airbnb';
      else if (source.includes('booking')) bgClass = 'bg-booking';
      else if (source.includes('expedia')) bgClass = 'bg-expedia';
      const displayText = this.getReservationLabel(arg.event.title, source);
      if (this.currentView === 'resourceTimelineYear') return { html: `<div class="year-bar ${bgClass}"></div>` };
      return { html: `<div class="fc-custom-card ${bgClass}"><span>${displayText}</span></div>` };
    }
  };

  ngOnInit() {
    this.calendarService.getCabins().subscribe(d => {
      this.calendarOptions.resources = d;
      this.loadInitialEvents(d);
    });

    // --- ESCUCHAR AL BOTÓN DEL SIDEBAR ---
    // Si tu servicio tiene openModal$ (como definimos en el Paso 1)
    if (this.calendarService.openModal$) {
      this.sub.add(
        this.calendarService.openModal$.subscribe(() => {
          this.openNewReservation();
        })
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showTooltip(info: any) {
    this.removeTooltip();
    const props = info.event.extendedProps;
    const el = document.createElement('div');
    el.className = 'kabin-tooltip';
    el.innerHTML = `
      <span class="tt-title">${info.event.title}</span>
      <div class="tt-row"><span>Origen:</span> <strong>${props.source || 'Directo'}</strong></div>
      <div class="tt-row"><span>Noches:</span> <strong>${props.nights || 1}</strong></div>
      <div class="tt-row"><span>Total:</span> <strong>₡${props.price || 0}</strong></div>
      <div class="tt-action"><span>Clic para editar</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
    `;
    el.onclick = () => { this.openEditModal(info.event); };
    el.onmouseenter = () => { if (this.hideTooltipTimeout) clearTimeout(this.hideTooltipTimeout); };
    el.onmouseleave = () => { this.hideTooltipTimeout = setTimeout(() => this.removeTooltip(), 1500); };
    document.body.appendChild(el);
    this.activeTooltip = el;
    const rect = info.el.getBoundingClientRect();
    el.style.top = (rect.top - 10) + 'px';
    el.style.left = (rect.left + 20) + 'px';
    requestAnimationFrame(() => { el.style.opacity = '1'; });
  }

  removeTooltip() { if (this.activeTooltip) { this.activeTooltip.remove(); this.activeTooltip = null; } }

  openEditModal(event: any) {
    this.removeTooltip();
    const props = event.extendedProps;
    this.selectedReservation = {
      id: event.id, title: event.title, start: event.start, end: event.end, resourceId: event.getResources()[0]?.id,
      extendedProps: { source: props.source || 'Directo', price: props.price || 0, nights: props.nights || 1, guests: props.guests || '', paymentMethod: props.paymentMethod || 'Efectivo', hasElectricCar: props.hasElectricCar || false }
    };
    this.isModalOpen = true;
  }

  openNewReservation() {
    const today = new Date();
    this.selectedReservation = {
      id: null, title: '', resourceId: this.calendarOptions.resources[0]?.id, start: today,
      extendedProps: { nights: 1, guests: '2 Adultos', price: 0, source: 'Directo', paymentMethod: 'Sinpe Móvil', hasElectricCar: false }
    };
    this.isModalOpen = true;
  }

  saveReservation() {
    const calendarApi = this.calendarComponent.getApi();
    const startDate = new Date(this.selectedReservation.start);
    const nights = Number(this.selectedReservation.extendedProps.nights);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + nights);

    if (this.selectedReservation.id) {
      const event = calendarApi.getEventById(this.selectedReservation.id);
      if (event) {
        event.setProp('title', this.selectedReservation.title);
        event.setDates(startDate, endDate);
        (event as any).setResources([this.selectedReservation.resourceId]);
        Object.keys(this.selectedReservation.extendedProps).forEach(key => { event.setExtendedProp(key, this.selectedReservation.extendedProps[key]); });
      }
    } else {
      calendarApi.addEvent({
        id: Date.now().toString(), title: this.selectedReservation.title || 'Nueva Reserva', resourceId: this.selectedReservation.resourceId,
        start: startDate, end: endDate, extendedProps: this.selectedReservation.extendedProps
      });
    }
    this.closeModal();
  }

  deleteReservation() {
    if (confirm('¿Eliminar esta reserva?')) {
      const calendarApi = this.calendarComponent.getApi();
      const event = calendarApi.getEventById(this.selectedReservation.id);
      if (event) event.remove();
      this.closeModal();
    }
  }

  formatDateForInput(date: Date | string): string { if (!date) return ''; const d = new Date(date); return d.toISOString().split('T')[0]; }
  updateStartDate(val: string) { this.selectedReservation.start = new Date(val + 'T12:00:00'); }
  calculateTotal(): number { return (Number(this.selectedReservation.extendedProps?.nights) || 0) * (Number(this.selectedReservation.extendedProps?.price) || 0); }
  getReservationLabel(title: string, source: string): string {
    if (this.currentView === 'resourceTimelineMonth') { if (source.includes('booking')) return 'BK'; if (source.includes('airbnb')) return 'ArB'; return 'DR'; }
    return title;
  }
  closeModal() { this.isModalOpen = false; this.selectedReservation = null; }
  handlePrev() { this.calendarComponent.getApi().prev(); }
  handleNext() { this.calendarComponent.getApi().next(); }
  changeView(view: string) { this.currentView = view; this.calendarComponent.getApi().changeView(view); }
  renderMonthHeader(arg: any) { const d = arg.date; const isW = (d.getDay() === 0 || d.getDay() === 6) ? 'is-weekend' : ''; const letter = d.toLocaleDateString('es-ES', { weekday: 'narrow' }); const num = d.getDate(); return { html: `<div class="month-stack ${isW}"><span class="month-letter">${letter}</span><span class="month-number">${num}</span></div>` }; }
  renderWeekHeader(arg: any) { const d = arg.date; const isW = (d.getDay() === 0 || d.getDay() === 6) ? 'is-weekend' : ''; const text = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' }); return { html: `<div class="week-full-label ${isW}">${text}</div>` }; }
  renderYearHeader(arg: any) { const text = arg.date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', ''); return { html: `<div class="year-header">${text}</div>` }; }
  loadInitialEvents(resources: any[]) {
    const today = new Date(); const y = today.getFullYear(); const m = today.getMonth(); const d = today.getDate();
    this.calendarOptions.events = [
      { id: '101', resourceId: resources[0]?.id || '1', title: 'Reserva Directa', start: new Date(y, m, d), end: new Date(y, m, d + 2), extendedProps: { source: 'Directo', price: 120000, guests: '2 Adultos', paymentMethod: 'Efectivo', nights: 2 } },
      { id: '102', resourceId: resources[1]?.id || '2', title: 'Familia Smith', start: new Date(y, m, d - 1), end: new Date(y, m, d + 1), extendedProps: { source: 'Airbnb', price: 450000, guests: '4 Adultos', paymentMethod: 'Tarjeta', nights: 2 } }
    ];
  }
}