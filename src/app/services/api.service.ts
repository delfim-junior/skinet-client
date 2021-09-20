import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {API_URL, environment} from '../../environments/environment';
import {Pagination} from '../shared/models/pagination';

// import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = API_URL;

  constructor(private http: HttpClient) {
  }

  public get<T>(url: string, pagination: Pagination = null): Observable<any> {
    /*const token = 'Bearer ' + localStorage.getItem('token');
    const options = {      headers: new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json'),    };
*/
    if (pagination !== null) {
      const params = new HttpParams()
        .set('pageSize', pagination.pageSize.toString())
        .set('pageIndex', pagination.pageIndex.toString());

      return this.http.get<T>(this.normalizeUrl(url), {params});
    }
    return this.http.get<T>(this.normalizeUrl(url));
  }

  public post<T>(url: string, data): Observable<any> {
    return this.http.post<T>(this.normalizeUrl(url), data);
  }

  public put<T>(url: string, data): Observable<any> {
    return this.http.put<T>(this.normalizeUrl(url), data);
  }

  public delete<T>(url: string): Observable<any> {
    return this.http.delete<T>(this.normalizeUrl(url));
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return throwError(error.json() || 'Server error');
  }

  private normalizeUrl(url: string): string {
    if (/^https?:\/\//.test(url)) {
      return url;
    }
    return `${this.API_URL}${url}`;
  }
}
