import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from 'src/app/shared/components/navigation.component';;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  template: `
  <section class="section">
  <div class="container">
    <app-navigation></app-navigation>
    <router-outlet></router-outlet>
  </div>
  </section>
  `,
  styles: [],
})
export class AppComponent {
  title = 'ngbp';
}
