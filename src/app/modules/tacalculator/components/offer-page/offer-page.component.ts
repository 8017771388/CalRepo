import { Component, OnInit, ChangeDetectorRef, ViewChild, EventEmitter, Output, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommunicationService } from '../../../_shared/services/communication.services';
import { DxDataGridComponent, DxDataGridModule } from "devextreme-angular";
import { DxSelectBoxModule, DxCheckBoxModule } from 'devextreme-angular';
import { TAcalculatorService } from '../../services/tacalculator.service';
import { AssumptiontableService } from '../../../admin/services/assumptiontable/assumptiontable.service';
import { CurrencyPipe } from '@angular/common';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { OfferErrorModalComponent } from '../../../_shared/components/offer-error-modal/offer-error-modal.component';
import { ExportOfferComponent } from '../../../_shared/components/export-offer/export-offer.component';


@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss']
})
export class OfferPageComponent implements OnInit {

  @ViewChild("gridContainer")
  gridContainer: DxDataGridComponent;

  @ViewChild('exportContainer', { read: TemplateRef }) exportContainer:TemplateRef<any>
  @ViewChild('export') export: ElementRef;

  public affiliationModal = [];
  public noteTerm = [];
  public isButtonDisabled : any = false ;
  public isButtonDisabledFromOffer : any = true;
  public offerOutput = [];
  public exportOfferOutput = [];
  public models : any = [];
    public corpHosCheckboxCol1: boolean = false;
    public corpHosCheckboxCol2: boolean = false;
    public corpHosCheckboxCol3: boolean = false;
  public checkboxEnabled : boolean = false;
  public checkboxEnabled1 : boolean = false;
  public checkboxEnabled2 : boolean = false;
  public checkboxEnabled3 : boolean = false;
  public exportLinkEnabled : boolean = false;
  public blankOfferOutput = [];
  public modelSelectedC = [];
  public termSelctedC = [];
  public combinationError : boolean = false;
  public duplicateCombination : boolean = false;
  public defaultClick : boolean = true;
  public modelTermComboPL: any = [];
    public modelTermCombo: any = [];
    public noteTermObj: any = [];
  public modelObj = [{
    "name": "Corp HOS",
    "affiliationId": 1,
    "taBranchId": 1,
    "termId": 3,
    "modifyById": null,
    "lastModifyDate": "2021-09-07T16:14:00.12",
    "isActive": true,
    "createDate": "2021-09-07T16:14:00.12",
    "id": 1
  }];

  public noteObj = [{
    "name": "7 Years",
    "value": 7,
    "modifyById": null,
    "lastModifyDate": null,
    "isActive": true,
    "createDate": "2021-09-07T16:13:06.06",
    "id": 3
  }];


  constructor(public cs : CommunicationService, private cdr: ChangeDetectorRef, public taCS : TAcalculatorService, public as : AssumptiontableService, private currencyPipe: CurrencyPipe, private vref:ViewContainerRef, public modalService: BsModalService, public bsModalRef: BsModalRef, public modalServiceEM: BsModalService, public bsModalRefEM: BsModalRef) { 
    // this.cs.getInputformValid().subscribe(data => {  
    //   setTimeout(() => {
    //     this.isButtonDisabled = data;
    //   }, 10);             
      
    // })
    this.cs.getcalculatedOfferResponse().subscribe(outputData => {
      if(outputData != null){
        this.setOfferOutputObj(outputData);
      }
    })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();  
    
  }

  ngAfterViewInit() {
    
    this.cs.getInputformValid().subscribe(data => {  
      //setTimeout(() => {
        if(data != null){
          this.isButtonDisabled = data;
          this.cdr.detectChanges();
        }
             
        //this.isButtonDisabled = data;
      //}, 0);             
      
    })
        
  } 

