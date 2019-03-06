import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class FormService {
    private createUrl = 'http://localhost:3000/user/create';
    private billUrl = 'http://localhost:3000/user/billing/first';

    constructor(private http: Http) { }
    public post(
        email: string,
        name: string,
        aaddhar: string,
        address: string,
        city: string,
        pincode: string,
        mobile: string,
        DOB: string,
        gender: string,
        bloodGroup: string,
        height: string,
        weight: string,
        purpose: string,
        trainingType: string,
        medicalHistory: string,
        previousGym: string,
        pastProtien: string
    ) {
        const body = {
            user_email : email,
            user_name : name,
            user_aaddhar : aaddhar,
            user_address : address,
            user_city : city,
            user_pincode : pincode,
            user_mobile_number : mobile,
            user_date_of_birth : DOB,
            user_gender : gender,
            user_blood_group : bloodGroup,
            user_height : height,
            user_weight : weight,
            user_purpose : purpose,
            user_training_type : trainingType,
            user_medical_history : medicalHistory,
            user_past_gym : previousGym,
            user_past_protien : pastProtien
        };
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });

        return this.http.post(this.createUrl, body, requestOptions);

    }

    public getBloodGroup() {
        return this.http.get('./assets/bloodtypes.json');
    }
    public getTrainingType() {
        return this.http.get('./assets/trainingtype.json');
    }
    public getPurpose() {
        return this.http.get('./assets/purpose.json');
    }
    public getWeightLoss() {
        return this.http.get('./assets/weightloss.json');
    }

    public firstBill(
        user_id: Number,
        user_plan: Number,
        user_payment_method: Number,
        due_date: String
    ) {
        const body = { user_id: user_id, user_plan: user_plan, payment_method: user_payment_method, due_date: due_date };
        console.log(body);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });
        return this.http.post(this.billUrl, body, requestOptions);

    }
}
