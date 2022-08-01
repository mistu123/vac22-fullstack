import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expense-manage-modal',
  templateUrl: './expense-manage-modal.component.html',
  styleUrls: ['./expense-manage-modal.component.css'],
})
export class ExpenseManageModalComponent implements OnInit, OnChanges {
  constructor() {}

  config: any = { isLoading: false, isEdit: false };
  @Input() selectedExpense: any = {};
  @ViewChild('expenseManageModal') private expenseManageModal: ModalDirective;

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedExpense.trigger) {
      this.config.isEdit = Object.keys(this.selectedExpense.data).length;
      this.expenseManageModal.show();
    }
  }

  closeModal = () => {
    this.expenseManageModal.hide();
  };
}
