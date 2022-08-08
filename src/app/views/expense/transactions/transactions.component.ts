import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../shared/services/transaction/transaction.service';
import moment from 'moment';
import { UtilService } from '../../../shared/services/util/util.service';

@Component({
  selector: 'app-expense-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(private transaction: TransactionService, private util: UtilService) {}

  moment: any = moment;
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
    if (this.transactionList.data.length) {
      const filterResult = this.transactionList.data.filter((key) => key.id === data.id);
      if (filterResult.length) {
        const findIndex = this.transactionList.data.indexOf(filterResult[0]);
        this.transactionList.data[findIndex] = { ...this.transactionList.data[findIndex], ...data };
      } else {
        this.transactionList.data.push(data);
      }
    } else {
      this.transactionList.data.push(data);
    }
  };

  // delete a transaction
  deleteTransaction = (transaction) => {
    this.transactionList.data.filter((key, index) => {
      if (key.id === transaction.id) {
        this.transaction.deleteTransaction({ id: transaction.id }).then((response) => {
          if (response.flag) {
            this.transactionList.data.splice(index, 1);
            this.util.handleSuccess(response.message);
          }
        });
      }
    });
  };
}
