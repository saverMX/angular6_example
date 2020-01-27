import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatSelectModule } from '@angular/material';

//APP
//Components
import { ContractComponent } from './contract.component';
import { ContractEditComponent } from './contract-edit.component';
import { ContractImageComponent } from './contract-image.component';
import { PayComponent } from './pay.component';
import { PayEditComponent } from './pay-edit.component';
import { ContractInvestorComponent } from './contract-investor.component';
import { RenovationComponent } from './renovation.component';
import { ContractCancelComponent } from './contract-cancel.component';
import { CancelationComponent } from './cancelation.component';
import { ContractCancelImageComponent } from './contract-cancel-image.component';
import { NodeComponent } from './node.component';

//Services
import { ContractCancelService } from './contract-cancel.service';
import { ContractService } from './contract.service';
import { ContractTypeService } from './contract-type.service';
import { PayService } from './pay.service';

//Module
import { InvestRoutingModule } from './invest-routing.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgbModule.forRoot(),
      MatButtonModule,
      MatSelectModule,
      InvestRoutingModule,
      
    ],
    declarations: [
        ContractComponent,
        ContractEditComponent,
        ContractImageComponent,
        ContractInvestorComponent,
        PayComponent,
        RenovationComponent,
        CancelationComponent,
        ContractCancelComponent,
        ContractCancelImageComponent,
        PayEditComponent,
        NodeComponent,
    ],
    providers: [
        ContractService,
        ContractTypeService,
        ContractCancelService,
        PayService
    ],
    entryComponents: [
        ContractEditComponent,
        ContractImageComponent,
        PayEditComponent,
        ContractCancelComponent,
        ContractCancelImageComponent
    ]
})
export class InvestModule { }
