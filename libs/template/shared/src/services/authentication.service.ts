import { Injectable } from '@angular/core';
import { environment } from '@store-monorepo/template/environment';
import { Observable, map } from 'rxjs';
import { TokenDataModel } from '../models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpService: HttpService) {}

  private apiUrl = environment.urlApi;

  SwitchToLoginPage() {
    window.location.href = `${environment.host}/dang-nhap`;
  }

  getDataByAccessToken(): Observable<TokenDataModel> {
    return this.httpService
      .getAdmin<TokenDataModel>(`${this.apiUrl}/user/verify-access-token`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  logout() {
    return this.httpService.postAdmin<void>(`${this.apiUrl}/user/logout`);
  }
}
