import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AppHttpInterceptor:');
    console.log(req);
    // if (!req.headers.has('Set-Cookie')) {
    //req = req.clone({ withCredentials: true,
    //  headers: req.headers.set('Set-Cookie', 'id=pWBPoLcC+KzGFkQjFI9XiaMSg1QSL4noCHEhdPo87XecdyWUyS9I6Jnpz0aU54xxnvSAoC2eNKBAGMCSjsJjbCMUbTka+xaQx+onaGrH; HttpOnly; SameSite=Lax; Secure; Path=/') });
    // }
    // req = req.clone({ withCredentials: true });
    // console.log(req);
    return next.handle(req);
  }
}
