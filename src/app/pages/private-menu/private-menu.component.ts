import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-menu',
  templateUrl: './private-menu.component.html',
  styleUrls: ['./private-menu.component.scss']
})
export class PrivateMenuComponent {
  public isCollapsed = true;

  constructor(private authService: AuthService, private router: Router) {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
