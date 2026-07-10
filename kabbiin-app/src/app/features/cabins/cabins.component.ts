import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabins',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cabins-wrapper custom-scrollbar">
      <div class="page-header">
        <div>
          <h2 class="title">Mis Cabañas</h2>
          <p class="subtitle">Gestiona tu inventario, precios y disponibilidad.</p>
        </div>
        <button class="btn-primary">
          <span class="material-icons-outlined">add</span> Nueva Cabaña
        </button>
      </div>

      <div class="cabins-grid">
        <div class="cabin-card" *ngFor="let cabin of cabins">
           <div class="card-image">
              <span class="status-badge" [ngClass]="cabin.statusClass">{{ cabin.status }}</span>
              <div class="img-placeholder"><span class="material-icons-outlined icon-lg">bungalow</span></div>
           </div>
           <div class="card-body">
              <div class="header-row">
                 <h3 class="cabin-name">{{ cabin.name }}</h3>
                 <span class="cabin-type">{{ cabin.type }}</span>
              </div>
              <p class="description">{{ cabin.description }}</p>
              <div class="specs-row">
                 <div class="spec"><span class="material-icons-outlined">group</span><span>{{ cabin.pax }} Pax</span></div>
                 <div class="spec"><span class="material-icons-outlined">bed</span><span>{{ cabin.beds }} Camas</span></div>
                 <div class="spec"><span class="material-icons-outlined">wifi</span><span>{{ cabin.wifi ? 'Wifi' : 'No Wifi' }}</span></div>
              </div>
           </div>
           <div class="card-footer">
              <div class="price-col"><span class="price-label">Precio Base</span><span class="price-val">{{ cabin.price }} <small>/noche</small></span></div>
              <div class="actions">
                 <button class="btn-icon" title="Editar"><span class="material-icons-outlined">edit</span></button>
                 <button class="btn-icon" title="Configurar"><span class="material-icons-outlined">settings</span></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
    .cabins-wrapper { padding: 24px 32px; height: 100%; display: flex; flex-direction: column; font-family: 'Inter', sans-serif; overflow-y: auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .title { font-size: 1.5rem; font-weight: 800; color: #1E293B; margin: 0 0 4px 0; }
    .subtitle { color: #64748B; font-size: 0.9rem; margin: 0; }
    .btn-primary { background: #2563EB; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: background 0.2s; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); }
    .btn-primary:hover { background: #1D4ED8; }
    .cabins-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; padding-bottom: 40px; }
    .cabin-card { background: white; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; }
    .cabin-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -5px rgba(0,0,0,0.1); }
    .card-image { height: 160px; background: #F1F5F9; position: relative; }
    .img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #CBD5E1; }
    .icon-lg { font-size: 64px; }
    .status-badge { position: absolute; top: 12px; right: 12px; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .active { color: #16A34A; } .maintenance { color: #F59E0B; }
    .card-body { padding: 20px; flex: 1; border-bottom: 1px solid #F8FAFC; }
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .cabin-name { font-size: 1.1rem; font-weight: 800; color: #1E293B; margin: 0; }
    .cabin-type { font-size: 0.75rem; color: #2563EB; background: #EFF6FF; padding: 2px 8px; border-radius: 6px; font-weight: 600; }
    .description { font-size: 0.85rem; color: #64748B; line-height: 1.4; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .specs-row { display: flex; gap: 16px; }
    .spec { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #475569; font-weight: 500; }
    .spec span.material-icons-outlined { font-size: 18px; color: #94A3B8; }
    .card-footer { padding: 16px 20px; background: #FAFAFA; display: flex; justify-content: space-between; align-items: center; }
    .price-label { display: block; font-size: 0.7rem; color: #94A3B8; font-weight: 600; text-transform: uppercase; }
    .price-val { font-size: 1rem; font-weight: 800; color: #1E293B; }
    .price-val small { font-size: 0.75rem; font-weight: 500; color: #64748B; }
    .actions { display: flex; gap: 8px; }
    .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #E2E8F0; background: white; color: #64748B; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .btn-icon:hover { background: #2563EB; color: white; border-color: #2563EB; }
  `]
})
export class CabinsComponent {
  cabins = [
    { name: 'Cabaña #1 - Bosque', type: 'Familiar', description: 'Hermosa cabaña rodeada de pinos.', status: 'Activa', statusClass: 'active', pax: 6, beds: 4, wifi: true, price: '₡45,000' },
    { name: 'Cabaña #2 - Río', type: 'Parejas', description: 'Acogedora cabaña junto al río.', status: 'Activa', statusClass: 'active', pax: 2, beds: 1, wifi: true, price: '₡35,000' },
    { name: 'Glamping Domo', type: 'Deluxe', description: 'Experiencia de lujo con jacuzzi.', status: 'Mantenimiento', statusClass: 'maintenance', pax: 2, beds: 1, wifi: true, price: '₡60,000' },
    { name: 'Cabaña #3 - Vista', type: 'Estándar', description: 'Vista panorámica al valle.', status: 'Activa', statusClass: 'active', pax: 4, beds: 2, wifi: false, price: '₡40,000' },
    { name: 'Cabaña #4 - Eco', type: 'Económica', description: 'Opción minimalista.', status: 'Activa', statusClass: 'active', pax: 2, beds: 2, wifi: true, price: '₡25,000' }
  ];
}