  ngOnInit(): void {    

    this.cs.displayLoader(true);

    if(localStorage.getItem('offerOutput') == null){
      this.taCS.getOfferOutput().subscribe((res) => {
        if(res["isSuccesful"] == true){
          this.blankOfferOutput = res["data"]
          
          localStorage.setItem('offerOutput', JSON.stringify({timestamp : new Date(), data : this.blankOfferOutput}));

          this.setOfferObj();
          
        }
        else{
          this.cs.displayLoader(false);
        }
      }, err=> {
        this.cs.displayLoader(false)
      })
    } 
    else{
      var localData = JSON.parse(localStorage.getItem('offerOutput'));
      let ts = new Date(localData.timestamp);
      let today = new Date();
      //console.log((today.getTime() - ts.getTime()) / (1000 * 3600 * 24))
      if((today.getTime() - ts.getTime()) / (1000 * 3600 * 24) > 1){
        localStorage.removeItem('offerOutput');
        this.taCS.getOfferOutput().subscribe((res) => {
          if(res["isSuccesful"] == true){
            this.blankOfferOutput = res["data"]
            
            localStorage.setItem('offerOutput', JSON.stringify({timestamp : new Date(), data : this.blankOfferOutput}));
  
            this.setOfferObj();
            
          }
          else{
            this.cs.displayLoader(false);
          }
        }, err => {
          this.cs.displayLoader(false)
        })
      }
      else{
        this.blankOfferOutput = localData.data;
        this.setOfferObj();
      }

    }     

      
  }

  setOfferObj(){
    //console.log(this.blankOfferOutput)
    this.as.getModels().subscribe((model) =>{
     
      this.models = JSON.parse(JSON.stringify(model["data"]));
      
       
      this.offerOutput.push({
        rowName:"Offers to Export to PDF",
        value1:'',
        value2:"",
        value3:''
        
      });

      this.offerOutput.push({
        rowName:"Affiliation Model",
        value1:"",
        value2:"",
        value3:"",
        selected:false,
        dropdownObj1:JSON.parse(JSON.stringify(this.models)),
        dropdownObj2:JSON.parse(JSON.stringify(this.models)),
        dropdownObj3:JSON.parse(JSON.stringify(this.models)),
        
      });

      this.as.getTerms().subscribe(terms=> {
        if(terms['isSuccesful'] == true){
            var termObj = JSON.parse(JSON.stringify(terms["data"]));
            this.noteTermObj = JSON.parse(JSON.stringify(terms["data"]));
        
          this.offerOutput.push({
            rowName:"Note Term",
            value1:"",
            value2:"",
            value3:'',
            dropdownObj1:JSON.parse(JSON.stringify(termObj)),
            dropdownObj2:JSON.parse(JSON.stringify(termObj)),
            dropdownObj3:JSON.parse(JSON.stringify(termObj)),
          });

          this.offerOutput.push({
            rowName:"Metric",
            value1:'',
            value2:"",
            value3:''
            
          }); 

          this.blankOfferOutput.forEach(element => {
            element.value1 = "";
            element.value2 = "";
            element.value3 = "";
            this.offerOutput.push(element);
          });

          this.cs.displayLoader(false)
        }
        else{
          this.cs.displayLoader(false)
        }
        //console.log(this.offerOutput)

      }, err => {
        this.offerOutput.push({
          rowName:"Note Term",
          value1:"",
          value2:"",
          value3:"",
          dropdownObj1:JSON.parse(JSON.stringify(this.noteObj)),
          dropdownObj2:JSON.parse(JSON.stringify(this.noteObj)),
          dropdownObj3:JSON.parse(JSON.stringify(this.noteObj)),
        });
  
        this.offerOutput.push({
          rowName:"Metric",
          value1:'',
          value2:"",
          value3:"",
          
        }); 
  
        this.blankOfferOutput.forEach(element => {
          element.value1 = "";
          element.value2 = "";
          element.value3 = "";
          this.offerOutput.push(element);
        });
        this.cs.displayLoader(false)
      })         
      
     
      
    }, (err)=> {
       
      this.offerOutput.push({
        rowName:"Offers to Export to PDF",
        value1:'',
        value2:"",
        value3:''
        
      });

      this.offerOutput.push({
        rowName:"Affiliation Model",
        value1:"",
        value2:"",
        value3:"",
        selected:false,
        dropdownObj1:JSON.parse(JSON.stringify(this.modelObj)),
        dropdownObj2:JSON.parse(JSON.stringify(this.modelObj)),
        dropdownObj3:JSON.parse(JSON.stringify(this.modelObj)),
      });
      this.offerOutput.push({
        rowName:"Note Term",
        value1:"",
        value2:"",
        value3:"",
        dropdownObj1:JSON.parse(JSON.stringify(this.noteObj)),
        dropdownObj2:JSON.parse(JSON.stringify(this.noteObj)),
        dropdownObj3:JSON.parse(JSON.stringify(this.noteObj)),
      });

      this.offerOutput.push({
        rowName:"Metric",
        value1:'',
        value2:'',
        value3:''
        
      });  

      this.blankOfferOutput.forEach(element => {
        element.value1 = "";
        element.value2 = "";
        element.value3 = "";
        this.offerOutput.push(element);
      });
      this.cs.displayLoader(false);
    })
    
  }

