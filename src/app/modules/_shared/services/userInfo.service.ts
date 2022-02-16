import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../models/userInfo.model';
import { Observable } from 'rxjs';
import { USER_ROLE_URL } from '../constants/api-constant';
import { CLOG_PREFIX, STORAGE_KEY, globalConstants } from '../constants/global.constant';
import { HttpService } from './http.services';
import { CW_IMAGE_URL, AUTH_URL, ADMIN_USER, SYS_ADMIN_USER, SUBMITTER_USER, FORGE_ROCK_URL } from '../constants/api-constant';


@Injectable()
export class UserInfo {
    public _cLogPrefix = CLOG_PREFIX;
    public _storageKey = globalConstants.STORAGE_KEY;
    public _serviceUrl = '';
    public _imageUrl = '';
    public _imageRefreshInMinutes = 300000;
    public _currentUser: any = {};
   // public userName: string;
    public userType : string;
    public userService: UserService;


    userRole: any;
    userInfo: any;
    userName: any;
    fullName: any;
    userDetails = {
        userRole: "",
        userName: "",
        fullName: ""
    }
   /* public _imageRefreshInMinutesFn(minutes) {
        if (minutes) {
            this._imageRefreshInMinutes = Number(minutes * 60000);
        }
        return this._imageRefreshInMinutes;
    }

    public _imageUrlFn(url) {
        if (url) {
            this._imageUrl = url;
        }
        return this._imageUrl;
    }

    public _serviceUrlFn(url) {
        if (url) {
            this._serviceUrl = url;
        }
        return this._serviceUrl;
    }

    public _currentUserFn() {
        return this._currentUser;
    }*/

    constructor(private http: HttpClient, private httpService: HttpService) {
        this.userService = new UserService();
        //this.userService.config.imageRefreshInMinutes = this._imageRefreshInMinutesFn;
        //this.userService.config.imageUrl = this._imageUrlFn;
        //this.userService.config.serviceUrl = this._serviceUrlFn;
        //this.userService.init = this._init;
        //this.userService.currentUser = this._currentUserFn;
        //this.userService.dummyToProtectCommas = 0;
    }

    /**
  * get user role from cookies
  */
    getUserRole(): string {
        if (!!this.userDetails.userRole && this.userDetails.userRole.length > 0) {
            return this.userDetails.userRole;
        }
        else if (this.httpService.checkCookie('ud')) {
            return JSON.parse(decodeURIComponent(atob(this.httpService.getCookie('ud'))))?.userRole;
        }
        return "";
    }

    /**
     * get full name from cookies
     */
    getUserFullName(): string {
        if (!!this.userDetails.fullName && this.userDetails.fullName.length > 0) {           
            return this.userDetails.fullName;
        }
        else if (this.httpService.checkCookie('ud')) {
            this.fullName = JSON.parse(decodeURIComponent(atob(this.httpService.getCookie('ud'))))?.fullName;
            return this.fullName;
        }
        return "";
    }

    /**
     * get corpId from cookies
     */
    getUserName(): string {
       
        if (!!this.userDetails.userName && this.userDetails.userName.length > 0) {
            console.log("userDetails", this.userDetails);
            console.log("userDEtails", JSON.parse(decodeURIComponent(atob(this.httpService.getCookie('ud')))));
            return this.userDetails.userName;
        }
        else if (this.httpService.checkCookie('ud')) {
            this.userName = JSON.parse(decodeURIComponent(atob(this.httpService.getCookie('ud'))))?.userName;
            console.log("userDEtails", JSON.parse(decodeURIComponent(atob(this.httpService.getCookie('ud')))))
           // this._currentUser = JSON.parse(sessionStorage.getItem(this._storageKey));
            console.log("userD", JSON.parse(sessionStorage.getItem(this._storageKey)))
            return this.userName;
        }
        return "";
    }

    /**
     * role name mapping with forgerock roles
     * @param roles 
     */
    public getUserRoleFromStorage(roles = []): string {


        var loginAdmin = roles.filter((val) => val.toLowerCase() == ADMIN_USER.toLowerCase());
        var loginSubmitter = roles.filter((val) => val.toLowerCase() == SUBMITTER_USER.toLowerCase());
        console.log('admin',loginAdmin )
        console.log('admin',loginSubmitter )
        //    var user = this.userInfo._currentUserFn()
    //    var param = {
    //        userName: user.userName,
    //        firstName: user.firstName,
    //        lastName: user.lastName,
    //        displayName: user.displayName,
    //        groups: user.groups
    //    }
    //    console.log(user);
    //    this.calculatorService.createUser(param).subscribe(data => {
    //        console.log("user saved")

    //    }, (err) => {

    //            console.log("error")
        
    //    });

        if (loginAdmin.length > 0) {
            this.userRole = "Admin";
        }
        else if (loginSubmitter.length > 0) {
            this.userRole = "Submitter";
        } else {
            this.userRole = "";
        }


     
        return this.userRole;
    }

    /**
     * get roles mapping for header
     */
    public getUserRoleForHeader() {
        const userDisplayRole = this.getUserRole() || "";
        if (userDisplayRole.toLowerCase().indexOf("admin") > -1) {
            return 'Admin Ops User';
        }
        if (userDisplayRole.toLowerCase().indexOf("ops") > -1) {
            return 'Ops User';
        }
        if (userDisplayRole.toLowerCase().indexOf("clr") > -1) {
            return 'Clr User';
        }
    }

    /**
     * get corpId from cookie
     */
    public getUserNameFromStorage() {
        this.userName = this.getUserName();
        return this.userName;
    }
    /*public _currentUserFromStorage() {
        this._currentUser = JSON.parse(sessionStorage.getItem(this._storageKey));
        this._currentUser.hasRole = role => {
            let result = false;
            for (let i = 0; i < this._currentUser.groups.length; i++) {
                if (role.toLowerCase() === this._currentUser.groups[i].name.toLowerCase()) {
                    result = true;
                    break;
                }
            }
            return result;
        };
        return this._currentUser;
    }

    public _getCookieImage() {
        return new Promise((resolve, reject) => {
            const hozCookieImage = new Image();
            hozCookieImage.onload = () => {
                resolve();
            };
            hozCookieImage.onerror = () => {
                const er = this._cLogPrefix + 'getCookieImage: Image failed to load, unknown user';
                console.error(er);
                reject(er);
            };
            hozCookieImage.src = this._imageUrl + '?' + new Date().getTime();
        });
    }

    public _getUser() {
        return new Promise((resolve, reject) => {
            this.http.get(this._serviceUrl, { withCredentials: true }).subscribe(
                xhrResponse => {
                    const cu = JSON.parse(JSON.stringify(xhrResponse)).data;
                    sessionStorage.setItem(this._storageKey, JSON.stringify(cu));
                    // required so that sessionStorage matches AngularJS implementation
                    resolve(this._currentUserFromStorage());
                },
                () => reject('HTTP Error')
            );
        });
    }

    public _init() {
        return new Promise((resolve, reject) => {
            if (sessionStorage.getItem(this._storageKey)) {
                resolve(this._currentUserFromStorage());
            } else {
                this._getCookieImage().then(
                    () => {
                        this._getUser().then(
                            rs1 => {
                                resolve(rs1);
                            },
                            er => {
                                reject(er);
                            }
                        );
                    },
                    er => {
                        reject(er);
                    }
                );
            }
        });
    }*/

    public getUserRoles(): Observable<any> {
        return this.http.get(USER_ROLE_URL);
    }
}
