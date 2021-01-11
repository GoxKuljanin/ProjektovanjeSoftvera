import { AuthService } from './../services/authService/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LoginService } from './../services/login.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public service: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        if(this.service.tokenIsPresent()){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.service.getToken()}`
                }
            });
        }
        return next.handle(request);
    }
}
