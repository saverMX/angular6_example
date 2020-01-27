import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Contract } from './contract';
import { ContractRelation } from './contract-relation';
import { User } from '../shared/user';
import { APP_DI_CONFIG } from '../shared/app.config';
import { BaseService } from '../shared/base.service';

@Injectable()
export class ContractService extends BaseService {

    //Inject Http class
    constructor(private http: HttpClient) {
        super();
    }

  getContracts(status: string): Observable<Contract[]> {
      return this.http.get<Contract[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Contract/GetActive?status="+status)
      .pipe(catchError(this.handleError("getContractTypes", [])));
    }

  getContractByUser(): Observable<Contract[]> {
    return this.http.get<Contract[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Contract/GetContractByUser")
      .pipe(catchError(this.handleError("getContractTypes", [])));
    }

  getContractOfPartners(): Observable<Contract[]> {
    return this.http.get<Contract[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Contract/GetContractOfPartners")
      .pipe(catchError(this.handleError("getContractTypes", [])));
    }

 

    existFolio(folio: string): Observable<any> {
      return this.http.get<any>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Contract/ExistFolio?folio=" + folio)
        .pipe(catchError(this.handleError("existFolio", [])));
    }

    saveRenovation(contract: Contract): Observable<any> {
      return this.http.post<boolean>(
        "api/Contract/RenovationContract",
        JSON.stringify(contract),
        { headers: this.headers }
      )
        .pipe(catchError(this.handleError("saveRenovation", [])));
    }

    saveContract(contract: Contract): Observable<Contract> {
      return this.http.post<Contract>("/api/Contract/SaveContract", JSON.stringify(contract), { headers: this.headers })
    }

  uploadImage(image: FormData, id: number): Observable<any> {
    return this.http.post(APP_DI_CONFIG.url+"api/Contract/UploadImage?id=" + id, image);
    //return this.http.post(APP_DI_CONFIG.url + "api/Contract/UploadImage", image);
    }

    delete(id: number) {
      return this.http.post( "/api/Contract/DeleteContract?id=" + id, null)
      .pipe(catchError(this.handleError("getContractTypes", [])));
    }
}
