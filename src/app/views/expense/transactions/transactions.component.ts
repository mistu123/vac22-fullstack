import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../shared/services/transaction/transaction.service';

@Component({
  selector: 'app-expense-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(private transaction: TransactionService) {}

  transactionList: any = [];
  selectedExpense: any = { trigger: false, data: {} };

  ngOnInit(): void {
    this.fetchTransactionList();
  }

  // trigger edit / new based on data object
  expenseModal = (obj) => {
    this.selectedExpense = { ...this.selectedExpense, trigger: true, data: {} };
    if (obj) {
      this.selectedExpense = { ...this.selectedExpense, data: obj };
    }
  };

  // fetch all transactions
  fetchTransactionList = () => {
    this.transaction.fetchTransactionList({}).then((response) => {
      if (response.flag && response.result.length) {
        this.transactionList = response.result;
      }
    });
  };
}
