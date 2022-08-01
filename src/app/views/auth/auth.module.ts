import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';

const components = [WelcomeComponent];

@NgModule({
  imports: [CommonModule, FormsModule, AuthRoutingModule, LoadingBarModule],
  declarations: components,
  exports: components,
})
export class AuthModule {}
