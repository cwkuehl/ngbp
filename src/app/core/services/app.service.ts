import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ApiResponseData, ITbEintrag, RequestConfigModel } from '../models';
import { ExternalApiService } from './external-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  cookie: string = '';

  constructor(public externalApiService: ExternalApiService) {}

  version = (): Observable<ApiResponseData<string>> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/version`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApiData<string>(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as string) : null,
          error,
        });
      })
    );
  };

  health = (): Observable<ApiResponseData<string>> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/health`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApiData<string>(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as string) : "health check ok",
          error,
        });
      })
    );
  };
}
