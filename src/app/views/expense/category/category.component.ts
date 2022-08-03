import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { UtilService } from '../../../shared/services/util/util.service';

@Component({
  selector: 'app-expense-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  selectedCategory: any = { trigger: false, data: {} };
  categoryList: any = [];

  constructor(private category: CategoryService, private util: UtilService) {}

  ngOnInit(): void {
    this.fetchCategoryList();
  }

  // trigger category modal to open
  categoryModal = (obj) => {
    this.selectedCategory = { ...this.selectedCategory, trigger: true, data: {} };
    if (obj) {
      this.selectedCategory = { ...this.selectedCategory, data: obj };
    }
  };

  // fetch category List
  fetchCategoryList = () => {
    this.category.fetchCategoryList({}).then((response) => {
      if (response.flag && response.result.length) {
        this.categoryList = this.util.sortArrayByKey(response.result, 'created_on');
      }
    });
  };

  // update list on event trigger (create/update)
  refreshCategoryList = (data) => {
    if (data.id && this.categoryList.length) {
      this.categoryList.filter((key, index) => {
        if (key.id === data.id) {
          this.categoryList[index] = data;
        }
      });
    } else {
      this.categoryList.push(data);
    }
  };
}
