import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from "@auth0/auth0-angular";
import { LoginButtonComponent } from 'src/app/shared/components/buttons/login-button.component';
import { LogoutButtonComponent } from 'src/app/shared/components/buttons/logout-button.component';
import { SignupButtonComponent } from 'src/app/shared/components/buttons/signup-button.component';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/services';
// import { Functions } from 'src/app/core/functions';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, LoginButtonComponent, LogoutButtonComponent, RouterLink, SignupButtonComponent],
  template: `
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://cwkuehl.de" [title]="navbarTitle">
          <img src="favicon.ico" width="32" height="32">&nbsp;cwkuehl.de
        </a>
        <a role="button" [class]="navbarBurgerClass" aria-label="menu" (click)="toggleMenu()" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenu" [class]="navbarMenuClass">
        <div class="navbar-start">
          <a class="navbar-item" routerLink="/">Home</a>
          <a class="navbar-item" routerLink="/diary">Diary</a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" routerLink="/diary">Diary</a>
              <hr class="navbar-divider">
              <a class="navbar-item" routerLink="/about">About</a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <ng-container *ngIf="isAuthenticated$ | async; else unAuthenticated">
                <app-logout-button></app-logout-button>
              </ng-container>
              <ng-template #unAuthenticated>
                  <app-signup-button></app-signup-button>
                  <app-login-button></app-login-button>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavigationComponent implements OnInit {
  isAuthenticated$ = this.authService.isAuthenticated$
  // user$ = this.authService.user$;
  navbarBurgerClass = 'navbar-burger';
  navbarMenuClass = 'navbar-menu';
  navbarTitle = '';

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.navbarTitle = 'Ngbp © 2025 W. Kuehl - ' + environment.version;
    // this.user$.subscribe((user) => {
    //   if (user && user.name && user.name.length > 1) {
    //     let clientid = user.name.substring(0, 1);
    //     let userid = user.name.substring(1);
    //     this.userService.login(clientid, userid).subscribe((response) => {
    //       const { data, error } = response;
    //       if (data) {
    //         console.log('login ok:' + JSON.stringify(data, null, 2));
    //       }
    //       if (error) {
    //         console.log('login error:' + JSON.stringify(error, null, 2));
    //       }
    //     });
    //     //console.log('user:' + JSON.stringify(user, null, 2));
    //   }
    //   //this.entrya1 = code;
    // });
  }

  /**
   * Toggles the menu by adding or removing the 'is-active' class to the navbar burger and menu.
   * @return {void} This function does not return any value.
   */
  toggleMenu(): void {
    let active = ' is-active';
    if (this.navbarBurgerClass.endsWith(active)) {
      this.navbarBurgerClass = this.navbarBurgerClass.replace(active, '');
      this.navbarMenuClass = this.navbarMenuClass.replace(active, '');
    } else {
      this.navbarBurgerClass = this.navbarBurgerClass + active;
      this.navbarMenuClass = this.navbarMenuClass + active;
    }
  }
}
