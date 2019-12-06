import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

   ifLoggedIn() {
    if (localStorage.getItem('isLoggedin')=='true') {
      this.authState.next(true);
    }
    
  }

  login(loginDetails:any) {
    if (localStorage.getItem('isLoggedin')=='true') {
      this.router.navigateByUrl('/home');
      this.authState.next(true);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }


}
