import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CW_IMAGE_URL, AUTH_URL, ADMIN_USER, SUBMITTER_USER, FORGE_ROCK_URL } from '../constants/api-constant';
import { UserInfo } from './userInfo.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from './communication.services';
import { SUCCESS, SYSADMIN, ADMIN, SUBMITTER } from '../constants/global.constant';
import { TAcalculatorService } from '../../tacalculator/services/tacalculator.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.services';
import { GenerateGUID } from '../static-class/generate-guid.static';

import { globalConstants } from '../constants/global.constant';



// TODO: Add Angular decorator.
// TODO: Add Angular decorator.
@Injectable()
export class AuthenticationService implements Resolve<any>, OnDestroy {
    Observable1: Subscription;

    pagePath = '';
    constructor(private router: Router,
        private userInfo: UserInfo,
        private communicationService: CommunicationService,
        private http: HttpClient,
        private httpService: HttpService,
        private calculatorService: TAcalculatorService ) { }

    resolve(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        this.pagePath = activatedRoute.routeConfig.path;

        this.communicationService.displayLoader(true);
        try {
            if (sessionStorage.getItem(globalConstants.STORAGE_KEY) && sessionStorage.getItem(globalConstants.STORAGE_KEY_MANAGE_ACCESS) && this.httpService.checkCookie('ud') && JSON.parse(decodeURIComponent(atob(this.httpService.getCookie('ud'))))) {
                const data = JSON.parse(sessionStorage.getItem(globalConstants.STORAGE_KEY));
                const forgerock = JSON.parse(sessionStorage.getItem(globalConstants.STORAGE_KEY_MANAGE_ACCESS));
                 this.userInfo.userDetails.fullName = data?.DisplayName;
                 this.userInfo.userDetails.userName = forgerock?.userName;
                 this.userInfo.userDetails.userRole = this.userInfo.getUserRoleFromStorage(forgerock.roles);
                 console.log("relogging in", data, forgerock);
                return this.launchApp(data, forgerock);
            } else {
                //  console.log("1st logging in");
                return this.AuthSource();
            }
        } catch (e) {
            this.communicationService.displayLoader(false);
            this.router.navigate(['signout']);
        }
    }

    /**
  * set cookies and handles first time login
  */
    private AuthSource(): Promise<any> {

        let domain = window.location.hostname;
        return new Promise((resolve, reject) => {
            this.http.get(AUTH_URL, { withCredentials: true }).subscribe(authResponse => {
                if (authResponse && authResponse['data']?.JwtToken) {
                    this.httpService.setCookie('name', authResponse['data']?.JwtToken, domain);
                    this.userInfo.userDetails.fullName = authResponse['data']?.DisplayName;
                    const cu = authResponse['data'];
                    delete cu.JwtToken;
                    delete cu.DisplayName;
                    sessionStorage.setItem(globalConstants.STORAGE_KEY, JSON.stringify(cu));
                    const headers = { "x-api-transaction-id": GenerateGUID.newGuid(), "Platform": "HO" }

                    if (this.httpService.checkCookie('name')) {
                        this.http.get(FORGE_ROCK_URL, { headers: headers, withCredentials: true }).subscribe(res => {
                            if (res['data'] && res['data']['assignments']) {
                                let forgeRockData = res['data'];
                                this.userInfo.userDetails.userName = forgeRockData?.userName;
                                this.userInfo.userDetails.userRole = this.userInfo.getUserRoleFromStorage(forgeRockData.roles);
                                console.log("this.userInfo.userDetails",this.userInfo.userDetails)
                                this.httpService.setCookie('ud', btoa(encodeURIComponent(JSON.stringify(this.userInfo.userDetails))), domain);
                                //delete forgeRockData?.userName;
                                //delete forgeRockData?.roles;
                                sessionStorage.setItem(globalConstants.STORAGE_KEY_MANAGE_ACCESS, JSON.stringify(forgeRockData));
                                const appLevelAccess = forgeRockData['assignments'].find(obj => obj.name === "TACalculator");

                                if (appLevelAccess?.action.includes("Submitter","Admin")) {

                                    /*  this.http.get(MAET_API_Uname, { withCredentials: true }).subscribe(res => {
                                         console.log('getusername Test-->', res);
                                     }) */

                                    resolve(this.launchApp(cu, forgeRockData));
                                    //this.http.get(GET_TIME_FRAME, { withCredentials: true }).subscribe(timeFrameResponse => {

                                    //    if (timeFrameResponse['data'] && timeFrameResponse['httpStatusCode'] === 200) {
                                    //        // sessionStorage.setItem(globalConstants.STORAGE_KEY_TIME_PERIOD, JSON.stringify(timeFrameResponse['data'] ? timeFrameResponse['data'] : []));
                                    //        // sessionStorage.setItem(globalConstants.STORAGE_KEY_TEAM, "1"); // to store Team ID in session storage
                                    //        //  sessionStorage.setItem(globalConstants.STORAGE_KEY_ENTITY, "1"); // future scope to store Rep or Branches
                                    //        resolve(this.launchApp(cu, forgeRockData));
                                    //    } else {
                                    //        this.gotoErrorPage();
                                    //    }
                                    //}, error => {
                                    //    this.gotoErrorPage();
                                    //})
                                } else {
                                    resolve(this.launchApp(cu, forgeRockData));
                                    //this.gotoErrorPage();
                                }
                            }
                            else {
                                this.gotoErrorPage();
                            }
                        },
                            error => {
                                this.gotoErrorPage();
                            });
                    } else {
                        this.gotoErrorPage();
                    }
                } else {
                    this.gotoErrorPage();
                }
            });
        })

    }

