import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IResponseApi } from '../Interfaces/IResponseApi';

@Injectable({
  providedIn: 'root',
})
export class TamanoService {
  private urlApi: string = environment.endpoint + 'Tamano/';

  constructor(private http: HttpClient) {}

  listaCatTamanos(): Observable<IResponseApi> {
    return this.http.get<IResponseApi>(`${this.urlApi}ListaCatTamanos`);
  }
}
