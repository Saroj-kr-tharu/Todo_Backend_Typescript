import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const newReq = req.clone({
    headers: req.headers.set('x-access-token', localStorage.getItem('todoAppToken') || '')
  })



  return next(newReq);
};
