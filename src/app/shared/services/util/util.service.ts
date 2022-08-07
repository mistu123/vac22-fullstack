import { Injectable, Inject } from '@angular/core';
import Toastify from 'toastify-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(public router: Router) {}

  /**
   * Toaster display utility service (Error)
   */
  public handleError(error: any): any {
    if (!error) {
      error = 'Something went wrong. Requested action could not be completed. Please try again later.';
    }
    Toastify({
      text: error,
      duration: 3000,
      close: true,
      // destination: 'https://github.com/apvarun/toastify-js',
      newWindow: true,
      // avatar: 'https://cdn-icons-png.flaticon.com/512/753/753345.png',
      gravity: 'bottom',
      position: 'right',
      className: 'danger shadow-lg font-weight-bolder animate__animated animate__bounceInRight text--size-15',
      stopOnFocus: true,
      style: { padding: '30px' },
      onClick(): any {},
    }).showToast();
  }

  /**
   * Toaster display utility service (Success)
   */
  public handleSuccess(success: any): any {
    Toastify({
      text: success,
      duration: 3000,
      close: true,
      // avatar: 'assets/images/success-sign.png',
      gravity: 'bottom',
      position: 'right',
      className: 'success shadow-lg font-weight-bolder animate__animated animate__bounceInRight text--size-15',
      stopOnFocus: true,
      style: { padding: '30px' },
      onClick(): any {},
    }).showToast();
  }

  /**
   * Toaster display utility service (Warning)
   */
  public handleWarning(warning: any): any {
    Toastify({
      text: warning,
      duration: 3000,
      close: true,
      // avatar: 'assets/images/warning-sign.png',
      gravity: 'bottom',
      position: 'right',
      className: 'warning shadow-lg font-weight-bolder animate__animated animate__bounceInRight text--size-15',
      stopOnFocus: true,
      style: { padding: '30px' },
      onClick(): any {},
    }).showToast();
  }

  /**
   * Toaster display utility service (Info)
   */
  /**
   * Toaster display utility service (Warning)
   */
  public handleInfo(info: any): any {
    Toastify({
      text: info,
      duration: 3000,
      close: true,
      // avatar: 'assets/images/info.png',
      gravity: 'bottom',
      position: 'right',
      className: 'info shadow-lg font-weight-bolder animate__animated animate__bounceInRight text--size-15',
      stopOnFocus: true,
      onClick(): any {},
      style: { padding: '30px' },
    }).showToast();
  }

  /**
   * Toaster display utility service (Error)
   */
  public handleLogout(): any {
    Toastify({
      text: 'Credentials has been expired. Redirecting to login..',
      duration: 1500,
      close: true,
      gravity: 'bottom',
      position: 'center',
      className: 'danger shadow-lg font-weight-bold animate__animated animate__bounceInRight p-5',
      stopOnFocus: true,
      onClick(): any {},
    }).showToast();
  }

  /**
   * Sort Array Data in descending by key
   */
  public sortArrayByKey(dataArray, key): any {
    return dataArray.sort(function (a, b) {
      return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;
    });
  }

  /**
   * File Size Formatter
   */
  public fileSizeFormatter(bytes, decimals = 2): any {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public IsNumeric(input): any {
    return input - 0 == input && ('' + input).trim().length > 0;
  }
}