  clearForm(){
    this.modelSelectedC = [];
    this.termSelctedC = [];
    this.affiliationModal = [];
    this.noteTerm=[];
    this.modelTermCombo = [];
   this.checkboxEnabled = false;
   this.checkboxEnabled1 = false;
   this.checkboxEnabled2 = false;
   this.checkboxEnabled3 = false;
    this.defaultClick = true;
      this.corpHosCheckboxCol1 = false;
      this.corpHosCheckboxCol2 = false;
    this.corpHosCheckboxCol3 = false;
    this.combinationError = false;
    this.duplicateCombination = false;
    this.exportLinkEnabled = false;

    this.offerOutput.forEach(ele => {
      //if(ele.rowName != 'Affiliation Model' && ele.rowName != 'Note Term'){
        ele.value1 =""
        ele.value2= ""
        ele.value3= ""
      //}
      if(ele.rowName == 'Affiliation Model'  || ele.rowName == 'Note Term'){
        ele.value1Error = false;
        ele.value2Error = false;
        ele.value3Error = false;
        ele.value1DupError = false;
        ele.value2DupError = false;
        ele.value3DupError = false;
      }
    })

    this.cs.setOfferClearButton(true);
  }

  calculate(){
    this.checkboxEnabled = true;
    var termName; 
    let duplicateArray = [];
    this.modelSelectedC = [];
    this.termSelctedC = [];
    this.affiliationModal = [];
    this.noteTerm=[];
    this.modelTermCombo = [];
   this.defaultClick = false;
    let msc = [];
    let tsc = [];  

    let modelSelected = [];
    let termSelcted = [];   

     // Combination Error
    
     this.offerOutput.forEach(element => {
       if(element.rowName == 'Affiliation Model'){
          element.value1 != '' ? modelSelected.push('value1'):'';
          element.value2 != '' ? modelSelected.push('value2'):'';
          element.value3 != '' ? modelSelected.push('value3'):'';
         
       }
       if(element.rowName == 'Note Term'){
          element.value1 != '' ? termSelcted.push('value1'):'';
          element.value2 != '' ? termSelcted.push('value2'):'';
          element.value3 != '' ? termSelcted.push('value3'):'';
      }
     });  
   

     modelSelected.forEach((ele,index) => {
      
      //let prop = Object.keys(ele)[0];
      if(termSelcted.includes(ele) == false){
         tsc.push(ele);         
      }
    })

    termSelcted.forEach((ele,index) => {
      
      if(modelSelected.includes(ele) == false){
         msc.push(ele);         
      }
    })
    this.offerOutput.forEach(o => {
      if(o.rowName == "Affiliation Model"){
        let ev1 = false;
        let ev2 = false;
        let ev3= false
        msc.forEach(ev=>{
          if(ev == 'value1'){
            ev1 = true;
          }
          if(ev == 'value2'){
            ev2 = true;
          }
          if(ev == 'value3'){
            ev3 = true;
          }
        })

        o.value1Error = ev1;
        o.value2Error = ev2;
        o.value3Error = ev3;
      }
      if(o.rowName == "Note Term"){
        let ev1 = false;
        let ev2 = false;
        let ev3= false
        tsc.forEach(ev=>{
          if(ev == 'value1'){
            ev1 = true;
          }
          if(ev == 'value2'){
            ev2 = true;
          }
          if(ev == 'value3'){
            ev3 = true;
          }
        })

        o.value1Error = ev1;
        o.value2Error = ev2;
        o.value3Error = ev3;
      }
    });
    
     this.combinationError = modelSelected.some(ele => (termSelcted.includes(ele)==false)) || termSelcted.some(ele => (modelSelected.includes(ele)==false));
     
     if(modelSelected.length > 0 || termSelcted.length > 0){
       this.isButtonDisabledFromOffer = this.combinationError
     }

     // Combination Error End

     // Duplicate Error

     this.offerOutput.forEach(element => {
      if(element.rowName == 'Affiliation Model'){

         element.value1 != '' ? this.modelSelectedC.push({'value1' : element.value1}):'';
         element.value2 != '' ? this.modelSelectedC.push({'value2' : element.value2}):'';
         element.value3 != '' ? this.modelSelectedC.push({'value3' : element.value3}):'';
        
      }
      if(element.rowName == 'Note Term'){
         element.value1 != '' ? this.termSelctedC.push({'value1' : element.value1}):'';
         element.value2 != '' ? this.termSelctedC.push({'value2' : element.value2}):'';  
         element.value3 != '' ? this.termSelctedC.push({'value3' : element.value3}):'';        
     }
    })

     this.modelSelectedC.forEach((ele,index) => {
      
       let prop = Object.keys(ele)[0];
       if(this.termSelctedC.find(e => e[prop]) != undefined){
          let combo = {'modelId' : ele[prop], 'termId':'', 'index':parseInt(prop.split("")[prop.length-1])
        }
          this.affiliationModal.push(ele[prop]);
          this.modelTermCombo.push(combo);
       }
     })
     
     this.termSelctedC.forEach((ele,index) => {
      let prop = Object.keys(ele)[0];
      if(this.modelSelectedC.find(e => e[prop]) != undefined){
          this.noteTerm.push(ele[prop]);
          this.modelTermCombo.forEach(mt => {
            if(mt.index == parseInt(prop.split("")[prop.length-1])){
              mt.termId = ele[prop]
            }
          });
      }
    });

    this.modelTermCombo.filter((item, pos) => {
      this.modelTermCombo.forEach((e,i)=> {
        if(pos != i && item.modelId == e.modelId && item.termId == e.termId){
          duplicateArray.push(e)
        }
      });
    })

    
    this.duplicateCombination = duplicateArray.length > 0 ? true : false;
             
     this.offerOutput.forEach(o => {
        if(o.rowName == "Affiliation Model"){
          let ev1 = false;
          let ev2 = false;
          let ev3= false
          duplicateArray.forEach(ev=>{            
              if(ev.index == 1){
                ev1 = true;
              }
              if(ev.index == 2){
                  ev2 = true;
              }
              if(ev.index == 3){
                ev3 = true;
              }            
            
          });
  
          o.value1DupError = ev1;
          o.value2DupError = ev2;
          o.value3DupError = ev3;
        }
        if(o.rowName == "Note Term"){
          let ev1 = false;
          let ev2 = false;
          let ev3= false
          duplicateArray.forEach(ev=>{
            
              if(ev.index == 1){
                ev1 = true;
              }
              if(ev.index == 2){
                  ev2 = true;
              }
              if(ev.index == 3){
                ev3 = true;
              }
            
            
          });
          o.value1DupError = ev1;
          o.value2DupError = ev2;
          o.value3DupError = ev3;
        }
      });
    
      // Duplicate Error End
      
      var inputCalculated={
        calculateOfferButton : true,
        affModal: this.affiliationModal,
        noteTerm : this.noteTerm,
        noteTermName : termName
      }
    
    if(!this.duplicateCombination && !this.combinationError){
      this.isButtonDisabledFromOffer = false;
      this.modelTermComboPL = JSON.parse(JSON.stringify(this.modelTermCombo));
      //this.cs.setModelTermComboPL(this.modelTermComboPL);
      this.cs.setOfferCalculateButton(inputCalculated);
      this.cs.setModelTermComboPL(this.modelTermComboPL);
    }
    else{

      this.isButtonDisabledFromOffer = true;
      if(this.duplicateCombination == true && this.combinationError == true){
        let initialState = {
          title: "Errors",
          combinationTxt: "Please choose an Affiliation Model and a Note Term",
          duplicateTxt: "You have already selected this Affiliation Model and Note Term"
        };

        this.bsModalRef = this.modalService.show(OfferErrorModalComponent, {
            initialState,
            backdrop: "static",
            class: "modal-xl modal-overley-top",
        });
      }
    }
  }

