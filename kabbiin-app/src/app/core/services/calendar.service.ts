import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs'; // <--- IMPORTANTE: Agregamos Subject

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // --- 1. COMUNICACIÓN: CANAL PARA ABRIR EL MODAL ---
  
  // Creamos el emisor de la señal
  private openModalSource = new Subject<void>();

  // Creamos la "antena" pública (openModal$) que el calendario está buscando
  openModal$ = this.openModalSource.asObservable();

  constructor() { }

  // Esta es la función que debe llamar tu botón azul del menú lateral
  triggerNewReservation() {
    this.openModalSource.next();
  }

  // --- 2. DATOS DE CABAÑAS (Tu código existente) ---
  getCabins(): Observable<any[]> {
    return of([
      { id: '1', title: 'Cabaña #1 (Familiar)' },
      { id: '2', title: 'Cabaña #2 (Parejas)' },
      { id: '3', title: 'Cabaña #3 (Vista al Mar)' },
      { id: '4', title: 'Cabaña #4 (Económica)' },
      { id: '5', title: 'Cabaña #5 (Deluxe)' }
    ]);
  }
}