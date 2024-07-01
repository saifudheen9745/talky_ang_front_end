import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../chat/services/local-storage.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {

  const excludedUrls = ['/auth/login']

  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  const headerWithUserToken = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorageService.getItem('userToken')}`
  };

  const clonedReq = req.clone({
    setHeaders: headerWithUserToken
  })
  
  return next(excludedUrls.includes(router.url) ? req : clonedReq).pipe(
    tap(
      (response) => {},
      (error: HttpErrorResponse) => {
        
      },
    ),
  );
}
