import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetBillsService } from '../tables/get-user/get-bills.service';

@Component({
  selector: 'app-get-bills',
  templateUrl: './get-bills.component.html',
  styleUrls: ['./get-bills.component.css']
})
export class GetBillsComponent implements OnInit {
  user_id = '';
  data: any[];
  user_plan_number = '';
  user_join_date = '';
  user_due_date = '';
  user_bills: any[];
  billing_times: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: GetBillsService) { }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe((params) => {
        this.user_id = params.id;
      });
    this.service.getSpecific(this.user_id)
      .subscribe((response) => {
        const body = response.json();
        this.data = body.data;
        console.log(this.data);
      }, (error) => {
        console.log(error);
      }, () => {
        this.updateValues();
      });
  }
  updateValues() {
    this.user_plan_number = this.data[0][0].user_plan;
    this.user_join_date = this.data[0][0].user_join_date;
    this.user_due_date = this.data[0][0].user_due_date;
  }

  getPlan(code) {
    let plan = '';
    if (code === 1) {
      plan = 'Monthly Membership';
    } else if (code === 2) {
      plan = '2 - Monthly Membership';
    } else if (code === 3) {
      plan = '3 - Monthly Membership';
    } else if (code === 4) {
      plan = 'Bi-Annual Membership (6 Months)';
    } else if (code === 5) {
      plan = 'Yearly Membership (12 Months)';
    } else if (code === 6) {
      plan = `Couple's Bi-Annual Membership`;
    } else if (code === 7) {
      plan = `Couple's Annual Membership`;
    } else if (code === 8) {
      plan = 'Group of 5 Members';
    }
    return plan;
  }
}
