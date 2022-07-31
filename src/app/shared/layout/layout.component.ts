import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  config: any = { show: 'register' };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params.show) {
        this.config = params;
      }
    });
  }
}
