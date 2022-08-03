import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  selectedCategory: any = { trigger: false, data: {} };

  constructor() {}

  ngOnInit(): void {}

  categoryModal = (obj) => {
    this.selectedCategory = { ...this.selectedCategory, trigger: true, data: {} };
    if (obj) {
      this.selectedCategory = { ...this.selectedCategory, data: obj };
    }
  };
}
