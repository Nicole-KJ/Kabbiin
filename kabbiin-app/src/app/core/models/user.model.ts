export interface User {
    uid: string;
    nombreCompleto: string;
    email: string;
    rol: 'Admin' | 'Propietario' | 'Mantenimiento';
    fotoUrl?: string;
    activo: boolean;
    fechaRegistro: Date;
}