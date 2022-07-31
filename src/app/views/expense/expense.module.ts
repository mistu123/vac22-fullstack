import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [DashboardComponent, ManageComponent],
  imports: [CommonModule, ExpenseRoutingModule],
})
export class ExpenseModule {}
