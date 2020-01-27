import { Component, Input, OnInit, Output } from '@angular/core';

//app
import { NodeContract } from './node-contract';


@Component({
    selector: 'node',
    templateUrl: 'node.component.html',
    styleUrls: [ 'invest.css' ]
})
export class NodeComponent implements OnInit{

    @Input()
    root: NodeContract;

    @Input()
    calculatedWidth: number;

  withChild: boolean;

  isRootValid: boolean;


  ngOnInit() {
    
    if (this.root) {
      console.log("folio: " + this.root.folio);
      this.isRootValid = true;
      this.withChild = !this.root.left || !this.root.rigth;
    }
    else {
      this.withChild = false;
      this.isRootValid = false;
    }
  }

    getType(): string {
        if (this.root)
            return "circle";
        else
            return "circle_red";
    }


    getW(): number {
        if (this.root.nivel == 1)
            return 1400;
    }
}
