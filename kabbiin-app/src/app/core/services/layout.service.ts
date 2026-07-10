import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService { 
  // La señal que controla si el menú está abierto o cerrado
  public isSidebarOpen = signal<boolean>(false); 

  // Acción para cambiar el estado
  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }

  // Acción para cerrar forzosamente (útil en móvil)
  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}