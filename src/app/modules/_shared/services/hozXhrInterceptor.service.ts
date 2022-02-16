import { Injectable} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { throwError} from 'rxjs';
import { JWTService } from './jwt.service';
import { CW_IMAGE_URL, AUTH_URL } from '../constants/api-constant';
import { switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from "./utility.service";

@Injectable()
export class HozXhrInterceptor implements HttpInterceptor {

    constructor(private jwtService: JWTService,
        private router: Router, private utility: UtilityService) { }
    /**
  * Angular passes a reference to the httpRequest object
  * @param request 
  * @param next 
  */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return from(this.handleAccess(request, next));
        if (request.url.includes('.json') || request.url === AUTH_URL) {
            // console.log("interceptor req url",request);
            return next.handle(request);
        }

        if (this.jwtService.isSessionExpire()) {
            this.router.navigate(['/signout', { state: { sessionTimeout: true } }]);
        } else {
            if (this.jwtService.isExpire()) {
                return this.jwtService.refreshToken().pipe(switchMap(() => {
                    request = request.clone({
                        setHeaders: {
                            // This is where you can use your various tokens
                            'hoz-jwt': `${this.jwtService.getJWTtoken()}`
                        },
                        withCredentials: true
                    });
                    return next.handle(request);
                }));
            }

            request = request.clone({
                setHeaders: {
                    // This is where you can use your various tokens
                    'hoz-jwt': `${this.jwtService.getJWTtoken()}`
                },
                withCredentials: true
            });

           


            return next.handle(request).pipe(catchError(error => {
                // intercept the respons error and displace it to the console . Stop the Loader and message shown
                // return the error to the method that called it
                return throwError(error);
            })) as any;
        }

    }

   /* intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return from(this.handleAccess(request, next));

        if (
            request.url.toLocaleLowerCase().indexOf('.json') >= 0 ||
            request.url === AUTH_URL ||
            request.url === CW_IMAGE_URL
        ) {
            return next.handle(request);
        }

        if (this.jwtService.isExpire()) {
            return this.jwtService.refreshToken().pipe(switchMap(() => {
                request = request.clone({
                    setHeaders: {
                        // This is where you can use your various tokens
                        'hoz-jwt': `${this.jwtService.getJWTtoken()}`
                    }
                });
                return next.handle(request);
            }));
        }

        request = request.clone({
            setHeaders: {
                // This is where you can use your various tokens
                'hoz-jwt': `${this.jwtService.getJWTtoken()}`
            }
        });

        return next.handle(request).pipe(catchError(error => {
            // intercept the respons error and displace it to the console . Stop the Loader and message shown
            // return the error to the method that called it
            return throwError(error);
        })) as any;
    }*/
}