  dropdownValueChanged(event, data){
    
    let modelSelected = [];
    let termSelcted = [];
    let modelSelectedC = [];
    let termSelctedC = [];
    let msc = [];
    let tsc = [];  
    let duplicateArray = [];
    let mtCombo = [];  
    
     this.offerOutput.forEach(element => {
       if(element.rowName == 'Affiliation Model'){
          element.value1 != '' ? modelSelected.push('value1'):'';
          element.value2 != '' ? modelSelected.push('value2'):'';
          element.value3 != '' ? modelSelected.push('value3'):'';
         
       }
       if(element.rowName == 'Note Term'){
          element.value1 != '' ? termSelcted.push('value1'):'';
          element.value2 != '' ? termSelcted.push('value2'):'';
          element.value3 != '' ? termSelcted.push('value3'):'';
      }
     });

     modelSelected.forEach((ele,index) => {
      
      //let prop = Object.keys(ele)[0];
      if(termSelcted.includes(ele) == false){
         tsc.push(ele);         
      }
    })

    termSelcted.forEach((ele,index) => {
      
      if(modelSelected.includes(ele) == false){
         msc.push(ele);         
      }
    })
     
    if(this.defaultClick == true){
      let ce = modelSelected.some(ele => (termSelcted.includes(ele)==true)) && termSelcted.some(ele => (modelSelected.includes(ele)==true));
       
      if(modelSelected.length > 0 || termSelcted.length > 0){
        this.isButtonDisabledFromOffer = !ce
      }
    }
    else{
      let combErrorAM = '';
      let combErrorNT = '';
      let dupErrorAM = '';
      let dupErrorNT = '';
      let ce = '';
      let de= '';

      //Combination Error
      this.offerOutput.forEach(o => {
        if(o.rowName == "Affiliation Model"){
          
          let ev1 = false;
          let ev2 = false;
          let ev3 = false;
          
          msc.forEach(ev=>{
            if(ev == 'value1'){
              ev1 = true;
            }
            if(ev == 'value2'){
              ev2 = true;
            }
            if(ev == 'value3'){
              ev3 = true;
            }
          })
          if(o.value1Error == true && ev1 == false){
            o.value1Error = ev1;
          }
          if(o.value2Error == true && ev2 == false){
            o.value2Error = ev2;
          }
          if(o.value3Error == true && ev3 == false){
            o.value3Error = ev3;
          }
          
          if(o.value1Error == false && o.value2Error == false && o.value3Error == false){
            combErrorAM = 'false'
          }
        }
        if(o.rowName == "Note Term"){
          let ev1 = false;
          let ev2 = false;
          let ev3= false
          tsc.forEach(ev=>{
            if(ev == 'value1'){
              ev1 = true;
            }
            if(ev == 'value2'){
              ev2 = true;
            }
            if(ev == 'value3'){
              ev3 = true;
            }
          })
  
          if(o.value1Error == true && ev1 == false){
            o.value1Error = ev1;
            
          }
          if(o.value2Error == true && ev2 == false){
            o.value2Error = ev2;
          }
          if(o.value3Error == true && ev3 == false){
            o.value3Error = ev3;
          }
          if(o.value1Error == false && o.value2Error == false && o.value3Error == false){
            combErrorNT = 'false'
          }
        }
      });

       // Combination  Error End

       // Duplicate Error

     this.offerOutput.forEach(element => {
      if(element.rowName == 'Affiliation Model'){

         element.value1 != '' && element.value1DupError == true ? modelSelectedC.push({'value1' : element.value1}):'';
         element.value2 != '' && element.value2DupError == true ? modelSelectedC.push({'value2' : element.value2}):'';
         element.value3 != '' && element.value3DupError == true ? modelSelectedC.push({'value3' : element.value3}):'';
        
      }
      if(element.rowName == 'Note Term'){
         element.value1 != '' && element.value1DupError == true? termSelctedC.push({'value1' : element.value1}):'';
         element.value2 != '' && element.value2DupError == true ? termSelctedC.push({'value2' : element.value2}):'';  
         element.value3 != '' && element.value3DupError == true ? termSelctedC.push({'value3' : element.value3}):'';        
     }
    })

     modelSelectedC.forEach((ele,index) => {
      
       let prop = Object.keys(ele)[0];
       if(termSelctedC.find(e => e[prop]) != undefined){
          let combo = {'modelId' : ele[prop], 'termId':'', 'index':parseInt(prop.split("")[prop.length-1])
        }
        mtCombo.push(combo);
       }
     })
     
    termSelctedC.forEach((ele,index) => {
      let prop = Object.keys(ele)[0];
      if(modelSelectedC.find(e => e[prop]) != undefined){
          
        mtCombo.forEach(mt => {
            if(mt.index == parseInt(prop.split("")[prop.length-1])){
              mt.termId = ele[prop]
            }
          });
      }
    });

    mtCombo.filter((item, pos) => {
      mtCombo.forEach((e,i)=> {
        if(pos != i && item.modelId == e.modelId && item.termId == e.termId){
          duplicateArray.push(e)
        }
      });
    })

    
      this.offerOutput.forEach(o => {
        if(o.rowName == "Affiliation Model"){
          let ev1 = false;
          let ev2 = false;
          let ev3= false
          duplicateArray.forEach(ev=>{            
              if(ev.index == 1){
                ev1 = true;
              }
              if(ev.index == 2){
                  ev2 = true;
              }
              if(ev.index == 3){
                ev3 = true;
              }            
            
          });

          if(o.value1DupError == true && ev1 == false){
            o.value1DupError = ev1;
          }
          if(o.value2DupError == true && ev2 == false){
            o.value2DupError = ev2;
          }
          if(o.value3DupError == true && ev3 == false){
            o.value3DupError = ev3;
          }

          if(o.value1DupError == false && o.value2DupError == false && o.value3DupError == false){
            dupErrorAM = 'false'
          }
  
          // o.value1DupError = ev1;
          // o.value2DupError = ev2;
          // o.value3DupError = ev3;
        }
        if(o.rowName == "Note Term"){
          let ev1 = false;
          let ev2 = false;
          let ev3= false
          duplicateArray.forEach(ev=>{
            
              if(ev.index == 1){
                ev1 = true;
              }
              if(ev.index == 2){
                  ev2 = true;
              }
              if(ev.index == 3){
                ev3 = true;
              }
            
            
          });
          if(o.value1DupError == true && ev1 == false){
            o.value1DupError = ev1;
          }
          if(o.value2DupError == true && ev2 == false){
            o.value2DupError = ev2;
          }
          if(o.value3DupError == true && ev3 == false){
            o.value3DupError = ev3;
          }
          // o.value1DupError = ev1;
          // o.value2DupError = ev2;
          // o.value3DupError = ev3;
          if(o.value1DupError == false && o.value2DupError == false && o.value3DupError == false){
            dupErrorNT = 'false'
          }
        }
      });
      if(combErrorAM == 'false' && combErrorNT == 'false'){
        ce = 'false';
      }
      if(dupErrorAM == 'false' && dupErrorNT == 'false'){
        de = 'false';
      } 

      this.isButtonDisabledFromOffer = (ce == 'false' && de == 'false') ? false : true;
      if(ce == 'false' && de == 'false'){
        this.combinationError = false;
        this.duplicateCombination = false;
      }
    }    
        
  }

