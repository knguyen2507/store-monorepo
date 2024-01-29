import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  sid!: string;
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, params?: any, options?: any): Observable<T> {
    return this.httpClient
      .get(url, Object.assign({}, options, { params }))
      .pipe(catchError(this.handlerError), map(this.handlerResponse));
  }

  post<T>(url: string, body?: any, options?: any): Observable<T> {
    Notiflix.Loading.standard();
    return this.httpClient.post(url, body, options).pipe(
      catchError(this.handlerError),
      map(this.handlerResponse),
      map((data) => {
        Notiflix.Notify.success('Thao tác thành công');
        Notiflix.Loading.remove();
        return data;
      })
    );
  }

  getAdmin<T>(url: string, params?: any, options?: any): Observable<T> {
    return this.httpClient
      .get(
        url,
        Object.assign({}, options, {
          params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
      )
      .pipe(catchError(this.handlerError), map(this.handlerResponse));
  }

  postAdmin<T>(url: string, body?: any, options?: any): Observable<T> {
    Notiflix.Loading.standard();
    return this.httpClient
      .post(url, body, {
        ...options,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .pipe(
        catchError(this.handlerError),
        map(this.handlerResponse),
        map((data) => {
          Notiflix.Notify.success('Thao tác thành công');
          Notiflix.Loading.remove();
          return data;
        })
      );
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
    Notiflix.Loading.standard();
    return this.httpClient.put(url, body, options).pipe(
      catchError(this.handlerError),
      map(this.handlerResponse),
      map((data) => {
        Notiflix.Notify.success('Thao tác thành công');
        Notiflix.Loading.remove();
        return data;
      })
    );
  }

  delete<T>(url: string, options?: any): Observable<T> {
    Notiflix.Loading.standard();
    return this.httpClient.delete(url, Object.assign({}, options)).pipe(
      catchError(this.handlerError),
      map(this.handlerResponse),
      map((data) => {
        Notiflix.Notify.success('Thao tác thành công');
        Notiflix.Loading.remove();
        return data;
      })
    );
  }

  patch<T>(url: string, body?: any, options?: any): Observable<T> {
    Notiflix.Loading.standard();
    return this.httpClient.patch(url, body, options).pipe(
      catchError(this.handlerError),
      map(this.handlerResponse),
      map((data) => {
        Notiflix.Notify.success('Thao tác thành công');
        Notiflix.Loading.remove();
        return data;
      })
    );
  }

  export<T>(url: string, body?: any, options?: any): Observable<T> {
    return this.httpClient.post(url, body, options).pipe(
      catchError(this.handlerError),
      map(this.handlerResponse),
      map((data) => {
        Notiflix.Notify.success('Thao tác thành công');
        return data;
      })
    );
  }

  private handlerError(err: HttpErrorResponse) {
    if (
      err.status === 400 &&
      err.error?.message &&
      err.error?.message.length > 0
    ) {
      Notiflix.Notify.failure(err.error.message.toString());
    } else if (
      err.status === 401 &&
      err.error?.message &&
      err.error?.message.length > 0
    ) {
      Notiflix.Notify.failure(err.error.message.toString());
    } else if (err.status === 403) {
      Notiflix.Notify.failure('Bạn không có quyền truy cập');
    } else {
      Notiflix.Notify.failure('Thao tác không thành công. Vui lòng thử lại');
    }
    Notiflix.Loading.remove();
    return throwError(() => err);
  }

  private handlerResponse(resApi: any) {
    return resApi;
  }
}
