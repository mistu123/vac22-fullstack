import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ExpenseManageModalComponent } from './expense-manage-modal/expense-manage-modal.component';
import { CategoryManageModalComponent } from './category-manage-modal/category-manage-modal.component';

const components = [ExpenseManageModalComponent, CategoryManageModalComponent];

@NgModule({
  imports: [CommonModule, LayoutModule, FormsModule, ModalModule.forRoot()],
  declarations: components,
  exports: components,
})
export class SharedComponentsModule {}
