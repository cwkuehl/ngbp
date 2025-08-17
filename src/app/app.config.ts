import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
// import { AppHttpInterceptor } from 'src/app/core/services/app-http-interceptor';
import { routes } from 'src/app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AppHttpInterceptor,
    //   multi: true,
    // },
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(
      HttpClientModule,
      AuthModule.forRoot({
        ...environment.auth0,
        httpInterceptor: {
          allowedList: [
            `${environment.api.serverUrl}/api/users/login/*`,
            `${environment.api.serverUrl}/api/users`,
            `${environment.api.serverUrl}/api/diary/*`,
            //`${environment.api.serverUrl}/api/*`, // version, health
          ],
        },
      }),
    ),
  ]
};
