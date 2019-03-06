import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { UserTableService } from '../../tables/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';

@Component({
  selector: 'app-get-user-billing',
  templateUrl: './get-user-billing.component.html',
  styleUrls: ['./get-user-billing.component.css'],
  animations: [routerTransition()]

})
export class GetUserBillingComponent implements OnInit {

  user_id;
  username;
  planType: any[];
  plans: any[];
  billing_form: FormGroup;
  planNumber;
  totalAmount;
  payment;
  dueDate;
  sendDueDate;
  payment_method;
  diet_id;

  sendPlanNumber;
  sendPayment;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: UserTableService,
    formBuilder: FormBuilder,
    private billingService: FormService
  ) {
    this.billing_form = formBuilder.group({
      planType: [null, Validators.required],
      payment: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe((params) => {
        this.user_id = params.id;
        this.username = params.username;
      });
    this.loadPlans();
  }

  loadPlans() {
    this.service.getPlans()
      .subscribe((response) => {
        const body = response.json();
        this.plans = body.plansType;
        console.log(this.plans);
      });
  }

  selectedPlan(event) {
    this.planNumber = parseInt(event, 10);
    this.getAmount(this.planNumber);
  }
  getAmount(multiplier) {
    if (multiplier === 1) {
      this.totalAmount = 800;
    } else if (multiplier === 2) {
      this.totalAmount = 1400;
    } else if (multiplier === 3) {
      this.totalAmount = 2000;
    } else if (multiplier === 4) {
      this.totalAmount = 3500;
    } else if (multiplier === 5) {
      this.totalAmount = 7000;
    } else if (multiplier === 6) {
      this.totalAmount = 6000;
    } else if (multiplier === 7) {
      this.totalAmount = 12000;
    } else if (multiplier === 8) {
      this.totalAmount = 15000;
    }
    this.getDueDate(multiplier);
  }

  getDueDate(multiplier) {
    if (multiplier === 1) {
      this.dueDate = 30;
    } else if (multiplier === 2) {
      this.dueDate = 60;
    } else if (multiplier === 3) {
      this.dueDate = 90;
    } else if (multiplier === 4) {
      this.dueDate = 180;
    } else if (multiplier === 5) {
      this.dueDate = 360;
    } else if (multiplier === 6) {
      this.dueDate = 180;
    } else if (multiplier === 7) {
      this.dueDate = 360;
    } else if (multiplier === 8) {
      this.dueDate = 180;
    }
    const today = new Date;
    today.setDate(today.getDate() + this.dueDate);
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.sendDueDate = `${day}-${month + 1}-${year}`;
  }
  onSave() {
    console.log(`${this.sendDueDate} ${this.totalAmount}`);

    this.createBill();
  }
  createBill() {
    console.log(`${this.user_id} ${this.planNumber} ${this.payment_method} ${this.sendDueDate}`);
    this.sendPlanNumber = parseInt(this.planNumber, 10);
    console.log(typeof (this.planNumber));
    this.billingService.firstBill(this.user_id, this.sendPlanNumber, this.sendPayment, this.sendDueDate)
      .subscribe((response) => {
        const body = response.json();
        if (body.status === 'success') {
          alert('Submitted successfully');
          this.service.getSpecific(this.user_id)
            .subscribe((response_user) => {
              const body_user = response_user.json();
              const user = body_user.data;
              this.diet_id = user[0].user_purpose;
              this.gotoDiet(this.diet_id);
            });
        } else {
          alert('Not Submitted');
        }
      });
  }
  getPaymentMethod(event) {
    this.payment_method = event;
    console.log(typeof (this.payment_method));
    this.sendPayment = parseInt(this.payment_method, 10);
  }
  public gotoDiet(diet_id) {
    console.log(diet_id);
    this.router.navigate(['users/user-diet'], {queryParams: {diet_id: diet_id, username: this.username}});
  }
}
