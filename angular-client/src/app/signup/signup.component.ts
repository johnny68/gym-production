import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    admin_Name = '';
    admin_userName = '';
    admin_email = '';
    password = '';
    repeat_password = '';
    formgroup: FormGroup;
    constructor(
        public router: Router,
        private fb: FormBuilder,
        private service: SignupService
    ) {
        this.createForm();
    }
     createForm() {
         this.formgroup = this.fb.group({
            admin_Name: ['', [Validators.required]],
            admin_userName: ['', [Validators.required]],
            admin_email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            repeat_password: ['', [Validators.required]]
         });
     }

    ngOnInit() {}

    onSignup() {

        this.service.createAdmin(this.admin_userName, this.password, this.admin_Name, this.admin_email)
        .subscribe((response) => {
            const body = response.json();
            console.log(body);
            if (body.status === 'success') {
                this.router.navigate(['/login']);
            } else {
                alert('Invalid');
            }
        });
    }
}
