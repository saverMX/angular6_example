import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContractComponent } from './contract.component';
import { PayComponent } from './pay.component';
import { ContractInvestorComponent } from './contract-investor.component';
import { RenovationComponent } from './renovation.component';
import { CancelationComponent } from './cancelation.component';


const appRoutes: Routes = [
    {
        path: 'Invest',
        children: [
            { path: '', component: ContractComponent },
            { path: 'Pay', component: PayComponent },
            { path: 'Renovation', component: RenovationComponent },
            { path: 'Cancelation', component: CancelationComponent },
            { path: 'Investor', component: ContractInvestorComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class InvestRoutingModule { }
