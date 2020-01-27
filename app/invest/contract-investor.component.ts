import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

// System
import { Pay } from './pay';
import { Contract } from './contract';
import { ContractCancel } from './contract-cancel';
import { ContractService } from './contract.service';
import { PayService } from './pay.service';
import { ContractEditComponent } from './contract-edit.component';
import { ContractCancelComponent } from './contract-cancel.component';
import { NodeContract } from './node-contract';
import { ContractRelation } from './contract-relation';
import { StatusOfContractCancel, StatusOfContract, PayType, StatusOfPay } from '../shared/enums'

@Component({

  selector: "contract-investor",
  templateUrl: "contract-investor.component.html",
  styleUrls: ['contract-investor.component.css']
})

export class ContractInvestorComponent implements OnInit {
  investor: string;
  total: number = 0;
  acumulado: number = 0;
  pagado: number = 0;
  reinvertido: number = 0;
  hasStructure: boolean = false;
  root: NodeContract;
  pays: Pay[] = [];
  maxWidth: number;

  contractInvestor: NodeContract[];
  contracts: Contract[] = [];

  constructor(private contractService: ContractService,
    private payService: PayService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  createNode(contracts: Contract[]): NodeContract {

    //el contrato root siempre es el de tipo variable
    var c = contracts[0];
    var root = new NodeContract(c.folio, c.idContract);
    root.invest = c.invest;
    root.investor = c.investorName;
    for (let r of contracts) {
      if (r.idContract == root.idContrato)
        continue;
      root.insertRecursive(r);
    }

    return root;

  }

  requestPay(pay: Pay, type: number): void {
    pay.type = PayType.Pago; //payed
    pay.status = StatusOfPay.Pendiente; //Pendiente de pago
    pay.reference = "Cargo generado por cobro de interes.";
    this.payService.createPay(pay).subscribe(() => {
      this.payService.GetCalculatedPay().subscribe(x => this.pays = x);
    });
  }

  requestReInvest(pay: Pay): void {
    pay.type = PayType.Reinversion;
    pay.methodPay = 3; //PorSistema
    pay.status = StatusOfPay.Pendiente; //Pago Automatico
    pay.reference = "Cargo generado por reinversion de interes.";
    this.payService.createPay(pay).subscribe(() => {
      this.payService.GetCalculatedPay().subscribe(x => this.pays = x);
    });
  }

  renovation(contract: Contract): void {
    this.contractService.saveRenovation(contract).subscribe(x => {
      contract.status = StatusOfContract.Renovado;
      this.contractService.saveContract(contract).subscribe(x => {
        
      });

    });
  }

  finish(contract: Contract): void {
    contract.status = StatusOfContract.Terminado;
    this.contractService.saveContract(contract).subscribe(x => { });
  }

  cancelation(contract: Contract): void {
    const ref = this.modalService.open(ContractCancelComponent);
    //Defining new contract cancel
    let cancel = new ContractCancel();
    cancel.idContract = contract.idContract;
    cancel.folio = contract.folio;
    cancel.status = StatusOfContractCancel.Solicitado; //Request
    cancel.invest = contract.invest;
    cancel.fee = contract.invest * contract.cancelationFee;
    ref.componentInstance.cancel = cancel;

  }

  setClass(pay: Pay) {
    let classes = {
      'check': pay.status == 2,
      'fa-check-circle-o': pay.status == 3,
      'fa-clock-o': pay.status == 1,
      green: pay.status == 1 && pay.timeToPay == 1,
      yellow: pay.status == 1 && pay.timeToPay == 2,
      red: pay.status == 1 && pay.timeToPay == 3

    };
    return classes;
  }

  loadData() {
    forkJoin(
      this.contractService.getContractByUser(),
      this.payService.getPaysByInvestor(),
      this.payService.GetCalculatedPay()
    ).subscribe(resp => {

      var arrayContracts = resp[0] as Contract[];
      var arrayPay = resp[1] as Pay[];
      var arrayToPay = resp[2] as Pay[];
      var contractParent = arrayContracts[0];


      //si el inversionista tiene contratos variables
      this.hasStructure = arrayContracts[0].isVariable;
      var x = 0;
      let c: NodeContract[] = [];
      this.contracts = arrayContracts.filter(x => x.idInvestor == contractParent.idInvestor);
      console.log(arrayContracts);
      //calculo de invertido
      for (x = 0; x < this.contracts.length; x++) {

        var contractAux = this.contracts[x];
        if (contractAux.idInvestor != contractParent.idInvestor)
          continue;

        this.total += contractAux.invest;
      }

      this.root = this.createNode(arrayContracts);

      //calculate width tree zone
      this.maxWidth = Math.pow(2, NodeContract.getFloor(this.root)) * 400;

      var x = 0;
      // Reinvertidos
      var reinvest = arrayPay.filter((x) => x.type == PayType.Reinversion);
      for (x = 0; x < reinvest.length; x++) {
        this.reinvertido += reinvest[x].payment;
      }

      // Pagado
      var payed = arrayPay.filter((x) => x.type == 3 || x.type == 1);
      for (x = 0; x < payed.length; x++) {
        this.pagado += payed[x].payment;
      }

      // Acumulado
      this.acumulado = arrayContracts.filter(x => x.idInvestor == contractParent.idInvestor).length;

      //los pagos proximos
      this.pays = arrayToPay;
    });
  }
}

