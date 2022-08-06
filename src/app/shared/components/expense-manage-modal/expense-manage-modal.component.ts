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
        this.categoryList = this.util.sortArrayByKey(response.result, 'created_on');
        this.config.isEdit = !!this.selectedExpense.data.category_id; // true / false
        if (this.config.isEdit) {
          this.transactionDetails = JSON.parse(
            JSON.stringify({
              ...this.selectedExpense.data,
              date: new Date(this.selectedExpense.data.date),
              attachment:
                this.selectedExpense.data.attachment !== 'NULL' && this.selectedExpense.data.attachment.length
                  ? this.selectedExpense.data.attachment
                  : [],
            })
          );

          this.categoryList.forEach((category) => {
            if (category.id === this.transactionDetails.category_id) {
              this.transactionDetails.selectedCategory = category;
            }
          });

          let deleteKeys = ['category_id', 'type', 'updated_on', 'created_on', 'user_id'];
          deleteKeys.forEach((key) => {
            delete this.transactionDetails[key];
          });
        }
      }
    });
  };

  ngOnChanges(): void {
    if (this.selectedExpense.trigger) {
      this.resetFormData();
      this.fetchCategoryList();
      this.expenseManageModal.show();
    }
  }

  closeModal = () => {
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
    };
  };

  // save transaction details
  prepareTransaction = async () => {
    if (this.checkValidation()) {
      if (this.transactionDetails.attachment.length) {
        this.uploadFiles().then(() => {
          this.saveTransactionDetails();
        });
      } else {
        this.saveTransactionDetails();
      }
    }
  };

  saveTransactionDetails = () => {
    this.transactionDetails = {
      ...this.transactionDetails,
      files: JSON.stringify(this.transactionDetails.attachment),
    };
    console.log(this.transactionDetails);
  };

  // upload files
  uploadFiles = async () => {
    const promiseList = [];
    this.transactionDetails.attachment.forEach((key, index) => {
      const sendRequest = this.file.fileUploader(this.transactionDetails.attachment[index]);
      promiseList.push(sendRequest);
    });
    return await Promise.all(promiseList).then(async (responseArray) => {
      responseArray.forEach((key, index) => {
        this.transactionDetails.attachment[index] = {
          fileUrl: key.resourceObject,
          type: this.transactionDetails.attachment[index].type,
          name: this.transactionDetails.attachment[index].name,
        };
      });
      return await this.transactionDetails.attachment;
    });
  };

  // handle file input on browse button click
  handleFileInput = (event) => {
    if (event.target.files.length) {
      this.transactionDetails.attachment = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.transactionDetails.attachment.push(event.target.files[i]);
        this.transactionDetails.attachment[i]._size = this.util.fileSizeFormatter(
          this.transactionDetails.attachment[i].size
        );
      }
    }
  };

  // Validation checker of input elements
  checkValidation = () => {
    this.validation = {
      ...this.validation,
      description: !this.transactionDetails['description'].trim().length,
      date: !this.transactionDetails.date,
      amount: !this.transactionDetails.amount.trim().length,
      selectCategory: !Object.keys(this.transactionDetails.selectedCategory).length,
    };
    return Object.keys(this.validation).every((k) => !this.validation[k]);
  };
}
