import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//System
import { ContractCancel } from './contract-cancel';
import { ContractCancelService } from './contract-cancel.service';

@Component({
    
    selector: "contract-image",
    templateUrl: "contract-cancel-image.component.html",
    styleUrls: [ "contract-image.component.css" ]
})

export class ContractCancelImageComponent {

    @Input()
    cancel: ContractCancel;

    isDragOver: boolean = false;

    isDropped: boolean = false;

    file: FormData;

    constructor(private activeModel: NgbActiveModal,
        private contractService: ContractCancelService) {
    }

    //User start drag an image
    dragging(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = true;
    }

    //When user release a image or is without changes
    notDragging(): void {
        this.isDragOver = false;
    }

    //When user drop an image
    dropping(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this.notDragging();
        this.isDropped = true;
        this.file = new FormData();
        this.file.append("image", event.dataTransfer.files[0]);
    }

    //Saving image in server
    save(fileInp: any): void {
        if (!this.file) {
            this.file = new FormData();
            this.file.append("image", fileInp.files[0]);
        }

      this.contractService.uploadImage(this.file, this.cancel.idContract).subscribe(x => {
            this.activeModel.close("ok");
        });
    }

    //Clicking file input
    open(fileInp: any) {
        fileInp.click();
        this.isDropped = true;

    }
}
