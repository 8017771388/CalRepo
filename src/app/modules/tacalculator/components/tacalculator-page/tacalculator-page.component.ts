import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tacalculator-page',
  templateUrl: './tacalculator-page.component.html',
  styleUrls: ['./tacalculator-page.component.scss']
})
export class TAcalculatorPageComponent implements OnInit {

  constructor() { }
  public toggleFlag: any = false;

  ngOnInit() {
  }
  toggleFunction(){
    this.toggleFlag = !this.toggleFlag;
  }
 
}
