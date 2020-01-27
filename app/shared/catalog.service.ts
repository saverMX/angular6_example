import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//App
import { APP_DI_CONFIG } from '../shared/app.config';
import { State } from './state';
import { City } from './city';
import { BaseService } from '../shared/base.service';
import { Catalog } from './catalog';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CatalogService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Catalog/GetStates")
      .pipe(catchError(this.handleError("getStates", [])));
        
    }

  getCities(id: number): Observable<City[]> {
      return this.http.get<City[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Catalog/GetCities?id=" + id)
        .pipe(catchError(this.handleError("getCities", [])));

    }

  getPropertyTypes(): Observable<Catalog[]> {
      return this.http.get<Catalog[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Catalog/GetPropertyTypes")
        .pipe(catchError(this.handleError("getPropertyTypes", [])));
    }

}
