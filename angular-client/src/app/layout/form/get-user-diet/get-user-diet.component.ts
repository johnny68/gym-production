import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../form.service';

@Component({
  selector: 'app-get-user-diet',
  templateUrl: './get-user-diet.component.html',
  styleUrls: ['./get-user-diet.component.css'],
  animations: [routerTransition()]
})
export class GetUserDietComponent implements OnInit {
  diet_id;
  username;
  breakfasts: any[];
  breakfast: any[];
  lunches: any[];
  lunch: any[];
  dinners: any[];
  dinner: any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dietService: FormService
  ) { }

  ngOnInit() {
    console.log('here');
    this.activatedRoute
      .queryParams
      .subscribe((params) => {
        this.diet_id = params.diet_id;
        this.username = params.username;
        this.loadDiets(this.diet_id);
      });
  }
  loadDiets(diet_id) {
    console.log(this.diet_id);

    if (diet_id === '1') {
      console.log('here');
      this.dietService.getWeightLoss()
        .subscribe((response) => {
          const body = response.json();
          this.breakfasts = body.data[0].breakfast;
          this.lunches = body.data[0].lunch;
          this.dinners = body.data[0].dinner;
          console.log(this.breakfasts);
        });
    }
  }
  getDay(code) {
    let day = '';
    if (code === '1') {
      day = 'Monday';
    } else if (code === '2') {
      day = 'Tuesday';
    } else if (code === '3') {
      day = 'Wednesday';
    } else if (code === '4') {
      day = 'Thrusday';
    } else if (code === '5') {
      day = 'Friday';
    } else if (code === '6') {
      day = 'Saturday';
    } else if (code === '7') {
      day = 'Sunday';
    }
    return day;
  }
}
