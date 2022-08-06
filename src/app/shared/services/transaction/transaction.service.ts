import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private util: UtilService, private http: HttpClient) {}

  /**
   * Fetch Transaction (List)
   */
  async fetchTransactionList(request): Promise<any> {
    return this.http
      .post(environment.apiUrl + '/transaction/list', request)
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
   * Manage Transaction (Add / Edit)
   */
  async manageTransactionDetails(request): Promise<any> {
    return this.http
      .post(environment.apiUrl + '/transaction/manage', request)
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
