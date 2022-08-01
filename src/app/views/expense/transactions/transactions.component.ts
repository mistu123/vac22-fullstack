import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  selectedExpense: any = { trigger: false, data: {} };

  ngOnInit(): void {}

  expenseModal = (obj) => {
    this.selectedExpense = { ...this.selectedExpense, trigger: true, data: {} };
    if (obj) {
      this.selectedExpense = { ...this.selectedExpense, data: obj };
    }
  };
}
