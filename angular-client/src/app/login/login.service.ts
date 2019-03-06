import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class LoginService implements CanActivate {

    constructor(
        private router: Router,
        private http: Http
    ) {}
    AdminCreateURL = 'http://localhost:3000/admin/create';
    AdminLoginURL  = 'http://localhost:3000/admin/login';


    public login(userName: string, password: string) {
        const body = {
            userName: userName,
            password: password
        };

        console.log(userName);

        const headers = new Headers( { 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });

        return this.http.post(this.AdminLoginURL, body, requestOptions);
    }

    public createAdmin(userName: string, password: string, name: string, emailID: number) {
        const body = {
            userName: userName,
            password: password,
            name: name,
            emailID: emailID
        };

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOption = new RequestOptions({ headers: headers });
        return this.http.post(this.AdminCreateURL, body, requestOption);
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage['isLoggedin'] === '1') {
            console.log(localStorage.getItem('isLoggedin'));
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
