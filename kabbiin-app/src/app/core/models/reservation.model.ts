export interface Reservation {
  id: string;              // ID único (en el futuro será un GUID de SQL)
  cabinId: number;         // A qué cabaña pertenece
  title: string;           // Nombre del huésped (ej: "Juan Pérez")
  start: string;           // Fecha inicio (ISO string: '2026-01-24T14:00:00')
  end: string;             // Fecha fin
  source: 'airbnb' | 'booking' | 'direct' | 'expedia'; // ¿De dónde viene?
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in';
  totalPrice?: number;     // Opcional por ahora, pero vital para reportes
  guestCount?: number;     // Para saber cuántas toallas preparar
  externalId?: string;     // El ID original de Airbnb/Booking (Vital para sincronizar)
}