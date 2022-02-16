import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { threadId } from "worker_threads";

@Injectable({
    providedIn: 'root'
  })
export class CommunicationService {
    private loggedin = new BehaviorSubject(null);
    private timeframe = new BehaviorSubject(null);
    private userInfo = new BehaviorSubject<any>(null);
    public forgeRockAccess = new BehaviorSubject<any>(null);
    private loader = new BehaviorSubject<boolean>(false);
    private logger = new Subject<any>();
    private accessType = new BehaviorSubject(null);
   
    public isDirtyCheck = new BehaviorSubject<boolean>(false);
    public buyerProfileStatusFlag = new BehaviorSubject<boolean>(false);
    public sellerStageFlag = new BehaviorSubject<boolean>(false);
    public mainContentFlag = new BehaviorSubject<boolean>(false);
    public contentPage = new BehaviorSubject<string>(null);
    public calculatedOfferResponse = new BehaviorSubject<any>(null);
    private PandLReport = new BehaviorSubject<any>(null);
    private offerCriteria = new BehaviorSubject<any>(null);
    private dataType = new BehaviorSubject<any>([]);
    public inputformValid = new BehaviorSubject<boolean>(false);
    private offerCalculateButton = new BehaviorSubject<boolean>(null);
    public offerClearButton = new BehaviorSubject<boolean>(false);
    public modelTermComboPL = new BehaviorSubject<any>(null);
    public offerInputData = new BehaviorSubject<any>(null);

    constructor() { }

    getTimeFrameData(): Observable<any> {
        return this.timeframe.asObservable();
    }
    setForgeRockAccessInfo(data: any) {
        this.forgeRockAccess.next(data);
    }

    getForgeRockAccessInfo(): Observable<any> {
        return this.forgeRockAccess.asObservable();
    }

    setAccessType(accessType) {
        this.accessType.next(accessType);
    }

    getAccessType(): Observable<boolean> {
        return this.accessType.asObservable();
    }

    getLoggedInType(): Observable<boolean> {
        return this.loggedin.asObservable();
    }

    setLoggedinType(type: boolean): void {
        this.loggedin.next(type);
    }

    clearLoggedinType(): void {
        this.loggedin.next(null);
    }

    getUserInfo(): Observable<any> {
        return this.userInfo.asObservable();
    }

    setUserInfo(data: any): void {
        this.userInfo.next(data);
    }

    clearUserInfo(): void {
        this.userInfo.next(null);
    }

    getLoader(): Observable<boolean> {
        return this.loader.asObservable();
    }

    displayLoader(data: boolean): void {
        this.loader.next(data);
    }

    clearLoader(): void {
        this.loader.next(false);
    }

    setIsDirty(data: boolean): void {
        this.isDirtyCheck.next(data);
    }
    getIsDirty(): Observable<boolean> {
        return this.isDirtyCheck.asObservable();
    }
    clearIsDirty(): void {
        this.isDirtyCheck.next(false);
    }
    getLogger(): Observable<any> {
        return this.logger.asObservable();
    }

    setLogger(data): void {
        this.logger.next(data);
    }

    clearLogger(): void {
        this.logger.next(false);
    }

   
    

   

   
    getMainContentFlag(): Observable<boolean> {
        return this.mainContentFlag.asObservable();
    }
    setMainContentFlag(data: boolean): void {
        this.mainContentFlag.next(data);
    }

    setcalculatedOfferResponse(data): void {
        this.calculatedOfferResponse.next(data);
    }

    getcalculatedOfferResponse(): Observable<any> {
        return this.calculatedOfferResponse;
    }
    getPandLReport(): Observable<any> {
        return this.PandLReport.asObservable();
    }
    setPandLReport(data: any): void {
        this.PandLReport.next(data);
    }
    clearPandLReport(): void {
        this.PandLReport.next(null);
    }

    getOfferCriteria(): Observable<any> {
        return this.offerCriteria.asObservable();
    }
    setOfferCriteria(data: any): void {
        this.offerCriteria.next(data);
    }
    clearOfferCriteria(): void {
        this.offerCriteria.next(null);
    }

    getDataType(): Observable<any> {
        return this.dataType.asObservable();
    }
    setDataType(data: any): void {
        this.dataType.next(data);
    }

    getInputformValid(): Observable<any> {
        return this.inputformValid.asObservable();
    }
    setInputformValid(data: any): void {
        this.inputformValid.next(data);
    }
    getOfferCalculateButton(): Observable<any> {
        return this.offerCalculateButton.asObservable();
    }
    setOfferCalculateButton(data: any): void {
        this.offerCalculateButton.next(data);
    }

    getOfferClearButton(): Observable<any> {
        return this.offerClearButton.asObservable();
    }
    setOfferClearButton(data: any): void {
        this.offerClearButton.next(data);
    }

    getModelTermComboPL(): Observable<any> {
        return this.modelTermComboPL.asObservable();
    }
    setModelTermComboPL(data: any): void {
        this.modelTermComboPL.next(data);
    }

    getOfferInputData(): Observable<any> {
        return this.offerInputData.asObservable();
    }
    setOfferInputData(data: any): void {
        this.offerInputData.next(data);
    }

    
}
