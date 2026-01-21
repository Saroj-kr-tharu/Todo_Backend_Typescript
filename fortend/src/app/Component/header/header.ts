import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IsMobileView } from '../../directives/is-mobile-view';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IsMobileView],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMobileMenuOpen = signal(false);
  navLinks = [
      {text: 'Home', to: '/home'},
      {text: 'Todos', to: '/todos'},
      {text: 'Login', to: '/login'},
      {text: 'Signup', to: '/signup'},
    ]  
  
toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
}



}
