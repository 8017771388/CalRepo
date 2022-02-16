import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-npv-modal',
  templateUrl: './npv-modal.component.html',
  styleUrls: ['./npv-modal.component.scss']
})
export class NpvModalComponent implements OnInit {
public offerData:any;
public openFrom : any;
  constructor( public modalService: BsModalService, public bsModalRef: BsModalRef, public bsModalRefCM: BsModalRef, public modalServiceCM: BsModalService) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRefCM.hide();
    this.bsModalRef.hide();
       
    }
   
}

