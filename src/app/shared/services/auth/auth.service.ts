import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;
  userDetails: any = {};

  constructor(private router: Router, private http: HttpClient, private util: UtilService) {
    this.checkAuth();
  }

  /**
   * Check status if current user is logged in or not
   */
  checkAuth(): boolean {
    // Get token from localstorage
    const token = localStorage.getItem('user_auth');
    // Check to see if token exists, if not return false
    if (!token) {
      return false;
    }

    // Decode token and get expiration date
    const decoded = jwt_decode(token);
    const date = decoded['exp'];

    // check if expiration is less than current time, if so return true
    return date > Date.now() / 1000;
  }

  /**
   * Return authToken saved in localstorage
   */
  getToken = () => {
    if (this.checkStorageData()) {
      const token = jwt_decode(localStorage.getItem('user_auth'));
      if (token && Object.keys(token).length && token['exp'] < Date.now() / 1000) {
        this.signOut();
      }
      return localStorage.getItem('user_auth');
    }
    return false;
  };

  /**
   * Promise Return authToken set in localstorage
   */
  async setToken(token): Promise<any> {
    return await localStorage.setItem('user_auth', token);
  }

  /**
   * Promise Return check storage item (user_auth)
   */
  checkStorageData() {
    return !!localStorage.getItem('user_auth');
  }

  /**
   * Signing out user by destroying session cookie
   */
  signOut = () => {
    this.authenticated = false;
    localStorage.clear();
    // this.util.handleSuccess('You have successfully logged out!');
    this.router.navigate(['/']);
  };

  /**
   * Return formatted current user object stored in cookie
   */
  async getUserDetails(): Promise<any> {
    if (localStorage.getItem('user_auth')) {
      const token = localStorage.getItem('user_auth');
      this.userDetails = jwt_decode(token);
      this.userDetails = {
        ...this.userDetails,
        flag: true,
      };
      return await this.userDetails;
    } else {
      this.signOut();
    }
  }

  /**
   * User Login API
   */
  async login(request): Promise<any> {
    return this.http
      .post(environment.apiUrl + '/user/login', request)
      .toPromise()
      .then((response) => {
        response['flag'] = response['status'] === 200;
        if (!response['flag']) {
          this.util.handleError(response['message']);
          return response;
        }
        return response;
      })
      .catch((error) => {
        this.util.handleError(error.error.message);
      });
  }

  /**
   * User Register API
   */
  async register(request): Promise<any> {
    return this.http
      .post(environment.apiUrl + '/user/register', request)
      .toPromise()
      .then((response) => {
        response['flag'] = response['status'] === 200;
        if (!response['flag']) {
          this.util.handleError(response['message']);
          return response;
        }
        return response;
      })
      .catch((error) => {
        this.util.handleError(error.error.message);
      });
  }
}
