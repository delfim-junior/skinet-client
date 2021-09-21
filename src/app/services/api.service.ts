import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {API_URL, environment} from '../../environments/environment';
import {RequestParam} from '../shared/models/request-param';
import {httpParamsHelper} from '../shared/helpers/httpParamsHelper';

// import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = API_URL;

  constructor(private http: HttpClient) {
  }

  public get<T>(url: string, requestParam: RequestParam = null): Observable<any> {
    if (requestParam !== null) {
      return this.http.get<T>(this.normalizeUrl(url), {params: httpParamsHelper(requestParam)});
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
