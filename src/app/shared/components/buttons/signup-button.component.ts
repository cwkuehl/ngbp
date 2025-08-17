import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [CommonModule],
  template: `
  <button class="button is-secondary mr-1" (click)="handleSignUp()">Sign Up</button>
  `
})
export class SignupButtonComponent {
  constructor(private auth: AuthService) {}

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: "/profile",
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
