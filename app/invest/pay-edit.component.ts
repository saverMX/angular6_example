import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Pay } from './pay';
import { PayService } from './pay.service';

@Component({
    
    selector: 'pay-edit',
    templateUrl: 'pay-edit.component.html',
    
    
})
export class PayEditComponent implements OnInit {
    pay: Pay;

    private contractTime: NgbDateStruct;

    payType: number;

    constructor(private payService: PayService, private activeModel: NgbActiveModal) { }

  ngOnInit() {
    var date = new Date();

        this.contractTime = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
    }

    onSubmit(file: any): void {
        //configuring file
        var input = new FormData();
        input.append("image", file.files[0]);

      //status: PAGADO
      this.payService.savePay(this.pay.idPay, this.payType, 2, input).subscribe(() => this.activeModel.close("ok"));

  }

}
