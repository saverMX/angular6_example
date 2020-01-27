import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//App
import { Pay } from './pay';
import { PayService } from './pay.service';
import { PayEditComponent } from './pay-edit.component';

@Component({
    
    selector: 'my-pay',
    templateUrl: 'pay.component.html',
    styleUrls: ['pay.component.css']
})

export class PayComponent implements OnInit{
    pays: Pay[] = [];

    constructor(private payService: PayService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.loadPays();
    }

    private loadPays() {
      this.payService.getPays()
        .subscribe(r =>
                this.pays = r
            );
    }

    open(pay: Pay): void {
        var component = this.modalService.open(PayEditComponent);
        component.componentInstance.pay = pay;
        component.result.then((r) => { if (r == "ok") { this.loadPays(); } });
    }

    setSemaphore(actual: number) {
        let classes = {
            green: actual === 1,
            yellow: actual === 2,
            red: actual === 3
        };
        return classes;
    }

}
