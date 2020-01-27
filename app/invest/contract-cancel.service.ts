import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//app
import { BaseService } from '../shared/base.service';
import { ContractCancel } from './contract-cancel';
import { APP_DI_CONFIG } from '../shared/app.config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ContractCancelService extends BaseService{

    constructor(private http: HttpClient) {
        super();
    }

  getCancelActive(): Observable<ContractCancel[]> {
    return this.http.get<ContractCancel[]>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Contract/GetCancelActive")
      .pipe(catchError(this.handleError("getContractTypes", [])));
    }

  save(cancel: ContractCancel): Observable<any> {
    return this.http.post("/api/Contract/SaveContractCancel", JSON.stringify(cancel), { headers: this.headers });
    }

  delete(id: number): Observable<any> {
    return this.http.post(
      APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Contract/DeleteContractCancel?id=" + id, null)
      .pipe(catchError(this.handleError("getContractTypes", [])));
    }

  uploadImage(image: FormData, id: number): Observable<any> {
    return this.http.post(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Contract/UploadCancelImage?id=" + id, image)
      .pipe(catchError(this.handleError("getContractTypes", [])));
    }
}
