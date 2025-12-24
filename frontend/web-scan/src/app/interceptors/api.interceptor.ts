import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const API_URL = 'http://localhost:3000/api';

  const apiReq = req.clone({
    url: `${API_URL}${req.url}`,
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(apiReq);
};
