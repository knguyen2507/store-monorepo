import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { environment } from '@store-monorepo/template/environment';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authnGuard: CanActivateFn = async (): Promise<boolean> => {
  if (environment.guard) return true;
  const saveLocalStorageTokens = (token: string) => {
    localStorage.setItem('accessToken', token);
  };
  const removeLocalStorageTokens = () => {
    localStorage.removeItem('accessToken');
  };

  const token = localStorage.getItem('accessToken') as string;

  const service = inject(AuthenticationService);

  if (token) {
    try {
      const data = await lastValueFrom(service.getDataByAccessToken());
      if (token !== data.accessToken) saveLocalStorageTokens(data.accessToken);
      return true;
    } catch (error) {
      console.error(error);
      removeLocalStorageTokens();
      service.SwitchToLoginPage();
      return false;
    }
  } else {
    removeLocalStorageTokens();
    service.SwitchToLoginPage();
    return false;
  }
};
