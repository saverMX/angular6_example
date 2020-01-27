import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

//APP
import { Contract } from './contract';
import { ContractCancelService } from './contract-cancel.service';
import { UserService } from '../shared/user.service';
import { ContractCancelComponent } from './contract-cancel.component';
import { ContractCancel } from './contract-cancel';
import { User } from '../shared/user';
import { ContractCancelImageComponent } from './contract-cancel-image.component';

@Component({
    
    selector: "renovation-component",
    templateUrl: "cancelation.component.html"
})

export class CancelationComponent implements OnInit {
    cancelations: ContractCancel[] = [];

    isAdmin : boolean = false;

    constructor(private cancelService: ContractCancelService,
        private userService: UserService,
        private modalService: NgbModal) {
    }

    ngOnInit() {

      this.userService.getUser("1").
        subscribe(resp =>
                this.isAdmin = resp.isAdmin
            );
        this.loadData();        
    }

    loadData(): void {
        this.cancelService
          .getCancelActive()
          .subscribe(resp =>
                this.cancelations = resp
            );
    }

    open(param: ContractCancel) {
        const ref = this.modalService.open(ContractCancelComponent);
        ref.componentInstance.cancel = param;
        ref.result.then(r => {
            if (r == "ok")
                this.loadData();
        });


    }

    delete(param: ContractCancel) {
      if (confirm("Desea borrar este registro?")) {
        this.cancelService.delete(param.idContractCancel).subscribe((r) => { if (r) this.loadData(); });
        }
    }

    upload(param: ContractCancel) {
        const ref = this.modalService.open(ContractCancelImageComponent);
        ref.componentInstance.cancel = param;
        ref.result.then(r => {
            if (r == "ok")
                this.loadData();
        });
    }

}
