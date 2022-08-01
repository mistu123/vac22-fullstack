import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category-manage-modal',
  templateUrl: './category-manage-modal.component.html',
  styleUrls: ['./category-manage-modal.component.css'],
})
export class CategoryManageModalComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() selectedSolution: any = { selectedItem: { solutionId: '' }, environmentId: '' };
  @ViewChild('DetailsPanelModal') private solutionDetailsPanelModal: ModalDirective;

  ngOnInit(): void {}

  ngOnChanges(): void {}

  closeModal = () => {
    this.solutionDetailsPanelModal.hide();
  };
}
