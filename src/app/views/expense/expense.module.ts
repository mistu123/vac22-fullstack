import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseRoutingModule } from './expense-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoryComponent } from './category/category.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [TransactionsComponent, CategoryComponent, DashboardComponent],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    LoadingBarModule,
    FormsModule,
    TooltipModule,
    SharedComponentsModule,
    NgxChartsModule,
  ],
})
export class ExpenseModule {}
