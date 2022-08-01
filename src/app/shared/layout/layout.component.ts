import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../services/util/util.service';
import { AuthService } from '../services/auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private util: UtilService,
    private auth: AuthService
  ) {}

  config: any = { show: 'register', auth: false };
  userDetails: any = {};

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params.show) {
        this.config = params;
      }
      this.getUserDetails();
    });
  }

  // get user details from token
  getUserDetails = () => {
    this.auth.getUserDetails().then((response) => {
      if (response && response.flag) {
        this.userDetails = response;
        this.config = { ...this.config, auth: true };
      }
    });
  };

  // logs out the current user and removes the login data from session
  logout = () => {
    this.util.handleSuccess('You have successfully logged out!');
    this.auth.signOut();
  };
}
