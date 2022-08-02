import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expense-manage-modal',
  templateUrl: './expense-manage-modal.component.html',
  styleUrls: ['./expense-manage-modal.component.css'],
})
export class ExpenseManageModalComponent implements OnInit, OnChanges {
  config: any = { isLoading: false, isEdit: false, bsInlineValue: new Date() };
  @Input() selectedExpense: any = {};
  @ViewChild('expenseManageModal') private expenseManageModal: ModalDirective;

  constructor() {}

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
