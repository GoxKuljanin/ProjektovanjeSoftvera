import { AuthService } from './../services/authService/auth.service';
import { LoginService } from './../services/login.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";


@Injectable()

export class AdminKlinikeGuard implements CanActivate {

    constructor(private service: LoginService, private router: Router, private authService: AuthService){}

    canActivate(){
        if(this.authService.getToken()){
            if(JSON.stringify(this.service.getTokenAuthorities()).search('ROLE_ADMIN') !== -1){
                return true;
            }else {
                console.log('Nemate ovlascenja!')                          
                this.router.navigate(['/login']);
                return false;
            }
        }else {
            console.log('Niste se prijavili!');
            this.router.navigate(['/login']);
            return false;
        }
    }
}