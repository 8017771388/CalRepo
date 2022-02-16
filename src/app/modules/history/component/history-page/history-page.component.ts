
import { Component, Renderer2, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';

import { HistoryService } from '../../services/history.service'
import { DxDataGridComponent, DxDateBoxModule, DxSelectBoxModule } from "devextreme-angular";
import { CommunicationService } from '../../../_shared/services/communication.services';
import { UserInfo } from "../../../_shared/services/userInfo.service";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { HistoryOfferComponent } from '../../../_shared/components/history-offer/history-offer.component';
import CustomStore from 'devextreme/data/custom_store';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import AutoNumeric = require('autonumeric');
import { FormsModule, NgForm } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { filter } from 'rxjs-compat/operator/filter';
import { all } from 'q';



@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',

  styleUrls: ['./history-page.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: false } }]

})
export class HistoryPageComponent implements OnInit {
    @ViewChild("gridContainer")
    gridContainer: DxDataGridComponent;

    //@ViewChild("dropdownList") dropdown: ElementRef;
    @ViewChild('dropdownList', { static: false }) dropdown: ElementRef;
    //@ViewChild('mainDropdown', { static: false }) mainDropdown: ElementRef;
    @ViewChild('ddButton', { static: false }) ddBtn: ElementRef;
   
    public historyData: any=[];
    public dataSource: any={};
    public pageSize: any = 25;
    public pageNumber: any = 1;
    public totalCount: any;
    public filteredCount: any;
    public allowedPages = []; 
    public showGrid : boolean = true;
    public filterItem: any = [
        {name:'VAUM'},
        {name:'Created By'},
        {name: 'Prior Firm Type'},
        {name:'Created Date'},
    ];
    public isFlag: any= false;
    public filters = [];
    public vaumMin: any = "";
    public vaumMax: any= "";
    public maxError: boolean = false;
    public createdDateError : boolean = false;
    public filterVaum = [this.vaumMin, this.vaumMax];
    public vaumFilterExp: any;
    public createdByList : any = [];
    public selectedCreatedByList : any = [];
    public priorFirmTypeList : any = [];
    public selectedPriorFirmTypeList : any = [];
    public notSelected : boolean = false;
    public fromDate:any;
    public toDate : any;

    constructor(
        private historyService: HistoryService, private cs: CommunicationService, private userService: UserInfo, public modalService: BsModalService, public bsModalRef: BsModalRef, public cdr : ChangeDetectorRef, public renderer : Renderer2
    ) { }
   
    ngOnInit(): void {
        this.totalCount = 0;
        let param = {
            username: this.userService.getUserName(),
            isAdmin: ((this.userService.getUserRole()=='Admin')?true:false),
        }
        this.historyService.getCreatedByList(param).subscribe(res=> {
            if(res["isSuccesful"] == true){
                this.createdByList = res["data"];
            }

        })
        this.initializeGrid();
        //this.getHistoryOffers(this.pageNumber,this.pageSize);
               
    }
    filterBlock(field){
        this.isFlag =true;
        if(this.filters.filter(ele => ele == field).length <= 0){
            //field.isDisabled = false;
            field['showFilterBox']=true;
            this.filters.push(field);
            // if(field.name == 'VAUM'){
            //     field['min'] = ''
            //     field['max'] = ''
            //     this.filters.push(field);
            // }
            this.renderer.removeClass(this.dropdown.nativeElement, 'show'); 
        }
        else{
            //field.isDisabled = true;
        }
        
        
    }

    formatValue(field){
        this.vaumMin = field == 'vaumMin' ? Number(this.vaumMin).toFixed(2) : this.vaumMin;
        this.vaumMax = field == 'vaumMax' ? Number(this.vaumMax).toFixed(2) : this.vaumMax;
        // if(field == 'vaumMin' || field == 'vaumMax'){
        //     this.vaumMin =Number(this.vaumMin).toFixed(2)
        // }
    }

