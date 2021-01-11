import { AuthService } from './../services/authService/auth.service';
import { User } from 'src/app/models/user.model';
import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()

export class LekarGuard implements CanActivate{

    korisnik: User;

    constructor(private service: LoginService, private router: Router, private authService: AuthService){}

    canActivate(){

        if(this.authService.getToken()){
            if(JSON.stringify(this.service.getTokenAuthorities()).search('ROLE_LEKAR') !== -1){
                return true;        
            }else {
                this.router.navigateByUrl('/403');                          //Ne prebacuje
                return false;
            }
        }else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}