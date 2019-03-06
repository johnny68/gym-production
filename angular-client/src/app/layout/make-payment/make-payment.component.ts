import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MakePaymentService } from './make-payment.service';
import { GetBillsService } from '../tables/get-user/get-bills.service';
import { UserTableService } from '../tables/user.service';


@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  value = '';
  months;
  datas;
  rowsControls = [];
  totalAmount;
  user_id;
  sendDueDate;
  dueDate;
  previousDueDate;
  dueDateData;
  constructor(
    private service: MakePaymentService,
    private router: Router,
    private billService: GetBillsService,
    private users: UserTableService) { }

  ngOnInit() {
    this.users.get()
    .subscribe((response) => {
      const body = response.json();
      this.datas = body.data;
      console.log(this.datas);
    }, (error) => {
      console.log(error);
    }, () => {
      this.datas.forEach(element => {
        this.rowsControls.push({
          isCollapsed: true
        });
      });
    });
  }

  onEnter(value: string) {
    this.search(value);
  }
  search(value: string) {
    this.service.search(value)
      .subscribe((response) => {
        const body = response.json();
        this.datas = body.data;
        console.log(this.datas);
      }, (error) => {
        console.log(error);
      }, () => {
        this.datas.forEach(element => {
          this.rowsControls.push({
            isCollapsed: true
          });
        });
      });
  }
  gotoUser(user) {
    this.user_id = user.user_id;
    this.billService.getSpecific(this.user_id)
      .subscribe((response) => {
        const body = response.json();
        this.dueDateData = body.data;
        this.previousDueDate = this.dueDateData[0][0].user_due_date;
      }, (error) => {

      }, () => {
      });

  }
  getAmount(multiplier) {
    console.log(multiplier);
    if (multiplier === '1') {
      this.totalAmount = 800;
    } else if (multiplier === '2') {
      this.totalAmount = 1400;
    } else if (multiplier === '3') {
      this.totalAmount = 2000;
    } else if (multiplier === '6') {
      this.totalAmount = 3500;
    } else if (multiplier === '12') {
      this.totalAmount = 7000;
    }
    this.getDueDate(multiplier);
  }

  getDueDate(multiplier) {
    if (multiplier === '1') {
      this.dueDate = 30;
    } else if (multiplier === '2') {
      this.dueDate = 60;
    } else if (multiplier === '3') {
      this.dueDate = 90;
    } else if (multiplier === '6') {
      this.dueDate = 180;
    } else if (multiplier === '12') {
      this.dueDate = 360;
    }

    const today = new Date(this.previousDueDate);
    today.setDate(today.getDate() + this.dueDate);
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.sendDueDate = `${day}-${month + 1}-${year}`;
    console.log(this.sendDueDate);
  }

  onSave() {
    console.log(this.totalAmount);
    console.log(this.user_id);
    console.log(this.months);
    console.log(this.sendDueDate);
    this.service.bill_payment(parseInt(this.user_id, 10), 1, 1, this.sendDueDate)
      .subscribe((response) => {
        console.log(response.json());
      }, (error) => {
        console.log(error.json());
      }, () => {
        this.router.navigateByUrl('users', { skipLocationChange: true }).then(() =>
          this.router.navigate(['make-payment']));
      });
  }
}
