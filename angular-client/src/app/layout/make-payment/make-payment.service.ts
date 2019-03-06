import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class MakePaymentService {
    private url = 'http://localhost:3000/search';
    private payment_url = 'http://localhost:3000/payment';

    constructor(private http: Http) { }

    public search(user_email) {
        const body = {
            user_email : user_email
        };
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });

        return this.http.post(this.url, body, requestOptions);
    }

    public bill_payment( user_id: number, user_plan: number, payment_method: number, due_date: string) {
        const body = {
            user_id : user_id,
            user_plan : user_plan,
            payment_method : payment_method,
            due_date : due_date
        };
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });
        return this.http.post(this.payment_url, body, requestOptions);
    }
}
