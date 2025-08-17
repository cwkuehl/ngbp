import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ApiResponseModel, MessageModel, RequestConfigModel } from '../models';
import { ExternalApiService } from './external-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cookie: string = '';

  constructor(public externalApiService: ExternalApiService) {}

  // login = (clientid: string, userid: string): Observable<ApiResponseModel> => {
  //   const config: RequestConfigModel = {
  //     url: `${env.api.serverUrl}/api/users/login/${clientid}/${userid}`,
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   };
  //   return this.externalApiService.callExternalApi(config).pipe(
  //     mergeMap((response) => {
  //       const { data, error } = response;
  //       return of({
  //         data: data ? (data as MessageModel) : null,
  //         error,
  //       });
  //     })
  //   );
  // };

  getUserListWo = (): Observable<ApiResponseModel> => {
    // Without session or permission
    const config: RequestConfigModel = {
      //url: `${env.api.serverUrl}/api/messages/public`,
      url: `${env.api.serverUrl}/api/users/wo`,
      //url: `${env.api.serverUrl}/api/users/u`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as MessageModel) : null,
          error,
        });
      })
    );
  };

  // getUserList = (): Observable<ApiResponseModel> => {
  //   const config: RequestConfigModel = {
  //     url: `${env.api.serverUrl}/api/users`,
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   };
  //   return this.externalApiService.callExternalApi(config).pipe(
  //     mergeMap((response) => {
  //       const { data, error } = response;
  //       return of({
  //         data: data ? (data as MessageModel) : null,
  //         error,
  //       });
  //     })
  //   );
  // };
}
