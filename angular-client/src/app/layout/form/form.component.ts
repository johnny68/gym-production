import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserTableService } from '../tables/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from './form.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';



@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {

    register_form: FormGroup;
    username: String;
    useremail: String;
    aadhaar: String;
    address: String;
    pincode: Number;
    mobileNumber: Number;
    gender;
    birthday: String;
    bloodgroup;
    height: Number;
    weight: Number;
    purpose: Number;
    trainingtype: Number;
    medicalHistory: String;
    previousGym: String;
    pastProtien: String;
    private citynumber;
    private trainingNumber;
    private purposeNumber;
    private bloodGroup;
    blood: String;
    datemodel;
    cityname;

    // json variables for loops
    cities: any[];
    city: any[];
    city1: any[];
    trainingtypes: any[];
    singleType: any[];
    purposes: any[];
    singlePurpose: any[];
    bloodTypes: any[];
    bloodtype: any[];
    getCities: any[];
    public user: object[];
    selectedImage: object;

    constructor(
        private router: Router,
        private service: UserTableService,
        formBuilder: FormBuilder,
        private formService: FormService,
        private modalService: NgbModal) {

        this.register_form = formBuilder.group({
            username: [null, Validators.required],
            useremail: [null, Validators.compose([Validators.required,
            Validators.pattern(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)])],
            aadhaar: [null, Validators.compose([Validators.required, Validators.maxLength(12), Validators.minLength(12)])],
            address: [null, Validators.required],
            pincode: [null, Validators.compose([Validators.required, Validators.maxLength(6), Validators.minLength(6)])],
            city: [null, Validators.required],
            mobileNumber: [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
            training: [null, Validators.required],
            purpose: [null, Validators.required],
            birthday: [null, Validators.required],
            gender: [null, Validators.required],
            bloodtype: [null, Validators.required],
            height: [null, Validators.required],
            weight: [null, Validators.required],
            medicalHistory: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
            previousGym: [null, Validators.required],
            pastProtien: [null, Validators.required]
        });
    }

    ngOnInit() {
        this.loadCities();
        this.loadTrainingTypes();
        this.loadPurposes();
        this.loadBloodGroups();
    }
    getGender(event) {
        this.gender = event;
    }

    loadTrainingTypes() {
        this.formService.getTrainingType()
            .subscribe((respose) => {
                const body = respose.json();
                this.trainingtypes = body.data;
            });
    }

    loadPurposes() {
        this.formService.getPurpose()
            .subscribe((response) => {
                const body = response.json();
                this.purposes = body.data;
            });
    }

    loadBloodGroups() {
        this.formService.getBloodGroup()
            .subscribe((response) => {
                const body = response.json();
                this.bloodTypes = body.bloodtype;
            });
    }

    loadCities() {
        this.service.getCities()
            .subscribe((response) => {
                const body = response.json();
                this.cities = body.data;
            });
    }
    bloodSelectedValue(event): void {
        this.bloodGroup = event;
    }

    trainingSelectedValue(event): void {
        this.trainingNumber = parseInt(event, 10);
    }

    purposeSelectedValue(event): void {
        this.purposeNumber = parseInt(event, 10);
    }

    citySelectedValue(event): void {
        this.citynumber = parseInt(event, 10);
        this.getloadCities(this.citynumber);
    }

    getGenderForModal(code) {
        let gender = '';
        if (code === '1') {
            gender = 'Male';
        } else if (code === '2') {
            gender = 'Female';
        }
        return gender;
    }

    getPurpose(code) {
        let purpose = '';
        if (code === 1) {
            purpose = 'Weight Loss';
        } else if (code === 2) {
            purpose = 'Weight Gain';
        } else if (code === 3) {
            purpose = 'Diet Plan';
        } else if (code === 4) {
            purpose = 'Trekking';
        }
        return purpose;
    }

    getTrainingType(code) {
        let trainingType = '';
        if (code === 1) {
            trainingType = 'Regular';
        } else if (code === 2) {
            trainingType = 'Personal Training';
        } else if (code === 3) {
            trainingType = 'Dance';
        } else if (code === 4) {
            trainingType = 'Yoga';
        } else if (code === 5) {
            trainingType = 'Cross Fit';
        }
        return trainingType;
    }

    getBloodType(code) {
        let blood = '';
        if (code === 1) {
            blood = 'A +';
        } else if (code === 2) {
            blood = 'A -';
        } else if (code === 3) {
            blood = 'B +';
        } else if (code === 4) {
            blood = 'B -';
        } else if (code === 5) {
            blood = 'AB +';
        } else if (code === 6) {
            blood = 'AB -';
        } else if (code === 7) {
            blood = 'O +';
        } else if (code === 8) {
            blood = 'O -';
        }
        return blood;
    }
    getloadCities(citycode: String) {
        this.service.getCities()
            .subscribe((response) => {
                const body = response.json();
                this.getCities = body.data;
                this.city1 = this.getCities.find((item) => item.id === citycode.toString());
                return true;
            });
    }

    onSave(content) {
        // this.openVerticallyCentered(content);
        this.birthday = `${this.datemodel.day}-${this.datemodel.month}-${this.datemodel.year}`;
        if (this.register_form.valid) {
            console.log('here on save');
            const modalref = this.modalService.open(content, { centered: true, size: 'lg' });
            modalref.result.then(() => {
                this.sendData();
            }, () => {
                alert('hi');
            });
        } else {
            alert('Form Filled is in-correct');
        }
    }

    openVerticallyCentered(content) {
        console.log('here on openVertical');
        const modalref = this.modalService.open(content, { centered: true, size: 'lg' });
        modalref.result.then(() => {
            this.sendData();
        }, () => {
            alert('hi');
        });
    }

    sendData() {
        console.log('here on sendData');
        this.formService.post(stringify(this.useremail), stringify(this.username), stringify(this.aadhaar), stringify(this.address),
            stringify(this.citynumber), stringify(this.pincode), stringify(this.mobileNumber), stringify(this.birthday),
            stringify(this.gender), stringify(this.bloodGroup), stringify(this.height), stringify(this.weight),
            stringify(this.purposeNumber), stringify(this.trainingNumber), stringify(this.medicalHistory), stringify(this.previousGym),
            stringify(this.pastProtien))
            .subscribe((response) => {
                console.log(this.mobileNumber);
                const body = response.json();
                if (body.status === 'success') {
                    alert('Submitted successfully');
                    this.gotoBilling(body.id);
                } else {
                    alert('Not Submitted');
                }
            });
    }
    public gotoBilling(user) {
        this.router.navigate(['users/user-billing'], { queryParams: { id: user, username: this.username } });
    }

    public onSelected(event) {
        this.selectedImage = event.target.files[0];
    }
}
