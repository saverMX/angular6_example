
export class Contract {
  constructor() {
    this.folio = "";
    this.idContract = 0;
    this.idContractRenovation = 0;
    this.idContractType = 0;
    this.invest = 0;
    this.hasContractSigned = false;
    this.status = 0;
    this.isVariable= false;
  }
  expiration?: number;
  contractDate?: number;
  idContract: number;
  idContractRenovation: number;
  folio: string;
  idContractType: number;
  contractType: string;
  invest: number;
  idInvestor: string;
  investorName: string;
  isVariable: boolean;
  statusName: string;
  status: number;
  hasContractSigned: boolean;
  hasCancelation: boolean;
  hasRenovation: boolean;
  payed: number;
  reinvest: number;
  isParent: boolean;
  isChild: boolean;
  isReinvestable: boolean;
  idInvestorReference?: number;
  cancelationFee: number


}
