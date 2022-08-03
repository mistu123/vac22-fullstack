import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category-manage-modal',
  templateUrl: './category-manage-modal.component.html',
  styleUrls: ['./category-manage-modal.component.css'],
})
export class CategoryManageModalComponent implements OnInit, OnChanges {
  config: any = { isLoading: false, isEdit: false };
  @Input() selectedCategory: any = {};
  @ViewChild('categoryManageModal') private categoryManageModal: ModalDirective;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedCategory.trigger) {
      this.config.isEdit = Object.keys(this.selectedCategory.data).length;
      this.categoryManageModal.show();
    }
  }

  closeModal = () => {
    this.categoryManageModal.hide();
  };
}
