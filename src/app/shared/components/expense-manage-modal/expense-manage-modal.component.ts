import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expense-manage-modal',
  templateUrl: './expense-manage-modal.component.html',
  styleUrls: ['./expense-manage-modal.component.css'],
})
export class ExpenseManageModalComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() selectedExpense: any = {};
  @ViewChild('expenseManageModal') private expenseManageModal: ModalDirective;

  ngOnInit(): void {
    setTimeout(() => {
      this.expenseManageModal.show();
    }, 100);
  }

  ngOnChanges(): void {
    console.log(this.selectedExpense);
    if (!Object.keys(this.selectedExpense).length) {
      this.expenseManageModal.show();
    }
  }

  closeModal = () => {
    this.expenseManageModal.hide();
  };
}