    /**
    * To launch app based on user authentication
    * @param data 
    * @param userAccess 
    */
    launchApp(data: any, userAccess: any) {
        const userInfo = data;
        const userAccessInfo = userAccess.assignments;
        var user = data;
        user["roles"] = userAccess.roles;
        user["assignments"] = userAccess.assignments;
        this.communicationService.setUserInfo(data);
        this.setApplicationData(userInfo, userAccess);
        // console.log("launchApp->", userInfo, userAccess, userAccessInfo);
       // var loginSysAdmin = userAccess.roles.filter((val) => val == SYS_ADMIN_USER.toLowerCase().replace('\\', ''));
        var loginAdmin = userAccess.roles.filter((val) => val.toLowerCase() == ADMIN_USER.toLowerCase());
        var loginSubmitter = userAccess.roles.filter((val) => val.toLowerCase() == SUBMITTER_USER.toLowerCase());
       //var user = this.userInfo._currentUserFn()
        var param = {
            userName: data.UserName,
            firstName: data.FirstName,
            lastName: data.LastName,
            displayName: data.FirstName + ' ' + data.LastName,
            roles: userAccess.roles
        }
        console.log(data);
        this.calculatorService.createUser(param).subscribe(resp => {
            console.log("user saved")

        }, (err) => {

                console.log("error")

        });

        //if (loginSysAdmin.length > 0) {
        //    this.communicationService.setAccessType(SYSADMIN);
        //    this.userInfo.userType = SYSADMIN;
        //    return new Promise(resolve => resolve(SUCCESS));
        //} else
            if (loginAdmin.length > 0) {
                this.communicationService.setAccessType(ADMIN);
                data["userRole"] = ADMIN;
            this.userInfo.userType = ADMIN;
            return new Promise(resolve => resolve(SUCCESS));
        }
        else if (loginSubmitter.length > 0) {
                this.communicationService.setAccessType(SUBMITTER);
                data["userRole"] = SUBMITTER;
            this.userInfo.userType = SUBMITTER;
            return new Promise(resolve => resolve(SUCCESS));
        } else {
            this.gotoErrorPage();
        }
        //sessionStorage.setItem(globalConstants.STORAGE_KEY_MANAGE_ACCESS, JSON.stringify(data));
       // sessionStorage.setItem(globalConstants.STORAGE_KEY, JSON.stringify(user));
        //if (userInfo && userAccessInfo?.some(val => val.name === 'ApplicationLevel')) {
        //    this.setApplicationData(userInfo, userAccess);
        //    return new Promise(resolve => resolve('Success'));
        //} else {
        //    this.gotoErrorPage();
        //}
    }


    private setApplicationData(data: any, access: any): void {
        this.communicationService.setUserInfo(data);
        this.communicationService.setForgeRockAccessInfo(access);
        this.communicationService.displayLoader(false);
    }

    /**
     * Take us to Error page 
     */
    gotoErrorPage() {
        this.communicationService.displayLoader(false);
        this.router.navigate(['/error']);
        return new Promise(reject => reject('Application Error'));
    }

    ngOnDestroy() {
        if (this.Observable1) {
            this.Observable1.unsubscribe();
        }
    }

    //initCurrentUser(): Promise<any> {
    //    return this.userInfo._getCookieImage().then(
    //        () => {
    //            return this.userInfo._getUser().then(
    //                data => {
    //                    return this.launchApp(data);
    //                },
    //                () => {
    //                    this.gotoErrorPage();
    //                }
    //            );
    //        },
    //        () => {
    //            this.gotoErrorPage();
    //        }
    //    );
    //}

    //launchApp(data: any) {
    //    const adGroups = [];
    //    // tslint:disable-next-line: prefer-for-of
    //    for (let i = 0; i < data.groups.length; i++) {
    //        const adGroup = data.groups[i].name.toLowerCase();
    //        adGroups.push(adGroup.replace('\\', '').toLowerCase());
    //    }

    //    // //console.log(adGroups.indexOf(NORMAL_USER.toLowerCase().replace('\\', '')));
    //    console.log(adGroups);
    //    // //console.log(NORMAL_USER.toLowerCase().replace('\\', ''));

    //    this.communicationService.setUserInfo(data);
        
    //    var loginSysAdmin = adGroups.filter((val) => val == SYS_ADMIN_USER.toLowerCase().replace('\\', ''));
    //    var loginAdmin = adGroups.filter((val) => val == ADMIN_USER.toLowerCase().replace('\\', ''));
    //    var loginSubmitter = adGroups.filter((val) => val == SUBMITTER_USER.toLowerCase().replace('\\', ''));
        
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

    //    if (loginSysAdmin.length > 0) {
    //        this.communicationService.setAccessType(SYSADMIN);
    //        this.userInfo.userType = SYSADMIN;
    //        return new Promise(resolve => resolve(SUCCESS));
    //    } else if (loginAdmin.length > 0) {
    //        this.communicationService.setAccessType(ADMIN);
    //        this.userInfo.userType = ADMIN;
    //        return new Promise(resolve => resolve(SUCCESS));
    //    }
    //    else if (loginSubmitter.length > 0) {
    //        this.communicationService.setAccessType(SUBMITTER);
    //        this.userInfo.userType = SUBMITTER;
    //        return new Promise(resolve => resolve(SUCCESS));
    //    } else {
    //        this.gotoErrorPage();
    //    }
        
    //}

    //gotoErrorPage() {
    //    this.communicationService.displayLoader(false);
    //    this.router.navigate(['/error']);
    //    return new Promise(resolve => resolve('Error'));
    //}

    //ngOnDestroy() {
    //    if (this.Observable1) {
    //        this.Observable1.unsubscribe();
    //    }
    //}
}
