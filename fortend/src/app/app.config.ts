import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { routes } from './app.routes';
import { authInterceptor } from './Interceptor/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])),
     provideHotToastConfig(
      {
      duration: 2000 , 
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
      position: 'bottom-center',
    }
     )

  ]
};
