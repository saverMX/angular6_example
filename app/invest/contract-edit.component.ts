import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//System
import { Contract } from './contract';
import { User } from '../shared/user';
import { ContractService } from './contract.service';
import { UserService } from '../shared/user.service';
import { ContractType } from './contract-type';
import { ContractTypeService } from './contract-type.service';
import { Observable, forkJoin } from 'rxjs';

@Component(
    {
        
        selector: "contract-edit",
        templateUrl: "contract-edit.component.html"
    })

export class ContractEditComponent implements OnInit {
    @Input()
    idContractOld: number = 0;

    @Input()
    contract: Contract;

    investors: User[] = [];

    types: ContractType[] = [];

    contractTime: any;

    originalFolio: string = "";

    userRelated: string = "";

  errorRef: string = "";

  invalidLimit: boolean = false;

  invalidFolio: boolean = false;

    constructor(
        private activeModal: NgbActiveModal,
      private userService: UserService,
      private contractService: ContractService,
        private contractTypeService: ContractTypeService) {
    }

    ngOnInit(): void {

      //Init contract
      if (!this.contract) {
        this.contract = new Contract();
      }
      else {
        this.originalFolio = this.contract.folio;
      }

      forkJoin(
        this.contractTypeService.getContractTypes(),
        this.userService.getInvestors()).subscribe(r => { 
         

          this.types = r[0] as ContractType[];
          this.investors = r[1] as User[];

          this.contract.idContractType = this.types[0].idContractType;
          this.contract.idInvestor = this.investors[0].id;

          //Init Contract Day
          if (this.contract.contractDate > 0) {
            let date = new Date(this.contract.contractDate);
            this.contractTime = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
          }

          //Init Expiration Day
          console.log('init');
          this.CalculateExpirationDate();
        });

        
    }

    //Methods
    onSubmit(): void {
        if (this.contractTime)
        {
            //Si solo tiene fecha
            var date = new Date(this.contractTime.year, this.contractTime.month - 1, this.contractTime.day);
          this.contract.contractDate = date.getTime();
          this.contract.status = 1; //Pending
        }
        else
          this.contract.contractDate = null;
        this.contractService.saveContract(this.contract).subscribe(() => {
                this.activeModal.close("ok");
            });

    }

  changeDate(): void {
    this.CalculateExpirationDate();
  }

  private CalculateExpirationDate(): void {
    
    if (this.contractTime !== undefined) {
      var type = this.types.filter((t) => t.idContractType == this.contract.idContractType).pop();
      var day = this.contractTime.day;
      var month = (this.contractTime.month - 1) + (type.duration);
      var year = this.contractTime.year; 

      var date = new Date(year, month, day);
      this.contract.expiration = date.getTime();
    }
  }

    close(): void {
        this.activeModal.close();
    }

    validateFolio(folio: string): void {
        //alert('Bluring');
      if (this.originalFolio != folio.trim()) {
        this.contractService.existFolio(folio).subscribe(resp => {
          if (resp) {
            //alert("El folio ya esta siendo utilizado en otro contrato. Favor de modificarlo.");
            this.invalidFolio = true;
            this.contract.folio = this.originalFolio;
          }
          else {
            this.invalidFolio = false;
          }

        });
      }
    }

  existsFolio(folio: string): void {
    this.contractService.existFolio(folio).subscribe(resp => {
            if (!resp) {
                alert("El folio de este contrato no existe. Favor de modificarlo.");
            }
        });
  }

  validateLimit(invest: number) {
    let type = this.types.find(x => x.idContractType == this.contract.idContractType);
    
    if (type.limit > invest) {
      this.invalidLimit = true;
    }
    else {
      this.invalidLimit = false;
    }
  }
}
