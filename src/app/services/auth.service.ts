import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  isLoggedGuard : boolean = false

  constructor(private afAuth:AngularFireAuth
    ,private toastr:ToastrService,
    private route:Router
    ) { }

  login(email:any,password:any){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef=>{
      this.toastr.success('Logged In Successfully');
      this.loadUser()
      this.loggedIn.next(true)
      this.isLoggedGuard = true
      this.route.navigate([''])


    }).catch(e =>{
      this.toastr.warning(e);
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user=>{
      console.log(JSON.parse(JSON.stringify(user)) );
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      this.toastr.success('User Logged Out Successfully');
      localStorage.removeItem('user');
      this.isLoggedGuard = false
      this.loggedIn.next(false);

      this.route.navigate(['/login']);
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  }

}
