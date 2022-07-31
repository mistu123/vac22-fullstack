import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
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
