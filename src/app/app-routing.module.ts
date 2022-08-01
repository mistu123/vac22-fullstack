import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthModule } from './views/auth/auth.module';
import { OthersModule } from './views/others/others.module';
import { ExpenseModule } from './views/expense/expense.module';
import { AuthGuard } from './shared/services/auth/auth.guard';

const authRoutes: Routes = [
  {
    path: 'expense',
    loadChildren: () => ExpenseModule,
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: LayoutComponent,
    loadChildren: () => AuthModule,
  },
  {
    path: '',
    children: [
      {
        path: 'others',
        loadChildren: () => OthersModule,
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: authRoutes,
  },
  {
    path: '**',
    redirectTo: 'others/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
