import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommunicationService } from '../../services/communication.services';
//import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;
import pdfMake from 'pdfmake'
import { first } from 'rxjs-compat/operator/first';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-export-offer',
  templateUrl: './export-offer.component.html',
  styleUrls: ['./export-offer.component.scss']
})
export class ExportOfferComponent implements OnInit {

  @ViewChild('export') export:ElementRef;

  public title : any;
  public exportData : any;
  public inputData : any;
  public firstColumn : any;
  public secondColumn : any;
  public thirdColumn:any
  public today = new Date();
  public singleColumn : boolean = false;
  
  constructor(public bsModalRef: BsModalRef, private cs : CommunicationService) { }

  ngOnInit(): void {
    this.singleColumn = [this.firstColumn,this.secondColumn,this.thirdColumn].filter(el=>el==true).length == 1 ? true : false;
    console.log(this.singleColumn)
    
    this.cs.getOfferInputData().subscribe(data => {
      if(data != null){
        this.inputData = data;

        console.log(data)

      }
    })
  }

  dateFormat(date: Date) {
    const day = date && date.getDate() || -1;
    const dayWithZero = day.toString().length > 1 ? day : '0' + day;
    const month = date && date.getMonth() + 1 || -1;
    const monthWithZero = month.toString().length > 1 ? month : '0' + month;
    const year = date && date.getFullYear() || -1;

      return `${monthWithZero}/${dayWithZero}/${year}`;
  }

  exportPDF(){
    this.cs.displayLoader(true);    
      var fileName = this.inputData.Advisor_Team_Name +"-"+this.dateFormat(this.today)+'.pdf'
      var data = document.getElementById('export');  
      
       html2canvas(data, {scrollY: -window.scrollY, 
   scale: 1}).then(canvas => {    
         
        var imgWidth = 208;     
        var pageHeight = 295;      
        var imgHeight = canvas.height * imgWidth / canvas.width;    
        var heightLeft = imgHeight;    

        console.log(imgHeight)
      
        const contentDataURL = canvas.toDataURL('image/png')    
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF    
        var position = 0;    
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)    
    
        pdf.save(fileName); // Generated PDF     
            });     
       
       this.cs.clearLoader();
  }

}
