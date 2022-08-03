import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseRoutingModule } from './expense-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoryComponent } from './category/category.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [TransactionsComponent, CategoryComponent],
  imports: [CommonModule, ExpenseRoutingModule, LoadingBarModule, FormsModule, TooltipModule, SharedComponentsModule],
})
export class ExpenseModule {}