    valueChanged(event, field){
        
        if(field == 'vaumMin' || field == 'vaumMax'){
            if(Number(event.value) > 999999999.99){
                event.preventDefault();
            }
        }
        //this.vaumMin = Number(event).toFixed(2);
    }
    
    // getHistoryOffers(pgNumber, pgSize){
        
    //     var param = {
    //         username: this.userService.getUserName(),
    //         isAdmin: ((this.userService.getUserRole()=='Admin')?true:false),
    //         pageSize: pgSize,
    //         pageNumber: pgNumber

    //     }
    //     this.cs.displayLoader(true);
    //     this.historyService.getOffersHistory(param).subscribe(data => {
    //         this.cs.clearLoader();
    //         if (data && data["isSuccesful"]) {
    //             this.historyData = data["data"];                
    //             this.totalCount = data["data"].length > 0 ? data["data"][0]["totalCount"] : 0;
    //             this.historyData["totalCount"] = this.totalCount;
    //         }
    //     }), ((err) => {
    //         this.cs.clearLoader();
    //         console.log("cannot load tables: ", err);});
    // }

    initializeGrid() {
        //this.headerFilterData();
        this.dataSource.store = new CustomStore({
            key: "id",
            load: (loadOptions: any) => {
                console.log(loadOptions)
                let param = this.generateParameter(loadOptions);
                return new Promise((resolve) => {
                    this.historyService.getOffersHistory(param).subscribe((result) => {
                        if (result && result["isSuccesful"]) {
                            //var result = this.homeService.getMatchingDealsData("");
                            let data = result["data"];
                            this.setupPriorFirmTypeFilter(data);
                            // this.totalCount = result["data"].totalCount;
                            //this.totalCount = 27;
                            this.totalCount = data.length > 0 ? data[0]["totalCount"] : 0;
                            
                            //console.log(this.totalCount)  
                            this.historyData = data;  
                            
                            if(this.totalCount > 25 && this.totalCount <= 50){
                                this.allowedPages = [25,50]
                            } 
                            else if(this.totalCount > 50 && this.totalCount <= 75){
                                this.allowedPages = [25,50,75]
                            } 
                            else if(this.totalCount > 75 && this.totalCount <= 100){
                                this.allowedPages = [25,50,75]
                            }
                            else if(this.totalCount > 100){
                                this.allowedPages = [25,50,75,100,'All'];
                            }                     
                            resolve({
                                data: data,
                                totalCount:this.totalCount
                                //totalCount: data["totalCount"],
                            });
                        } else {
                            console.log("error");
                        }
                    });
                });
            },

            update : (values) => {
                console.log(values)
                
                return new Promise((resolve)=> {
                    resolve({
                        data: values,
                        totalCount:this.totalCount
                        
                    });
                    
                })
                
            }

            
        });
    }

    generateParameter(loadOptions) {
        // let orderByColumns = [];
        // let parameters = { orderby: "", sortOrder: 0 };
        // if (loadOptions.sort) {
        //     parameters.orderby = loadOptions.sort[0].selector;
        //     parameters.sortOrder = loadOptions.sort[0].desc ? 1 : 0;
        //     orderByColumns.push({
        //         ColumnName: parameters.orderby,
        //         SortOrder: parameters.sortOrder,
        //         Sequence: 1,
        //     });
        // }

        let param = {
            username: this.userService.getUserName(),
            isAdmin: ((this.userService.getUserRole()=='Admin')?true:false),
            pageSize: this.pageSize,
            pageNumber: this.getPageNumber(loadOptions)
            // CurrentViewIdentifier: 0,
            // CurrentPageNumber: this.getPageNumber(loadOptions),
            // PageSize: 15,
            // OrderByColumns: orderByColumns,
            // GridDataFilter: this.transformFilterData(loadOptions),
            // searchString: this.searchText,
        };

        return param;
    }

    getPageNumber(loadOptions) {
        let pageNumber =
            loadOptions.skip === 0
                ? 1
                : (loadOptions.skip + loadOptions.take) / loadOptions.take;
        if (isNaN(pageNumber)) pageNumber = 1;
        
        return pageNumber;
    }

