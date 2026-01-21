import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

export const loginGuard: CanActivateFn = (route, state) => {

  const isLogin = localStorage.getItem('todoAppToken');
  const isUserData = localStorage.getItem('todoAppUser');
  const router = inject(Router)
  const toast = inject(HotToastService)

  if(isLogin != null || isUserData !=null ) return true 
  else 
    { 
      toast.warning('Login please!')
      router.navigateByUrl('/login');
       return false        
    } 
};
