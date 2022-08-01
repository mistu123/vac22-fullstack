import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManageModalComponent } from './category-manage-modal.component';

describe('ExpenseManageModalComponent', () => {
  let component: CategoryManageModalComponent;
  let fixture: ComponentFixture<CategoryManageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryManageModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