  onRowClick(e){
      console.log(e)

      let initialState = {
        title: "Offers",
        offerId: e.id
      };

      this.bsModalRef = this.modalService.show(HistoryOfferComponent, {
          initialState,
          backdrop: "static",
          class: "modalXl modal-overley-top",
      });
  }

  checkPageSize(e){
     // console.log(e)
      if(e.fullName == 'paging.pageSize'){
          if(isNaN(e.value) == false){
            this.pageSize = e.value;
            this.gridContainer.instance.refresh();
          }
          else{
              this.pageSize = 0;
              e.component.pageSize(0); 
              e.element.find(".dx-page-size:last-child").addClass("dx-selection");
              this.gridContainer.instance.refresh();
          }
      }
  }

//   filterData(){
//       console.log(this.gridContainer.instance.getDataSource())
      
//       const dataSource = this.gridContainer.instance.getDataSource();
          
//         dataSource.filter([
//             [ "vaum", ">", 3 ],
//             "or",
//             [ "vaum", "<", 413 ]
//         ]);
      
//           dataSource.load()
//   }

  applyFilter(filter){
      let filteredData = [];
      this.filters.forEach(ele => {
          if(ele.name == filter.name){
              ele.isDisabled = true;
          }
      })
    const dataSource = this.gridContainer.instance.getDataSource();
    
    this.maxError = false;
    this.notSelected = false;
    this.createdDateError = false;
    
    if(filter.name == 'VAUM'){
        if(this.vaumMax != "" && Number(this.vaumMin) >= Number(this.vaumMax)){
            this.maxError = true;
        }
        else{
            
            if(this.vaumMin != "" && this.vaumMax != ""){
                filter.filterApplied = [['vaum', '>=', Number(this.vaumMin)], 'and' , ['vaum', '<=', Number(this.vaumMax)]];
                // dataSource.filter([['vaum', '>', Number(this.vaumMin)], 'and' , ['vaum', '<', Number(this.vaumMax)]]);
                filter.filterExp = "$"+this.vaumMin +" " +"-"+ " "+ "$"+this.vaumMax;
            }
            else if(this.vaumMin != ""){
                filter.filterApplied = ['vaum', '>=', Number(this.vaumMin)]
                // dataSource.filter(['vaum', '>', Number(this.vaumMin)]);
                filter.filterExp = ">="+"$"+this.vaumMin 
            }
            else if(this.vaumMax != ""){
                filter.filterApplied = ['vaum', '<=', Number(this.vaumMax)]
                // dataSource.filter(['vaum', '<', Number(this.vaumMax)]);
                filter.filterExp= "<="+"$"+this.vaumMax
            }
            
            //dataSource.load();
            filter.showFilterBox = false;
            
        } 
    }
    if(filter.name == 'Created By'){
        if(this.selectedCreatedByList.length <= 0){
            this.notSelected = true
        }
        else{
            let filterArr = [];
            let arrayFilter = [];
            let filterSelected = [];
            this.selectedCreatedByList.forEach(element => {
                arrayFilter.push(element.createdBy);
                filterSelected.push(element.createdBy)
            });
            if( arrayFilter.length > 1){
                arrayFilter = arrayFilter.join("/or/").split("/");
            }
            console.log(arrayFilter)
            arrayFilter.forEach(element => {
                if(element != 'or'){
                    var el = ['createdBy','=',element]
                    filterArr.push(el)
                }
                else{
                    filterArr.push(element);
                }
                
                
            });
            
            filter.filterExp = filterSelected.length + " " + 'Selected';
            filter.filterApplied = [filterArr];
            
            filter.showFilterBox = false;
            console.log(filterArr)
        }
        
    }
    if(filter.name == 'Created Date'){
        console.log(this.fromDate)
        console.log(this.toDate)
        
        if(this.fromDate != undefined && this.toDate != undefined){
            if(new Date(this.fromDate) > new Date(this.toDate)){
                this.createdDateError = true;
            }
            else{
                //this.createdDateError = false
                filter.filterApplied = [['createDate', '>=',this.fromDate], 'and' , ['createDate', '<=', this.toDate]];
                // dataSource.filter([['vaum', '>', Number(this.vaumMin)], 'and' , ['vaum', '<', Number(this.vaumMax)]]);
                filter.filterExp = new Date(this.fromDate).toLocaleDateString() +" " +"-"+ " "+ new Date(this.toDate).toLocaleDateString();
                filter.showFilterBox = false;
            }
            
        }
        else if(this.fromDate != undefined){
            filter.filterApplied = ['createDate', '>=', this.fromDate]
            // dataSource.filter(['vaum', '>', Number(this.vaumMin)]);
            filter.filterExp = new Date(this.fromDate).toLocaleDateString();
            filter.showFilterBox = false;
        }
        else if(this.toDate != undefined){
            filter.filterApplied = ['createDate', '<=', this.toDate]
            // dataSource.filter(['vaum', '<', Number(this.vaumMax)]);
            filter.filterExp= new Date(this.toDate).toLocaleDateString();
            filter.showFilterBox = false;
        }
        
        //dataSource.load();
                

    }

    
    if(filter.name == 'Prior Firm Type'){
        if(this.selectedPriorFirmTypeList.length <= 0){
            this.notSelected = true
        } else {
            let filterArr = [];
            let arrayFilter = [];
            let filterSelected = [];

            this.selectedPriorFirmTypeList.forEach(element => {
                arrayFilter.push(element.priorFirmType);
                filterSelected.push(element.priorFirmType)
            });
            if( arrayFilter.length > 1){
                arrayFilter = arrayFilter.join("/or/").split("/");
            }
            console.log(arrayFilter)
            arrayFilter.forEach(element => {
                if(element != 'or'){
                    var el = ['priorFirmType','=',element]
                    filterArr.push(el)
                }
                else{
                    filterArr.push(element);
                }
                
                
            });
            
            filter.filterExp = filterSelected.length + " " + 'Selected';
            filter.filterApplied = [filterArr];
            
            filter.showFilterBox = false;
            console.log(filterArr)
        }
    }

    if(this.maxError == false && this.notSelected == false && this.createdDateError == false){
        if(this.filters.length == 1){
            dataSource.filter(filter.filterApplied);
            dataSource.load()
        }
        else{
            let allfilters = [];
            this.filters.forEach((e,i) => {            
                allfilters.push(e.filterApplied)
            })
    
           allfilters.forEach((el,i)=>{
               if(i % 2 == 1 && i <allfilters.length){
                   allfilters.splice(i,0,'and')
               }
           })
           
           console.log(allfilters)
           dataSource.filter([allfilters]);
            dataSource.load()
            
        }
    }

    
   
  }

