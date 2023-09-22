import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtHelperService} from '@auth0/angular-jwt';
import  {  JwtModule  }  from  '@auth0/angular-jwt' ;
import  {  HttpClientModule  }  from  '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Login';
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  getTokenDecoded(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      return decodeToken;
    } else {
      // Manejar el caso en que no hay token en el LocalStorage (opcional)
      return null;
    }
  }

  removeLocalStorage(): void {
    localStorage.removeItem('token');
  }
}
