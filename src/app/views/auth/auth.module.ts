import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';

const components = [WelcomeComponent];

@NgModule({
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  declarations: components,
  exports: components,
})
export class AuthModule {}
