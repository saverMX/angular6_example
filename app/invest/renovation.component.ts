import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Contract } from './contract';
import { ContractService } from './contract.service';
import { ContractEditComponent } from './contract-edit.component';

@Component({
    
    selector: "renovation-component",
    templateUrl: "renovation.component.html"
})

export class RenovationComponent implements OnInit{
    contracts: Contract[] = [];

    constructor(private contractService: ContractService,
        private modalService: NgbModal) {

    }

    ngOnInit() {
        this.loadContracts();
    }

    loadContracts(): void {
      this.contractService
        .getContracts("Renovando")
          .subscribe(resp => this.contracts = resp);
    }

    open(contract: Contract) {
        const ref = this.modalService.open(ContractEditComponent);
        ref.componentInstance.contract = contract;
        ref.result.then((r) => {
            if (r == "ok")
                this.loadContracts();
        });
    }

    delete(contract: Contract) {
        if (confirm("Desea borrar este registro?")) {
          this.contractService.delete(contract.idContract)
            .subscribe();
        }
    }

}
