import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../services/category/category.service';
import { UtilService } from '../../services/util/util.service';
import { FileService } from '../../services/file/file.service';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-expense-manage-modal',
  templateUrl: './expense-manage-modal.component.html',
  styleUrls: ['./expense-manage-modal.component.css'],
})
export class ExpenseManageModalComponent implements OnChanges {
  @Input() selectedExpense: any = {};
  @ViewChild('expenseManageModal') private expenseManageModal: ModalDirective;

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

  // fetch category List
  fetchCategoryList = () => {
    this.category.fetchCategoryList({}).then((response) => {
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
      status: true,
      attachment: [],
      files: [],
    };
  };

  // save transaction details
  prepareTransaction = async () => {
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
    console.log(this.transactionDetails);
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
      amount: !/^[0-9]+$/.test(this.transactionDetails.amount),
      selectedCategory: !Object.keys(this.transactionDetails.selectedCategory).length,
    };
    return Object.keys(this.validation).every((k) => !this.validation[k]);
  };
}
