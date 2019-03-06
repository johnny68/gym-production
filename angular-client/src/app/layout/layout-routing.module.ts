import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { GetUserComponent } from './tables/get-user/get-user.component';
import { GetUserBillingComponent } from './form/get-user-billing/get-user-billing.component';
import { GetUserDietComponent } from './form/get-user-diet/get-user-diet.component';
import { GetBillsComponent } from './get-bills/get-bills.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { SendEmailsComponent } from './send-emails/send-emails.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'users', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'users/get', component: GetUserComponent },
            { path: 'users/user-billing', component: GetUserBillingComponent },
            { path: 'users/user-diet', component: GetUserDietComponent },
            { path: 'users/bills', component: GetBillsComponent },
            { path: 'make-payment', component: MakePaymentComponent },
            { path: 'send-email', component: SendEmailsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
