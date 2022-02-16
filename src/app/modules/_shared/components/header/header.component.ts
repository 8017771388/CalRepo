import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Resolve } from "@angular/router";
import { APP_TITLE } from "../../constants/global.constant";
import { UserInfo } from "../../services/userInfo.service";
import { CommunicationService } from "../../services/communication.services";
import { Title } from "@angular/platform-browser";
import { HomeService } from '../../../home/services/home.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    public appTitle: string = APP_TITLE;
    //private userIcon: string = 'assets/images/default.png';
    public userImageUrl: string;
    public userData: any;
    public userType: any;
    public showIcon: any;
    public showAPASubmenu: boolean;
    public showBSubmenu : boolean;
    public notificationCount: any;
    public allNotifications: any;
    public bsModalRef: BsModalRef;
    public currentUser: any;
    public showNotification: boolean = true;
    public userRole: any;


    constructor(
        public router: Router,
        private userInfo: UserInfo,
        private communicationService: CommunicationService,
        private acRoute: ActivatedRoute,
        private titleService: Title,
        public homeService: HomeService,
        private modalService: BsModalService
    ) {
        router.events.subscribe((val) => {
            // see also
            this.appTitle = "TA Calculator";
            this.titleService.setTitle(
                "TA Calculator"
            );
            //var fullUrl = window.location.href;
            //console.log(fullUrl);
            //if (fullUrl.includes("admin")) {
            //    this.showAPASubmenu = false;
            //    this.showBSubmenu = false;
            //    this.titleService.setTitle(
            //        "TA CALCULATOR - Admin"
            //    );
            //    this.appTitle =
            //        "TA CALCULATOR - Admin";
            //}
            //else if(fullUrl.includes("premium-buyer")) {
            //    this.showAPASubmenu = false;
            //    this.showBSubmenu = true;
            //    this.titleService.setTitle(
            //        "M&A Solutions - Premium Buyer"
            //    );
            //    this.appTitle =
            //        "M&A Solutions - Premium Buyer";
            //}
            //else {
            //    this.showAPASubmenu = true;
            //    this.showBSubmenu = false;
            //}
        });

        this.communicationService.getUserInfo().subscribe(data => {
            if (data) {
                this.currentUser = data;
                this.userType = this.userInfo.getUserRole();
                
              //  this.userImageUrl = `http://mysites.corp.lpl.com/User%20Photos/Profile%20Pictures/${this.currentUser.UserName}_LThumb.jpg`;
            }

        });
       
       
    }

    ngOnInit() {
        //this.showAPASubmenu = true; 
        this.communicationService
            .getUserInfo()
            .subscribe((userData) => (this.userData = userData));
        if (this.userData) {
            //this.userImageUrl = `http://mysites.corp.lpl.com/User%20Photos/Profile%20Pictures/${this.userData.userName}_LThumb.jpg`;
            //this.userImageUrl = "http://mysites.corp.lpl.com/User%20Photos/Profile%20Pictures/sthallas_LThumb.jpg";
        }
        this.communicationService
            .getAccessType()
            .subscribe((userType) => {
                this.userType = userType;
                console.log(this.userType)
                if (this.userType == null || this.userType == undefined) {
                    this.userType = this.userInfo.getUserRole();

                }
            });
       

    }

    placeholderUrl() {
        if (!this.userImageUrl) this.userImageUrl = "assets/img/default.png";
    }
    menuChange() {
        //this.showAPASubmenu = false;
    }

    signout() {
        this.router.navigate(["/signout"]);
    }



}
