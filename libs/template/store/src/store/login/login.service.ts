import { Injectable } from '@angular/core';
import { environment } from '@store-monorepo/template/environment';
import { HttpService } from '@store-monorepo/template/shared';
import { Observable, map } from 'rxjs';
import { LoginModel } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpService: HttpService) {}

  private apiUrl = `${environment.urlApi}/msx-authn`;

  login(loginInfo: Partial<LoginModel>): Observable<any> {
    return this.httpService

      .post<any>(`${this.apiUrl}/user/login`, { ...loginInfo })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  logout(): Observable<void> {
    return this.httpService.post<void>(`${this.apiUrl}/user/logout`).pipe();
  }
}