  checkboxValueChanged(event, data){
    console.log(event);
    console.log(data);
    if(this.corpHosCheckboxCol1 || this.corpHosCheckboxCol2 || this.corpHosCheckboxCol3){
      this.exportLinkEnabled = true
    }
    else{
      this.exportLinkEnabled = false;
    }
  }

  setOfferOutputObj(outputData){
    
    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];
          
    outputData.forEach(co => {
      this.modelTermCombo.forEach((mtc,index) => {
        if(co.modelId == mtc.modelId && co.termId == mtc.termId){
          if(mtc.index == 1 ){
            firstColumn.push(co);
          }
          else if(mtc.index == 2 ){
            secondColumn.push(co);
          }
          else if(mtc.index == 3 ){
            thirdColumn.push(co);
          }
        }
      });
      
    }) 

      // console.log('firstColumn', firstColumn);
      // console.log('secondColumn', secondColumn);
      // console.log('thirdColumn', thirdColumn);
      var noteTerm = this.noteTermObj;
      if (firstColumn.length > 0) {
          this.checkboxEnabled1 = true;
          var selectedTerm1 = null;
      this.offerOutput.forEach(emptyOutput => {
      
        firstColumn.forEach(calOutput => {
          if(emptyOutput.rowName == 'Metric'){
            this.models.forEach(model => {
                if(model.id == calOutput.modelId){
                  emptyOutput.value1 = model.name;
                }
            });
              selectedTerm1 = noteTerm.filter(term => term.id == calOutput.termId);
              console.log('noteTerm', selectedTerm1);
              console.log('noteTerm Name', selectedTerm1[0].name);
              emptyOutput.value1 = emptyOutput.value1 + ' ' + selectedTerm1[0].name
          }
            
            console.log('calOutput.termId', calOutput.termId);
          if(emptyOutput.rowName == calOutput.rowName){
            emptyOutput.value1 = calOutput.offerOutputValue;
            if (calOutput.offerDataType.toLowerCase() == 'bps') {
                
              emptyOutput.value1 = emptyOutput.value1 != null ? emptyOutput.value1.toFixed(1) + 'bps' : emptyOutput.value1;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'percent') {
                
                emptyOutput.value1 = emptyOutput.value1 != null ? (emptyOutput.value1*100).toFixed(1) + '%' : emptyOutput.value1;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'months') {
                  
                emptyOutput.value1 = emptyOutput.value1 != null ? emptyOutput.value1 + 'months' : emptyOutput.value1;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'dollars') {
                emptyOutput.value1 = emptyOutput.value1 != null ? this.currencyPipe.transform(emptyOutput.value1, 'USD', '$', '1.0-0') : emptyOutput.value1;
            }
          }
        });
      })
    } 
    
