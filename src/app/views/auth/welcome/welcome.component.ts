import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingBar: LoadingBarService,
    private auth: AuthService
  ) {
    // checking if user session exists
    if (this.auth.checkAuth()) {
      this.router.navigate(['/expense']);
    }
  }

  config: any = { show: 'register', isLoading: false };
  formData: any = { name: '', email: '', password: '' };
  validation: any = { name: false, email: false, password: false };

  ngOnInit(): void {
    // checking query param
    this.route.queryParams.subscribe((params) => {
      if (params && params.show) {
        this.formData.name = '';
        this.config = params;
      }
    });
  }

  // function to do login/register based on form data
  authSubmit = () => {
    if (this.checkValidation()) {
      if (this.config.show === 'register') {
        this.loadingBar.useRef().start();
        this.config = { ...this.config, isLoading: true };
        // calling register api service
        this.auth.register(this.formData).then((response) => {
          if (response && response.flag) {
            this.userLogin();
          }
          this.config = { ...this.config, isLoading: false };
          this.loadingBar.useRef().complete();
        });
      } else {
        this.userLogin();
      }
    }
  };

  // login user
  userLogin = () => {
    this.config = { ...this.config, isLoading: true };
    this.loadingBar.useRef().start();
    // calling login api service
    this.auth.login({ email: this.formData.email, password: this.formData.password }).then((response) => {
      this.config = { ...this.config, isLoading: false };
      this.loadingBar.useRef().complete();
      if (response && response.flag && response.accessToken) {
        this.auth.setToken(response.accessToken).then(() => {
          this.router.navigate(['/expense']);
          // location.reload();
        });
      }
    });
  };

  // Validation checker of input elements
  checkValidation = () => {
    this.validation = {
      ...this.validation,
      name: !(
        (this.formData['name'].trim().length > 0 && this.config.show === 'register') ||
        (!this.formData['name'].trim().length && this.config.show === 'login')
      ),
      email: !(
        this.formData.email.trim().length > 0 &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)
      ),
      password: !(this.formData.password.trim().length >= 6),
    };
    return Object.keys(this.validation).every((k) => !this.validation[k]);
  };
}