  cancelFilter(field){
    field.filter = ""
    this.maxError = false;
    this.notSelected = false;
    this.createdDateError = false;
    
    console.log(field)
    if(field.filterApplied != undefined && field.filterApplied?.length > 0){
        field.showFilterBox = false;
    }
    else{
        if( field.name == 'VAUM'){
            this.vaumMin = "";
            this.vaumMax = "";
            field.filter = "";
            field.filterExp = ''
            
        }
        if( field.name == 'Created By'){
            this.selectedCreatedByList = [];
            field.filterExp = ''
            
        }
        if( field.name == 'Prior Firm Type'){
            this.selectedPriorFirmTypeList = [];
            field.filterExp = ''
            
        }
        this.filters = this.filters.filter(ele => ele.name != field.name);
    }
     
      //const dataSource = this.gridContainer.instance.getDataSource();
      //this.gridContainer.instance.clearFilter();
    }

    removeFilter(filter){
        filter.filterApplied = [];
        this.filters.forEach(ele => {
            if(ele.name == filter.name){
                ele.isDisabled = false;
            }
        })
        this.filters = this.filters.filter(ele => ele.name != filter.name);
        if( filter.name == 'VAUM'){
            this.vaumMin = "";
            this.vaumMax = "";
            filter.filter = ""
            filter.filterExp = ''
            this.maxError=false;
        }
        if( filter.name == 'Created By'){
            this.selectedCreatedByList = [];
            filter.filterExp = ''
            this.notSelected=false;
            
        }
        if( filter.name == 'Created Date'){
            this.fromDate = null;
            this.toDate=null;
            filter.filterExp = '';
            this.createdDateError= false;
        }
        if( filter.name == 'Prior Firm Type'){
            this.selectedPriorFirmTypeList = [];
            filter.filterExp = ''
            
        }
        const dataSource = this.gridContainer.instance.getDataSource();
        if(this.filters.length <= 0){
            this.gridContainer.instance.clearFilter("dataSource");
            dataSource.load();
        }
        else{
           
            let allfilters = [];
            this.filters.forEach((e,i) => {            
                allfilters.push(e.filterApplied)
            })

            allfilters.forEach((el,i)=>{
                if(i==1){
                    allfilters.splice(i,0,'and')
                }
            })
            
            console.log(allfilters)
            dataSource.filter([allfilters]);
            dataSource.load()
        }
        
    }

