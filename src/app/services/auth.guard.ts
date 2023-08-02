import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

constructor(private authService:AuthService,
  private toastr:ToastrService,
  private route:Router
  ){

}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedGuard){
      console.log('Access Granted ...');
      return true
    }else{
      this.toastr.warning('You dont have permission to access this page ..');
      this.route.navigate(['/login'])
      return false
    }







    }

}
