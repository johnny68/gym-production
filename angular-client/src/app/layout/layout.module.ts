import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { GetUserComponent } from './tables/get-user/get-user.component';
import { PageHeaderModule } from '../shared';
import { GetUserBillingComponent } from './form/get-user-billing/get-user-billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetUserDietComponent } from './form/get-user-diet/get-user-diet.component';
import { GetBillsComponent } from './get-bills/get-bills.component';
import { WebcamModule } from 'ngx-webcam';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { SendEmailsComponent } from './send-emails/send-emails.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        WebcamModule,
        NgbModule,
        NgxPaginationModule
    ],
    declarations: [LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        GetUserComponent,
        GetUserBillingComponent,
        GetUserDietComponent,
        GetBillsComponent,
        MakePaymentComponent,
        SendEmailsComponent
    ],
    exports: [PageHeaderModule]
})
export class LayoutModule { }
