import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class SignupService {

    constructor(
        private http: Http
    ) {}
    AdminCreateURL = 'http://localhost:3000/admin/create';

    public createAdmin(userName: string, password: string, name: string, emailID: string) {
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
}
