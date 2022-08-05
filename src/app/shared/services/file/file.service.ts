import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient, private util: UtilService) {}

  /**
   * Return file Upload Response (S3 Bucket) <Metadata>
   */
  async fileUploader(file): Promise<any> {
    const data = new FormData();
    data.append('file', file);
    return this.http
      .post(environment.apiUrl + '/file/upload', data)
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
        this.util.handleError(error.message);
      });
  }
}
