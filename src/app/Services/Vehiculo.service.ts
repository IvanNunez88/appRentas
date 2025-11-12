import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IResponseApi } from '../Interfaces/IResponseApi';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private urlApi: string = environment.endpoint + 'Vehiculo/';

  constructor(private http: HttpClient) {}

  guardar(pDicDatos: Record<string, any>): Observable<IResponseApi> {
    return this.http.request<IResponseApi>('post', `${this.urlApi}Guardar`, {
      body: {
        descrip: pDicDatos['descrip'],
        idTamaño: pDicDatos['idTamaño'],
        capacidad: pDicDatos['capacidad'],
        pRenta: pDicDatos['pRenta'],
      },
    });
  }

  actualizar(pDicDatos: Record<string, any>): Observable<IResponseApi> {
    return this.http.request<IResponseApi>('put', `${this.urlApi}Actualizar`, {
      body: {
        idVehiculo: pDicDatos['idVehiculo'],
        descrip: pDicDatos['descrip'],
        idTamaño: pDicDatos['idTamaño'],
        capacidad: pDicDatos['capacidad'],
        pRenta: pDicDatos['pRenta'],
        isEstado: pDicDatos['isEstado'],
      },
    });
  }

  listaVehiculos(): Observable<IResponseApi> {
    return this.http.get<IResponseApi>(`${this.urlApi}ListaVehiculos`);
  }
}