    removeClass(){
        this.ddBtn.nativeElement.setAttribute('aria-expanded', 'false');
        this.renderer.removeClass(this.dropdown.nativeElement, 'show');
        // this.renderer.removeClass(this.mainDropdown.nativeElement, 'open');
        // this.renderer.removeClass(this.mainDropdown.nativeElement, 'show');
        
       
    }
    openFilter(){
        if(this.dropdown != undefined){
            //console.log(this.dropdown.nativeElement.classList.contains('show'))
            //this.renderer.addClass(this.dropdown.nativeElement, 'show'); 
        }
        
    }

    onContentReady(e){       
        //console.log(e.component.totalCount())
        this.filteredCount = e.component.totalCount();
        setTimeout(() => {
            if (e.component.pageSize() == 0) {
              var el = e.component._$element.find('.dx-page-size').last();
              el.addClass("dx-selection")
            }
           
        }, 0);

        // console.log(this.gridContainer.instance)
        // console.log(this.gridContainer.instance.getDataSource())
         
    }

    onSelectionChanged(e){
        console.log(e)
        if(e.addedItems.length > 0){
            e.addedItems.forEach(addedEle => {
                if(this.selectedCreatedByList.filter(el => el == addedEle).length <= 0 ){
                    this.selectedCreatedByList.push(addedEle)
                }
            });
            
        }
        else if(e.removedItems.length > 0){
            e.removedItems.forEach(removedEle => {
                this.selectedCreatedByList = this.selectedCreatedByList.filter(ele => ele != removedEle);
            });
            
        }
        //console.log(this.selectedCreatedByList)
    }

    onPriorTypeSelectionChange(e) {
        console.log(e)
        if(e.addedItems.length > 0){
            for (var addedItem of e.addedItems) {
                if(this.selectedPriorFirmTypeList.filter(el => el == addedItem).length <= 0 ){
                    this.selectedPriorFirmTypeList.push(addedItem)
                }
            }
        }
        else if(e.removedItems.length > 0){
            for (var removedItem of e.removedItems) {
                this.selectedPriorFirmTypeList = this.selectedPriorFirmTypeList.filter(ele => ele != removedItem);
            }
        }
    }

    showFilterBox(filter){
        this.maxError = false;
        this.notSelected = false;
        this.createdDateError = false;

        if(filter.filterApplied == undefined){
            this.filters = this.filters.filter(ele => ele.name != filter.name);
        }
        
    }

    /**
     * Populate Prior Firm type filter with all of the types currently displaying
     * in the offers grid
     * @param offers - list of offers
     */
    setupPriorFirmTypeFilter(offers) {

        const priorFirmTypeSet = new Set(this.priorFirmTypeList.map(firmType => firmType.priorFirmType));
        const firmTypes = offers.filter(offer => {
            if (priorFirmTypeSet.has(offer.priorFirmType)) {
                return false;
            }
            priorFirmTypeSet.add(offer.priorFirmType);
            this.priorFirmTypeList.push({'priorFirmType': offer.priorFirmType});
            return true;
        });
    }

}
