import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ContractType } from './contract-type'
import { APP_DI_CONFIG } from '../shared/app.config';
import { BaseService } from '../shared/base.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ContractTypeService extends BaseService {

    //Declare url

    constructor(private http: HttpClient) {
        super();
    }

  getContractTypes(): Observable<ContractType[]> {
    return this.http.get<ContractType[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Catalog/GetContractType")
      .pipe(catchError(this.handleError("getContractTypes",[])));
  }
}
