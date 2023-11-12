import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlAPI = 'http://127.0.0.1:5000/';


  constructor(private http: HttpClient) { }


  public getData(): Observable<any>{
    return this.http.get<any>(this.urlAPI)
  }


  public deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}/delete/${id}`);
  }


  public addCategory(nombre: string, precio: number, id_padre: number): Observable<any> {
    const data = { nombre, precio, id_padre }; // Crear un objeto con los datos
    return this.http.post(`${this.urlAPI}/add`, data);
  }
}