      if (secondColumn.length > 0) {
        this.checkboxEnabled2 = true;
          var selectedTerm2 = null;
      this.offerOutput.forEach(emptyOutput => {
      
        secondColumn.forEach(calOutput => {
          if(emptyOutput.rowName == 'Metric'){
            this.models.forEach(model => {
                if(model.id == calOutput.modelId){
                  emptyOutput.value2 = model.name;
                }
            });
              selectedTerm2 = noteTerm.filter(term => term.id == calOutput.termId);
              emptyOutput.value2 = emptyOutput.value2 + ' ' + selectedTerm2[0].name
            }
          if(emptyOutput.rowName == calOutput.rowName){
            emptyOutput.value2 = calOutput.offerOutputValue;
            if (calOutput.offerDataType.toLowerCase() == 'bps') {
                
              emptyOutput.value2 = emptyOutput.value2 != null ? emptyOutput.value2.toFixed(1) + 'bps' : emptyOutput.value2;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'percent') {
                
                emptyOutput.value2 = emptyOutput.value2 != null ? (emptyOutput.value2*100).toFixed(1) + '%' : emptyOutput.value2;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'months') {
                  
                emptyOutput.value2 = emptyOutput.value2 != null ? emptyOutput.value2 + 'months' : emptyOutput.value2;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'dollars') {
                emptyOutput.value2 = emptyOutput.value2 != null ? this.currencyPipe.transform(emptyOutput.value2, 'USD', '$', '1.0-0') : emptyOutput.value2;
            }
          }
        });
      })
    } 

