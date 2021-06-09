import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/apiAuth';
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }


  registro(nombreUsuario: string, correo: string, password: string) {

    const url = `${this.baseUrl}/createUser`;
    const body = { correo, password, nombreUsuario };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
            localStorage.setItem('token', token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );

  }



  login(correo: string, password: string) {

    const url = `${this.baseUrl}/accesLogin`;
    const body = { correo, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              get_RazonSocial: resp.get_RazonSocial!,
              get_RfcEmpresa: resp.get_RfcEmpresa!,
              get_tipoEmpresa: resp.get_tipoEmpresa!,
              get_direccion: resp.get_direccion!,

            }
            //console.log(this._usuario)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )

  }

  //Revalidar el Token para ener activa la cuenta
  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/renewToken`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          // console.log(resp.token);
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            get_RazonSocial: resp.get_RazonSocial!,
            get_RfcEmpresa: resp.get_RfcEmpresa!,
            get_tipoEmpresa: resp.get_tipoEmpresa!,
            get_direccion: resp.get_direccion!,
          }

          return resp.ok;
        }),
        catchError(err => of(false))
      );

  }

  //Para hacer un clear
  logout() {
    localStorage.clear();
  }
}
