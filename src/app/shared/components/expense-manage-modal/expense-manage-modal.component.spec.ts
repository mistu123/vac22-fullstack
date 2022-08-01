import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseManageModalComponent } from './expense-manage-modal.component';

describe('ExpenseManageModalComponent', () => {
  let component: ExpenseManageModalComponent;
  let fixture: ComponentFixture<ExpenseManageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseManageModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
