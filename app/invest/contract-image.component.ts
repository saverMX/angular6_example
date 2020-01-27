import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//System
import { Contract } from './contract';
import { ContractService } from './contract.service';


@Component({
    
    selector: "contract-image",
    templateUrl: "contract-image.component.html",
    styleUrls: [ "contract-image.component.css" ]
})

export class ContractImageComponent {

    @Input()
    contract: Contract;

    isDragOver: boolean = false;

    isDropped: boolean = false;

    file: FormData;

    constructor(private activeModel: NgbActiveModal,
        private contractService: ContractService) {

    }

    dragging(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = true;

    }

    notDragging(): void {
        this.isDragOver = false;
    }

    dropping(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this.notDragging();
        this.isDropped = true;
        this.file = new FormData();
        this.file.append("image", event.dataTransfer.files[0]);
        
    }

    save(fileInp: any): void {

        if (!this.file) {
            this.file = new FormData();
            this.file.append("image", fileInp.files[0]);
        }

        this.contractService.uploadImage(this.file, this.contract.idContract).subscribe(x => {
            this.activeModel.close("ok");
        });
    }

    open(fileInp: any) {
        fileInp.click();
        this.isDropped = true;
       
    }

}
