import { provideAnimations } from '@angular/platform-browser/animations';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_Route } from './app/app.route';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AuthInterceptorService } from './app/services/auth-interceptor/auth-interceptor.service';
import { provideToastr } from 'ngx-toastr';
import { CustomerServiceService } from './app/services/customer-service/customer-service.service';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent,
   {
  providers: [
    provideRouter(APP_Route), 
    importProvidersFrom(HttpClientModule),
    CustomerServiceService,
    provideToastr(),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi(),
  ),
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
  },
  
  ]
}).catch(err => console.error(err))