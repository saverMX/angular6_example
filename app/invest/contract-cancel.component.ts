import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//App
import { ContractCancel } from './contract-cancel';
import { ContractCancelService } from './contract-cancel.service';
import { ContractTypeService } from './contract-type.service'
import { AuthenticationService } from '../auth/authentication.service'
import { UserService } from '../shared/user.service';

@Component({
    
    selector: 'contract-cancel',
    templateUrl: 'contract-cancel.component.html',
    styles:[' label {  width: 100px } ']
})
export class ContractCancelComponent implements OnInit {

    //fields
    @Input()
    cancel: ContractCancel;

    isAdmin: boolean = false;

    constructor(private activeModal: NgbActiveModal,
      private authService: AuthenticationService,
      private contractCancelService: ContractCancelService
    )
    { }

  ngOnInit() {
    if (this.authService.currentUserValue) { this.isAdmin = this.authService.currentUserValue.isAdmin; }
    }

  save() {
    this.contractCancelService.save(this.cancel).subscribe((resp) => {
            if (resp)
                this.activeModal.close("ok");
        });
    }
    
    close() {
        this.activeModal.close();
    }
}
