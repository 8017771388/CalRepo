import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-offer-error-modal',
  templateUrl: './offer-error-modal.component.html',
  styleUrls: ['./offer-error-modal.component.scss']
})
export class OfferErrorModalComponent implements OnInit {

  public title : any;
  public combinationTxt : string;
  public duplicateTxt : string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
