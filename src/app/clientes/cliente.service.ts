import { Injectable } from '@angular/core';
//Importamos la constante CLIENTES
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable ,  of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient) { }

  //Show Clientes
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    //con map
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[])
    );
  }

  //CREAR CLIENTE
  create (cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
  }

  //EDITAR CLIENTE
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }

  //ACTUALIZAR CLIENTE
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
  }

  //BORRAR CLIENTE
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }


}
