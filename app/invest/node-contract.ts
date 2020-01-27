import { Contract } from '../invest/contract'

export class NodeContract {

    public folio: string;
    public nivel: number;
    public idContrato: number;
    public left: NodeContract;
    public rigth: NodeContract;
    //Info
    public investor: string;
    public invest: number;
    public roi: number;

    constructor(folio: string, idContrato: number ) {
        this.folio = folio;
        this.idContrato = idContrato;
    }

    find(id: number): NodeContract {
        if (this.idContrato === id) {
            return this;
        }
        else {
            if (this.left != null) {
                return this.left.find(id);
            }
            if (this.rigth != null) {
                return this.rigth.find(id);
            }
        }

        return null;
  }

  insertRecursive(contract: Contract): void {

    if (!this.left) {
      this.left = new NodeContract(contract.folio, contract.idContract);
      this.left.invest = contract.invest;
      this.left.investor = contract.investorName;
    }
    else if (!this.rigth) {
      this.rigth = new NodeContract(contract.folio, contract.idContract);
      this.rigth.invest = contract.invest;
      this.rigth.investor = contract.investorName;
    }
    else {
      let l_max = this.getMaxLevel(this.left);
      let r_max = this.getMaxLevel(this.rigth);

      if (l_max < 2)
        this.left.insertRecursive(contract);
      else if (r_max < 2)
        this.rigth.insertRecursive(contract);
      else
        this.left.insertRecursive(contract);
    }
  }

  getMaxLevel(root: NodeContract): number {
    var level = 1;

    if (root == null)
      return 0;

    let l_max = this.getMaxLevel(root.left);
    let r_max = this.getMaxLevel(root.rigth);
    level = l_max + r_max;
    return level;
  }

  static getFloor(root: NodeContract): number {
    var level = 0;

    if (root == null)
      return 0;

    level = root.nivel;

    let left = this.getFloor(root.left);
    if (left > level)
      level = left;

    let rigth = this.getFloor(root.rigth);
    if (rigth > level)
      level = rigth;

    return level;
  }
    
}
