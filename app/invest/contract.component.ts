
import { Component, OnInit } from "@angular/core"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/toPromise';


//Project
import { Contract } from './contract';
//import { StatusOfContract } from '../shared/enums'
import { ContractCancel } from './contract-cancel';
import { ContractService } from './contract.service';
import { ContractEditComponent } from './contract-edit.component';
import { ContractImageComponent } from './contract-image.component';
import { ContractCancelComponent } from './contract-cancel.component';
import { Console } from "@angular/core/src/console";
import { StatusOfContract } from '../shared/enums'

@Component({
    
    selector: 'my-contract',
    templateUrl: 'contract.component.html',
    styles: ['.green{ color: green; }']
})
export class ContractComponent implements OnInit{
    contracts: Contract[] = [];

  contractFiltered: Contract[] = [];

  statusList: string[] = ["Pendiente","Activo","Terminado","Renovado","Cancelado","Expirado"];

  statusSel: string = "";
   
    constructor(private contractService: ContractService, private modalService: NgbModal)
    { }

    ngOnInit(): void {
      //INIT CONTRACT
      this.loadContracts(); //Activos
    }

  cancel(contract: Contract) {

    let cancel = new ContractCancel();
    cancel.idContract = contract.idContract;
    cancel.invest = contract.invest;
    cancel.fee = contract.status != StatusOfContract.Pendiente  ? contract.invest * contract.cancelationFee : 0;
    //open modal with contract cancel component
    const ref = this.modalService.open(ContractCancelComponent);
    ref.componentInstance.cancel = cancel;

  }

    open(contract: Contract): void {
        const ref = this.modalService.open(ContractEditComponent);
        ref.componentInstance.contract = contract;
        ref.result.then((r) =>
        {
          if (r == "ok") {
            this.loadContracts();
            }
        });
    }

    load(contract: Contract): void {
        const ref = this.modalService.open(ContractImageComponent);
        ref.componentInstance.contract = contract;
        ref.result.then((r) => {
          if (r == "ok") {
            this.loadContracts();
          }
        });

    }

  loadContracts(): void {
    if (this.statusSel == undefined)
      this.statusSel = "";

    //receiving info
    this.contractService.getContracts(this.statusSel).
      subscribe(resp => {
        console.log(resp);
        this.contracts = resp; 
      });
  }

  disableButton(selected: Contract): boolean {


    if (selected.hasCancelation) {
      return true;
    }

    return selected.status != StatusOfContract.Pendiente;
  }
    
    
}
