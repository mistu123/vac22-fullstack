import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private util: UtilService) {}

  /**
   * Manage Category (Add / Edit)
   */
  async manageCategory(request): Promise<any> {
    return this.http
      .post(environment.apiUrl + '/category/manage', request)
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
   * Manage Category (Add / Edit)
   */
  async fetchCategoryList(request): Promise<any> {
    return this.http
      .post(environment.apiUrl + '/category/list', request)
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
