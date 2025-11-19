import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth'; 

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
  
  //  Get the token from the service
  const token = authService.getToken();

  //  If a token exists, clone the request and add the header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` 
      }
    });
    //  Send the *new* (cloned) request
    return next(clonedRequest);
  }

  // If no token, send the original request
  return next(req);
};