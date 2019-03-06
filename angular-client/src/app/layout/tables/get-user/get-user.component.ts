import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserTableService } from '../user.service';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-timeline',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css'],
  animations: [routerTransition()]
})
export class GetUserComponent implements OnInit {
  user: any[];
  name = '';
  username = '';
  user_id = '';
  getCities: any [];
  city;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: UserTableService
  ) { }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe((params) => {
        this.user_id = params.id;
      });
    this.loadUser(this.user_id);
    this.loadName();
  }

  loadName() {
    this.username = localStorage.getItem('user_email');
    this.name = localStorage.getItem('user_name');
  }

  loadUser(user_id) {
    this.service.getSpecific(user_id)
      .subscribe((response) => {
        const body = response.json();
        this.user = body.data;
        this.getCity(this.user[0].user_city);
      });
  }

  loadCities(citycode: String) {
    console.log('inLoad');
    this.service.getCities()
    .subscribe ((response) => {
      const body = response.json();
      this.getCities = body.data;
      this.city = this.getCities.find((item) => item.id === citycode.toString());
      return this.city = this.getCities.find((item) => item.id === citycode.toString());
    });
  }

  getCity(code_city) {
    console.log('here');
    const city = this.loadCities(code_city);
    console.log(city);
  }

  getGender(code) {
    let gender = '';
    if (code === 1) {
      gender = 'Male';
    } else if (code === 2) {
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
    }
    return trainingType;
  }

  onGetBill() {
    this.router.navigate(['users/bills'], {queryParams: {id: this.user_id}});
  }
}
