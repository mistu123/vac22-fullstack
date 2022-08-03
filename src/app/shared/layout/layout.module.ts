import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

const components = [LayoutComponent];

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule, BsDropdownModule.forRoot(), ModalModule.forRoot()],
  declarations: components,
  exports: components,
})
export class LayoutModule {}
