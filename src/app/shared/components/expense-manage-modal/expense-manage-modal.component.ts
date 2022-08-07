import { Component, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../services/category/category.service';
import { UtilService } from '../../services/util/util.service';
import { FileService } from '../../services/file/file.service';
import { TransactionService } from '../../services/transaction/transaction.service';
import moment from 'moment';

@Component({
  selector: 'app-expense-manage-modal',
  templateUrl: './expense-manage-modal.component.html',
  styleUrls: ['./expense-manage-modal.component.css'],
})
export class ExpenseManageModalComponent implements OnChanges {
  @Input() selectedExpense: any = {};
  @ViewChild('expenseManageModal') private expenseManageModal: ModalDirective;
  @Output() refreshTransactionList: EventEmitter<any> = new EventEmitter<any>();

  transactionDetails: any = {};
  validation: any = {
    description: false,
    selectedCategory: false,
    amount: false,
    date: false,
    status: false,
  };
  categoryList: any = [];
  config: any = { isLoading: false, isEdit: false };

  constructor(
    private category: CategoryService,
    private util: UtilService,
    private file: FileService,
    private transaction: TransactionService
  ) {
    this.resetFormData();
  }

  ngOnChanges(): void {
    if (this.selectedExpense.trigger) {
      this.fetchCategoryList();
      this.config.isEdit = !!this.selectedExpense.data.category_id; // true / false
      if (this.config.isEdit) {
        this.transactionDetails = {
          ...this.transactionDetails,
          ...JSON.parse(JSON.stringify(this.selectedExpense.data)),
        };
      }
      this.expenseManageModal.show();
    }
  }

  // fetch category List
  fetchCategoryList = () => {
    this.category.fetchCategoryList({ status: 1 }).then((response) => {
      if (response.flag && response.result.length) {
        this.categoryList = response.result;
        this.categoryList.forEach((category) => {
          if (category.id === this.transactionDetails.category_id) {
            this.transactionDetails.selectedCategory = category;
          }
        });
      }
    });
  };

  closeModal = () => {
    this.resetFormData();
    this.expenseManageModal.hide();
  };

  // reset form data
  resetFormData = () => {
    this.transactionDetails = {
      description: '',
      selectedCategory: {},
      amount: '',
      date: new Date(),
      status: 1,
      attachment: [],
      files: [],
    };
  };

  // save transaction details
  prepareTransaction = () => {
    if (this.checkValidation()) {
      if (this.transactionDetails.files.length) {
        this.uploadFiles().then(() => {
          this.transactionDetails.attachment = this.transactionDetails.attachment.concat(this.transactionDetails.files);
          this.transactionDetails.files = [];
          this.saveTransactionDetails();
        });
      } else {
        this.saveTransactionDetails();
      }
    }
  };

  saveTransactionDetails = () => {
    const request = {
      amount: this.transactionDetails.amount,
      description: this.transactionDetails.description,
      categoryId: this.transactionDetails.selectedCategory.id,
      date: moment(this.transactionDetails.date).format('YYYY-MM-DD'),
      attachment: JSON.stringify(this.transactionDetails.attachment),
    };
    if (this.config.isEdit) {
      request['id'] = this.transactionDetails.id;
    }
    this.transaction.manageTransactionDetails(request).then((response) => {
      if (response.flag) {
        delete request['categoryId'];
        this.refreshTransactionList.emit({
          ...request,
          attachment: this.transactionDetails.attachment,
          id: this.transactionDetails.id || response.result.insertId,
          name: this.transactionDetails.selectedCategory.name,
          type: this.transactionDetails.selectedCategory.type,
          category_id: this.transactionDetails.selectedCategory.id,
        });
        this.closeModal();
      } else {
        this.util.handleError(response.message);
      }
    });
  };

  // upload files
  uploadFiles = async () => {
    const promiseList = [];
    this.transactionDetails.files.forEach((key, index) => {
      const sendRequest = this.file.fileUploader(this.transactionDetails.files[index]);
      promiseList.push(sendRequest);
    });
    return await Promise.all(promiseList).then(async (responseArray) => {
      responseArray.forEach((key, index) => {
        this.transactionDetails.files[index] = {
          ...this.transactionDetails.files[index],
          fileUrl: key.resourceObject,
          name: this.transactionDetails.files[index].name,
          type: this.transactionDetails.files[index].type,
        };
      });
      return await this.transactionDetails.attachment;
    });
  };

  // handle file input on browse button click
  handleFileInput = (event) => {
    if (event.target.files.length) {
      this.transactionDetails.files = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.transactionDetails.files.push(event.target.files[i]);
        this.transactionDetails.files[i]._size = this.util.fileSizeFormatter(this.transactionDetails.files[i].size);
      }
    }
  };

  // Validation checker of input elements
  checkValidation = () => {
    this.validation = {
      ...this.validation,
      description: !(this.transactionDetails['description'].trim().length > 0),
      amount: !this.util.IsNumeric(this.transactionDetails.amount),
      selectedCategory: !Object.keys(this.transactionDetails.selectedCategory).length,
    };
    return Object.keys(this.validation).every((k) => !this.validation[k]);
  };
}
