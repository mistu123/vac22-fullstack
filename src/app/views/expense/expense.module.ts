import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseRoutingModule } from './expense-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  declarations: [DashboardComponent, ManageComponent],
  imports: [CommonModule, ExpenseRoutingModule, LoadingBarModule, FormsModule],
})
export class ExpenseModule {}
