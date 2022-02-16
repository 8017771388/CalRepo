import { Injectable } from '@angular/core';
import { HttpService } from './http.services'
import { AUTH_URL } from '../constants/api-constant';
import { CommunicationService } from './communication.services';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class JWTService {

    constructor(private httpService: HttpService, private communicationService: CommunicationService) { }
    /**
     * to get JSON Web Token
     */
    getJWTtoken(): string {
        return this.httpService.getCookie('name');
    }

    /**
     * to get parsed JWT
     * @param token 
     */
    getParsedJwt(token?: string): any {
        token = token || this.getJWTtoken();
        if (!token) {
            return null;
        }
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    }

    /**
     * Checks token's expiration
     * @param token 
     */
    isExpire(token?: string): boolean {
        let expired = false;
        const jwtToken = this.getParsedJwt(token);
        //console.log(jwtToken)
        expired = !jwtToken ? true : Math.round(new Date().getTime() / 1000) >= jwtToken.exp ? true : false;
        //console.log(jwtToken.exp);
        //console.log(Math.round(new Date().getTime() / 1000));
        //console.log(expired);
        return expired;
    }

    /**
     * refreshes token
     */
    refreshToken() {
        this.httpService.eraseCookie('username');
        // console.log("refreshToken", AUTH_URL, this.httpService.checkCookie('name'), document.cookie);
        return this.httpService.getCookieImage(AUTH_URL);
    }

    /**
     * checks session expiration
     */
    isSessionExpire(): boolean {
        this.communicationService.getTimeFrameData().subscribe(userType => {
            // console.log("isSessionExpire", userType);
            if (userType && userType.periodData) {
                const currentDate = formatDate(new Date(), 'MM/dd/yyyy', 'en-US');
                const presentWeek = userType.periodData.find(val => {
                    return val.periodCaption === "Present Week";
                })
                const expireDate = presentWeek?.periodEndValue;
                if (expireDate < currentDate) {
                    return true;
                }
            }
        })
        return false;
    }

   /* getJWTtoken(): string {
        return this.httpService.getCookie('hozjwt');
    }

    getParsedJwt(token?: string): any {
        token = token || this.getJWTtoken();
        if (!token) {
            return null;
        }
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    }

    isExpire(token?: string): boolean {
        let expired = false;
        const jwtToken = this.getParsedJwt(token);
        //console.log(jwtToken)
        expired = !jwtToken ? true : Math.round(new Date().getTime() / 1000) >= jwtToken.exp ? true : false;
        //console.log(jwtToken.exp);
        //console.log(Math.round(new Date().getTime() / 1000));
        //console.log(expired);
        return expired;
    }

    refreshToken() {
        return this.httpService.getCookieImage(CW_IMAGE_URL);
    }*/
}
