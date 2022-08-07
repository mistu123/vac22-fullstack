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
    this.selectedExpense = { trigger: true, data: {} };
    if (obj) {
      this.selectedExpense.data = JSON.parse(JSON.stringify(obj));
      ['type', 'updated_on', 'created_on', 'user_id'].forEach((key) => {
        delete this.selectedExpense.data[key];
      });
    }
  };

  // fetch all transactions
  fetchTransactionList = () => {
    this.transactionList.isLoading = true;
    this.transaction.fetchTransactionList({}).then((response) => {
      this.transactionList.isLoading = false;
      if (response.flag && response.result.length) {
        response.result.forEach((key) => {
          key.date = new Date(key.date);
          key.attachment = key.attachment === 'NULL' ? [] : JSON.parse(key.attachment);
          this.transactionList.data.push(key);
        });
      }
    });
  };

  // update list on event trigger (create/update)
  refreshTransactionList = (data) => {
    if (data.id && this.transactionList.data.length) {
      this.transactionList.data.filter((key, index) => {
        if (key.id === data.id) {
          this.transactionList.data[index] = { ...this.transactionList.data[index], ...data };
        }
      });
    } else {
      this.transactionList.data.push(data);
    }
  };
}
