import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable , of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    cookie: string;
    pageLoading = true;

    constructor(private http: HttpClient) {}

    get<T>(url: string, formData?: any, additionalHeaders = {}, withCredentials = true): Observable<T> {
        let params = new HttpParams();
        let headers;
        let tempHeaders;

        for (const i in formData) {
            if (formData.hasOwnProperty(i)) {
                params = params.set(i, formData[i]);
            }
        }

        tempHeaders = {
            'Content-type': 'application/json'
        };
        tempHeaders = this.extendHeader(tempHeaders, additionalHeaders);
        headers = tempHeaders;
       // headers = new Headers(tempHeaders);

        return this.http
            .get<T>(url, {
                headers,
                params,
                withCredentials
            })
            .pipe(map(response => response));
    }

    post<T>(url: string, formData: any, additionalHeaders = {}, withCredentials= true): Observable<T> {
        // let headers = {
        //     'Content-type': 'application/json'
        // };
        let headers;
        let tempHeaders = {
            timestamp: new Date().toISOString(),
            'Content-type': 'application/json'
        };
        tempHeaders = this.extendHeader(tempHeaders, additionalHeaders);
        headers = tempHeaders;
        const body = JSON.stringify(formData);
        return this.http
            .post<T>(url, body, {
                headers,
                withCredentials
            })
            .pipe(map(response => response));
    }

    put<T>(url: string, formData?: any, additionalHeaders = {}, withCredentials = true): Observable<T> {
        let tempHeaders = {
            'Content-type': 'application/json'
        };
        tempHeaders = this.extendHeader(tempHeaders, additionalHeaders);
        const body = JSON.stringify(formData);
        return this.http
            .put<T>(url, body, {
                headers: tempHeaders,
                withCredentials
            })
            .pipe(map(response => response));
    }

    delete<T>(url: string, formData?: any, additionalHeaders = {}, withCredentials = true): Observable<T> {
        let params = new HttpParams();

        for (const i in formData) {
            if (formData.hasOwnProperty(i)) {
                params = params.set(i, formData[i]);
            }
        }

        let tempHeaders = {
            'Content-type': 'application/json'
        };
        tempHeaders = this.extendHeader(tempHeaders, additionalHeaders);

        return this.http
            .delete<T>(url, {
                headers: tempHeaders,
                params,
                withCredentials
            })
            .pipe(map(response => response));
    }

    extendHeader(a: any, b: any): any {
        for (const key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

     /**
     * to set cookie
     * @param cname 
     * @param cvalue 
     * @param domain 
     */
    public setCookie(cname: string, cvalue: string, domain: string): void {
        let d = new Date();
        const name = cname + '=';
        d.setTime(d.getTime() + (5 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + cvalue;
        document.cookie = expires;
        document.cookie = "domain=" + domain + ";path=/";
    }

    /**
     * to check cookie
     * @param name 
     */
    public checkCookie(name: string): boolean {
        let username = this.getCookie(name);
        //  console.log("checkCookie document.cookiee", username);
        if (username !== undefined) {
            return true;
        }
        return false;
    }

    /**
     * to get cookies
     * @param cname 
     */
    public getCookie(cname: any): string {
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let citem of ca) {
            let c = citem;
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                this.cookie = c.substring(name.length, c.length);
            }
        }
        //  console.log("getCookie document.cookiee", this.cookie);
        return document.cookie ? this.cookie : null;
    }

    /**
     * to get cookie image
     * @param imageUrl 
     */
    public getCookieImage(imageUrl: string) {
        // console.log("getCookieImage", imageUrl);
        let domain = window.location.hostname;
        return this.http.get(imageUrl, { withCredentials: true }).pipe(
            map(res => {
                this.setCookie('name', res['data'].JwtToken, domain);
                return this.checkCookie('name') ? res : {}
            }),
            catchError(err => of(err))
        );
    }
    /**
     * to erase cookies
     */
    public eraseCookie(cname): void {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    //getCookie(cname: any): string {
    //    const name = cname + '=';
    //    const decodedCookie = decodeURIComponent(document.cookie);
    //    const ca = decodedCookie.split(';');
    //    for (let citem of ca) {
    //        let c = citem;
    //        while (c.charAt(0) === ' ') {
    //            c = c.substring(1);
    //        }
    //        if (c.indexOf(name) === 0) {
    //            this.cookie = c.substring(name.length, c.length);
    //        }
    //    }
    //    return document.cookie ? this.cookie : null;
    //}

    //getCookieImage(imageUrl: string) {
    //    return this.http.get(imageUrl, { withCredentials: true }).pipe(
    //        map(res => res || {}),
    //        catchError(err => of(err))
    //    );
    //}

    handleErrorMsg(error: any) {
        const err = error.message || error.error || error;
        if (err === error) {
            return err;
        } else {
            if (!err) {
                return 'Some error occurred. Please try again.';
            } else if (
                error &&
                error.error &&
                error.error.statusmessage &&
                error.error.statusmessage === 'Record can not be deleted'
            ) {
                return error.error.statusmessage;
            } else {
                return 'Some error occurred. Please try again.';
            }
        }
    }
}
