import { Component } from '@angular/core';

import { Platform,ToastController,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { MainService } from '../app/core/services/main.service';
import { environment } from '../environments/environment';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list'
    },
    {
      title: 'List Course',
      url: '/listcourse',
      icon: 'list'
    }
  ];

  userId:any;
  userFullName:any;
  userEmail:any;
  userImage:any;
  imageBaseUrl:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    public toastController: ToastController,
    public mainService: MainService,
    public navCtrl:NavController,
    private ViewportScroller: ViewportScroller
  ) {
    this.ViewportScroller;
    this.initializeApp();
    this.imageBaseUrl = environment.imageBaseUrl;
    mainService.getLoginStatus.subscribe(status => this.changeStatus(status));
    mainService.getProfileUpdateStatus.subscribe(status => this.updateStatus(status));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.loadUserInfo();
      this.statusBar.backgroundColorByHexString('#457492');
      if (localStorage.getItem('isLoggedin')=='true') {
        this.router.navigateByUrl('/home');
      }
      else {
        this.router.navigateByUrl('/aftersplash');
      }
      this.loadUserInfo();
    });
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')=='true') {
     this.userFullName = localStorage.getItem('userFullName');
     this.userEmail = localStorage.getItem('userEmail');
     this.userImage = localStorage.getItem('userImage');
    }
    else {
      this.userFullName = '';
      this.userEmail = '';
      this.userImage ='';
    }
  }

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  updateStatus(status: boolean) {
    if (status) {
      this.userFullName = localStorage.getItem('userFullName');
      this.userImage = localStorage.getItem('userImage');
    }
  }


  gotoPage(page){
   // this.router.navigateByUrl(page);
    this.router.navigate([page]);
  // this.navCtrl.setRoot('HomePage')
  }
  gotoHome(){
    this.router.navigateByUrl('/login');
  }

  logOut() {
    this.userId = localStorage.getItem('userId');
    var data = {
      userid:this.userId
    }
    this.mainService.logout(data).subscribe(
      res => {
        console.log("Logout Result==>", res);
       // if (res.ack == 1) {
          this.presentToast(res.msg);
          localStorage.setItem('isLoggedin', 'false');
          localStorage.setItem('userId', '');
          localStorage.setItem('userEmail', '');
          //this.mainService.loginStatus(true);
          this.loadUserInfo();
          this.router.navigateByUrl('/login');//
      //  }
       // else {
      //    this.presentToast(res.msg);
      //  }


      },
      error => {
        console.log("Error==>", error);
        this.presentToast('Error!!!');
      }
    )
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }


  gotoCertificate() {
    this.router.navigate(['/certificate',616,5970,36]);
  }
}
