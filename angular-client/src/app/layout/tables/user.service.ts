import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class UserTableService {
    private url = 'http://localhost:3000/user/getAll';
    private get_specific_url = 'http://localhost:3000/users/get';

    constructor(private http: Http) { }

    public get() {
        return this.http.get(this.url);
    }

    public getSpecific(user_id) {
        return this.http.get(this.get_specific_url + '?id=' + user_id);
    }

    public getCities() {
        return this.http.get('./assets/cities.json');
    }

    public getPlans() {
        return this.http.get('./assets/plans.json');
    }
}
