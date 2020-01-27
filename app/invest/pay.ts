
export class Pay {
    constructor(
        public idPay: number,
        public idContrat: number,
        public contract: string,
        public investor: string,
        public payment: number,
        public payDayTicks: number,
        public remainingPays: number,
        public status: number, //1: Pending To Pay, 2: Payed, 3: Cancelled
        public timeToPay: number, //1: OK, 2: Coming To Pay, 3: Pay is out of time
      public methodPay: number,//1:Transferencia 2:Deposito
      public type: number,
        public originType: number,
        public roi: number,
      public elapsed: number,
      public reference: string,
      public nextPayTicks?: number,
      public isReinvestable?: boolean,
      public isPayable?: boolean
    ) { 
        this._payDay = new Date(this.payDayTicks);
        if (this.nextPayTicks)
            this._nextPay = new Date(this.nextPayTicks);
    }
    private _payDay: Date;
    private _nextPay?: Date;
    
    get PayDay(): Date{
        return this._payDay;
    }

    get NextPay(): Date {
        
        return this._nextPay;
    }


    
}
