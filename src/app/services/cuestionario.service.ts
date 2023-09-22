import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Cuestionario } from '../models/cuestionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  tituloCuestionario?: string ;
  descripcionCuestionario?: string;
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Cuestionario/';
  }

  //Guardar cuestionario
  guardarCuestionario(cuestionario: Cuestionario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, cuestionario);
  }

  //Obtener el listado de cuestionarios por el idUser
  getListCuestionarioByUser(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarioByUser');
  }

  //Eliminar lógicamente un cuestionario por el id
  deleteCuestionario(idCuestionario: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + idCuestionario);
  }

  //Obtener cuestionario por id
  getCuestionario(idCuestionario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario);
  }

  getListCuestionarios(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarios');
  }
}
