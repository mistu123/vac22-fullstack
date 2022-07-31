import { Component, OnInit } from '@angular/core';
import {
  Router,
  GuardsCheckStart,
  NavigationCancel,
  GuardsCheckEnd,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'expense-tracker';
  config: any = {};

  constructor(private router: Router) {
    /**
     * Angular Router lazy loading
     */
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.config.isLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.config.isLoading = false;
      }
      if (event instanceof GuardsCheckStart) {
        this.config.isLoading = true;
      }
      if (event instanceof GuardsCheckEnd || event instanceof NavigationCancel) {
        this.config.isLoading = false;
      }
    });
  }

  ngOnInit(): void {}
}
