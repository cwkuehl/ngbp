import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ApiResponseData, ITbEintrag, RequestConfigModel } from '../models';
import { ExternalApiService } from './external-api.service';
import { Functions } from 'src/app/core/functions';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  cookie: string = '';

  constructor(public externalApiService: ExternalApiService) {}

  list = (date: Date, count: number): Observable<ApiResponseData<Array<ITbEintrag>>> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/diary/list/${Functions.toString(date)}/${count}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApiData<Array<ITbEintrag>>(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as Array<ITbEintrag>) : null,
          error,
        });
      })
    );
  };

  save = (date: Date, entry: string): Observable<ApiResponseData<string>> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/diary/`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        date: `${Functions.toString(date)}`,
        entry: `${entry}`,
      }),
    };
    return this.externalApiService.callExternalApiData<string>(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? '' : null,
          error,
        });
      })
    );
  };

  undo = (): Observable<ApiResponseData<string>> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/diary/undo`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApiData<string>(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? '' : null,
          error,
        });
      })
    );
  };

  redo = (): Observable<ApiResponseData<string>> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/diary/redo`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApiData<string>(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? '' : null,
          error,
        });
      })
    );
  };
}
