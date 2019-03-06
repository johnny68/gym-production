import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    userName = '';
    password = '';
    angForm: FormGroup;

    constructor(
        public router: Router,
        private fb: FormBuilder,
        private service: LoginService
        ) {
            this.createForm();
    }

    createForm() {
    this.angForm = this.fb.group({
        userName: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
    }

    ngOnInit() {}

    onLoggedin() {

        console.log(this.userName, this.password);
        this.service.login(this.userName, this.password)
        .subscribe((response) => {
            const body = response.json();
            console.log(body);
            if (body.success === 'success') {
                sessionStorage.setItem('isLoggedin', '1');
                localStorage.setItem('admin_username', JSON.stringify(body.data[0].admin_username));
                localStorage.setItem('admin_id', JSON.stringify(body.data[0].admin_id));
                localStorage.setItem('admin_name', JSON.stringify(body.data[0].admin_name));
                this.router.navigate(['/dashboard']);
            } else {
                alert('Invalid Login and Password, Please try again');
                this.router.navigate(['/login']);
            }
        });
    }
}
