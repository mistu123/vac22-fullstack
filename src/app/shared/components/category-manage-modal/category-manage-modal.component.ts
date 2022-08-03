import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../services/category/category.service';
import { UtilService } from '../../services/util/util.service';

@Component({
  selector: 'app-category-manage-modal',
  templateUrl: './category-manage-modal.component.html',
  styleUrls: ['./category-manage-modal.component.css'],
})
export class CategoryManageModalComponent implements OnInit, OnChanges {
  config: any = { isLoading: false, isEdit: false };
  categoryDetails: any = { name: '', type: '', id: '', description: '', status: true };
  @Input() selectedCategory: any = {};
  @Output() refreshCategoryList: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('categoryManageModal') private categoryManageModal: ModalDirective;

  constructor(private category: CategoryService, private util: UtilService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedCategory.trigger) {
      this.config.isEdit = Object.keys(this.selectedCategory.data).length;
      if (this.selectedCategory.data.id) {
        this.categoryDetails = JSON.parse(JSON.stringify(this.selectedCategory.data));
      }
      this.categoryManageModal.show();
    }
  }

  // close modal on 'x' click
  closeModal = () => {
    this.categoryManageModal.hide();
  };

  // submit changes
  manageCategory = () => {
    if (!this.categoryDetails.id) {
      delete this.categoryDetails.id;
    }
    this.categoryDetails.status = this.categoryDetails.status ? 1 : 0;
    this.category.manageCategory(this.categoryDetails).then((response) => {
      if (response.flag) {
        if (response.result.insertId) {
          this.categoryDetails = { ...this.categoryDetails, id: response.result.insertId };
        }
        this.refreshCategoryList.emit(this.categoryDetails);
        this.util.handleSuccess(response.message);
        this.categoryDetails = { name: '', type: '', id: '', description: '', status: true };
        this.closeModal();
      }
    });
  };
}
