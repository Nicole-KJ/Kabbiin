import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model'; // <--- OJO: models en minúscula

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _currentUser = signal<User | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor() {
    this.cargarUsuarioSimulado();
  }

  private cargarUsuarioSimulado() {
    const usuarioMock: User = {
      uid: 'u-001',
      nombreCompleto: 'Esteban Admin',
      email: 'esteban@kabbiin.cr',
      rol: 'Propietario',
      fotoUrl: 'https://ui-avatars.com/api/?name=Esteban&background=0D8ABC&color=fff',
      activo: true,
      fechaRegistro: new Date()
    };
    this._currentUser.set(usuarioMock);
  }

  logout() {
    this._currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }
}