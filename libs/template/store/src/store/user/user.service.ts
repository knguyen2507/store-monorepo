import { Injectable } from '@angular/core';
import { environment } from '@store-monorepo/template/environment';

import {
  FindMany,
  HttpService,
  TotalModel,
} from '@store-monorepo/template/shared';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpService) {}

  private apiUrl = environment.urlApi;

  findUserList(pagi?: { offset: number; limit: number }) {
    return this.httpService.getAdmin<FindMany<UserModel>>(
      `${this.apiUrl}/user/find`,
      { ...pagi }
    );
  }

  getTotalUser() {
    return this.httpService.getAdmin<TotalModel>(
      `${this.apiUrl}/user/get-total-user`
    );
  }
}