      if (thirdColumn.length > 0) {
        this.checkboxEnabled3 = true;
          var selectedTerm3 = null;
      this.offerOutput.forEach(emptyOutput => {
      
        thirdColumn.forEach(calOutput => {
          if(emptyOutput.rowName == 'Metric'){
            this.models.forEach(model => {
                if(model.id == calOutput.modelId){
                  emptyOutput.value3 = model.name;
                }
            });
              selectedTerm3 = noteTerm.filter(term => term.id == calOutput.termId);
              emptyOutput.value3 = emptyOutput.value3 + ' ' + selectedTerm3[0].name
            }
          if(emptyOutput.rowName == calOutput.rowName){
            emptyOutput.value3 = calOutput.offerOutputValue;
            if (calOutput.offerDataType.toLowerCase() == 'bps') {
                
              emptyOutput.value3 = emptyOutput.value3 != null ? emptyOutput.value3.toFixed(1) + 'bps' : emptyOutput.value3;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'percent') {
                
                emptyOutput.value3 = emptyOutput.value3 != null ? (emptyOutput.value3*100).toFixed(1) + '%' : emptyOutput.value3;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'months') {
                  
                emptyOutput.value3 = emptyOutput.value3 != null ? emptyOutput.value3 + 'months' : emptyOutput.value3;
            }
              else if (calOutput.offerDataType.toLowerCase() == 'dollars') {
                emptyOutput.value3 = emptyOutput.value3 != null ? this.currencyPipe.transform(emptyOutput.value3, 'USD', '$', '1.0-0') : emptyOutput.value3;
            }
          }
        });
      })
    }
    
  }

  openExportModal(){
    this.exportOfferOutput=[];
    console.log(this.offerOutput);
    if(this.exportLinkEnabled){

       
      if(this.exportOfferOutput.length <= 0){
        let affModal = {
          rowName: "Affiliation Model"
        }
        let nTerm = {
          rowName: "Note Term"
        }
        let mt = {
          rowName: "Metric"
        }
        this.exportOfferOutput.push(affModal);
        this.exportOfferOutput.push(nTerm);
        this.exportOfferOutput.push(mt);
        this.blankOfferOutput.forEach(blankOutput =>{
          let row = {
            rowName : blankOutput.rowName
          }
          this.exportOfferOutput.push(row);
        });
      }
    

      if(this.corpHosCheckboxCol1){
        let amV;
        let ntV;
        this.offerOutput.forEach(offer => {
          this.exportOfferOutput.forEach(exportOffer => {
            if(exportOffer.rowName == offer.rowName && exportOffer.rowName == 'Affiliation Model'){
              offer.dropdownObj1.forEach(dd => {
                if(dd.id == offer.value1){
                  amV = dd.name
                }
              });
              exportOffer.value1 = amV
              
            }
            else if(exportOffer.rowName == offer.rowName && exportOffer.rowName == 'Note Term'){
              offer.dropdownObj1.forEach(dd => {
                if(dd.id == offer.value1){
                  ntV = dd.name
                }
              });
              exportOffer.value1 = ntV
              
            }
            else if(exportOffer.rowName == offer.rowName && exportOffer.rowName != 'Note Term' && exportOffer.rowName != 'Affiliation Model'){
              exportOffer.value1 = offer.value1;
            }
          })
          
        })
      }
      if(this.corpHosCheckboxCol2){
        let amV;
        let ntV;
        this.offerOutput.forEach(offer => {
          this.exportOfferOutput.forEach(exportOffer => {
            if(exportOffer.rowName == offer.rowName && exportOffer.rowName == 'Affiliation Model'){
              offer.dropdownObj2.forEach(dd => {
                if(dd.id == offer.value2){
                  amV = dd.name
                }
              });
              exportOffer.value2 = amV
              
            }
            else if(exportOffer.rowName == offer.rowName && exportOffer.rowName == 'Note Term'){
              offer.dropdownObj2.forEach(dd => {
                if(dd.id == offer.value2){
                  ntV = dd.name
                }
              });
              exportOffer.value2 = ntV
              
            }
            else if(exportOffer.rowName == offer.rowName && exportOffer.rowName != 'Note Term' && exportOffer.rowName != 'Affiliation Model'){
              exportOffer.value2 = offer.value2;
            }
          })
          
        })
      }
      if(this.corpHosCheckboxCol3){
        let amV;
        let ntV;
        this.offerOutput.forEach(offer => {
          this.exportOfferOutput.forEach(exportOffer => {
            if(exportOffer.rowName == offer.rowName && exportOffer.rowName == 'Affiliation Model'){
              offer.dropdownObj3.forEach(dd => {
                if(dd.id == offer.value3){
                  amV = dd.name
                }
              });
              exportOffer.value3 = amV
              
            }
            else if(exportOffer.rowName == offer.rowName && exportOffer.rowName == 'Note Term'){
              offer.dropdownObj3.forEach(dd => {
                if(dd.id == offer.value3){
                  ntV = dd.name
                }
              });
              exportOffer.value3 = ntV
              
            }
            else if(exportOffer.rowName == offer.rowName && exportOffer.rowName != 'Note Term' && exportOffer.rowName != 'Affiliation Model'){
              exportOffer.value3 = offer.value2;
            }
          })
          
        })
      }
      let initialState = {
        title: "Offers",
        exportData: this.exportOfferOutput,
        firstColumn : this.corpHosCheckboxCol1,
        secondColumn : this.corpHosCheckboxCol2,
        thirdColumn :this.corpHosCheckboxCol3
      };

      this.bsModalRefEM = this.modalServiceEM.show(ExportOfferComponent, {
          initialState,
          backdrop: "static",
          class: "modalXl modal-overley-top",
      });
    }
    //console.log(this.exportOfferOutput);
  }  

}
