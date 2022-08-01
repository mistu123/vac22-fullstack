import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseRoutingModule } from './expense-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [DashboardComponent, ManageComponent],
  imports: [CommonModule, ExpenseRoutingModule, LoadingBarModule, FormsModule, TooltipModule.forRoot()],
})
export class ExpenseModule {}
