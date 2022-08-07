import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../shared/services/transaction/transaction.service';

@Component({
  selector: 'app-expense-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(private transaction: TransactionService) {}

  transactionList: any = { data: [], paginated: [], isLoading: false };
  selectedExpense: any = { trigger: false, data: {} };

  ngOnInit(): void {
    this.fetchTransactionList();
  }

  // trigger edit / new based on data object
  expenseModal = (obj) => {
    this.selectedExpense = { ...this.selectedExpense, trigger: true, data: {} };
    if (obj) {
      ['type', 'updated_on', 'created_on', 'user_id'].forEach((key) => {
        delete obj[key];
      });
      this.selectedExpense = {
        ...this.selectedExpense,
        data: {
          ...obj,
          date: new Date(obj.date),
          attachment: obj.attachment === 'NULL' ? [] : JSON.parse(obj.attachment),
        },
      };
    }
  };

  // fetch all transactions
  fetchTransactionList = () => {
    this.transactionList.isLoading = true;
    this.transaction.fetchTransactionList({}).then((response) => {
      this.transactionList.isLoading = false;
      if (response.flag && response.result.length) {
        this.transactionList.data = response.result;
      }
    });
  };
}
