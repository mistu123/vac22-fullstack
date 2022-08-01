import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import { OthersRoutingModule } from './others-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [NotFoundComponent, AccessDeniedComponent],
  imports: [CommonModule, OthersRoutingModule, LottieModule.forRoot({ player: playerFactory })],
})
export class OthersModule {}
