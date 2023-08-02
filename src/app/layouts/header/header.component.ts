import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userEmail: any;
  isLoggedIn$:Observable<boolean> | undefined

  constructor(private authServices:AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
    console.log(this.userEmail);
    this.isLoggedIn$ = this.authServices.isLoggedIn()
  }

  onLogout(){
    this.authServices.logout()

  }
}
