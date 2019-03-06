import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { UserTableService } from './user.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    public users: object[];

    constructor(private router: Router,
        private service: UserTableService) {}

    ngOnInit() {
        this.loadUsers();
    }

    private loadUsers() {
        this.service.get()
        .subscribe((response ) => {
            const body = response.json();
            if (response.status === 200) {
                this.users = body.data;
            }
        });
    }

    public gotoUser(user) {
        localStorage.setItem('user_email', user.user_email);
        localStorage.setItem('user_name', user.user_name);
        this.router.navigate(['users/get'], {queryParams: {id: user.user_id}});
    }
}
