import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DateComponent } from 'src/app/shared/components/date.component';
import { Functions } from 'src/app/core/functions';
import { AppService } from 'src/app/core/services';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DateComponent],
  template: `
  <p class="subtitle">Home</p>
  <div class="columns">
    <div class="column">
      <div class="field is-horizontal">
        <label class="label mr-2">Client-Version</label>
        <p class="control" title="Client-Version">{{version}}</p>
      </div>
      <div class="field is-horizontal">
        <label class="label mr-2" >Server-Version </label>
        <p class="control" title="Server-Version">{{serverversion}}</p>
      </div>
      <div class="field is-horizontal">
        <label class="label mr-2" *ngIf="user">Benutzer</label>
        <p class="control" title="Benutzer">{{user}}</p>
      </div>
      <div class="field is-horizontal">
        <label class="label mr-2" *ngIf="error">Fehler</label>
        <p class="control" title="Fehler">{{error}}</p>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  version = environment.version;
  serverversion = '';
  user: string = '';
  error: string = '';

  user$ = this.authService.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));

  constructor(public appService: AppService, private authService: AuthService) {}

  ngOnInit() {
    this.appService.version().subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.serverversion = JSON.stringify(data, null, 2) ?? '';
        if (this.serverversion.length > 1 && this.serverversion.startsWith('"') && this.serverversion.endsWith('"')) {
          this.serverversion = this.serverversion.substring(1, this.serverversion.length - 1);
        }
      }
      if (error) {
        this.error = JSON.stringify(error, null, 2);
      }
    });
    // this.appService.health().subscribe((response) => {
    //   const { data, error } = response;
    //   if (data) {
    //     this.serverversion = JSON.stringify(data, null, 2);
    //   }
    //   if (error) {
    //     this.error = JSON.stringify(error, null, 2);
    //   }
    // });
    this.code$.subscribe((code) => {
      if (!Functions.nes(code) && code !== 'null') {
        console.log(code);
        this.user = code;
      } else {
        this.user = 'logged out';
      }
    });
  }
}
