import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators'
//APP
import { Pay } from './pay';
import { APP_DI_CONFIG } from '../shared/app.config';
import { BaseService } from '../shared/base.service';

@Injectable()
export class PayService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getPays(): Observable<Pay[]> {
    return this.http.get<Pay[]>(APP_DI_CONFIG.url + "api/Pay/GetActive");
  }

  getPaysByInvestor(): Observable<Pay[]> {
    return this.http.get<Pay[]>(
      APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Pay/GetPayByInvestor")
      .pipe(catchError(this.handleError("getContractTypes", [])));

  }

  GetCalculatedPay(): Observable<Pay[]> {
    return this.http.get<Pay[]>(
      APP_DI_CONFIG.url + APP_DI_CONFIG.api + "Pay/GetCalculatedPay")
      .pipe(catchError(this.handleError("getContractTypes", [])));
  }

  savePay(id: number, payType: number, payStatus: number, files: FormData): Observable<any> {
    return this.http.post("/api/Pay/SavePay?id=" + id + "&payMode=" + payType + "&payStatus=" + payStatus, files)
      .pipe(catchError(this.handleError("getContractTypes", [])));
  }

  createPay(pay: Pay): Observable<any> {
    return this.http.post("/api/Pay/CreatePay", JSON.stringify(pay), { headers: this.headers })
      .pipe(catchError(this.handleError("getContractTypes", [])));
  }
}
