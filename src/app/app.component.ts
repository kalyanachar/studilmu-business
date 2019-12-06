import { Component,ViewChild } from '@angular/core';

import { Platform,ToastController,NavController,IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router,NavigationEnd  } from '@angular/router';
import { MainService } from '../app/core/services/main.service';
import { environment } from '../environments/environment';
import { ViewportScroller } from '@angular/common';
import { AuthenticationService } from './core/services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
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
    }
  ];

  userId:any;
  userFullName:any;
  userEmail:any;
  userImage:any;
  imageBaseUrl:any;
  navLinksArray:any = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    public toastController: ToastController,
    public mainService: MainService,
    public navCtrl:NavController,
    private ViewportScroller: ViewportScroller,
    private authenticationService: AuthenticationService,
    public alertController: AlertController
  ) {
    this.ViewportScroller;
   this.platform.ready().then(() => {
    this.splashScreen.hide();
    this.statusBar.backgroundColorByHexString('#457492');
    this.authenticationService.authState.subscribe(state => {
      if (state) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    });

    this.loadUserInfo();
  });
    this.imageBaseUrl = environment.imageBaseUrl;
    mainService.getLoginStatus.subscribe(status => this.changeStatus(status));
    mainService.getProfileUpdateStatus.subscribe(status => this.updateStatus(status));

  }
  ngAfterViewInit() {
    this.backbuttonInitializer();
  }

  private backbuttonInitializer() {

    this.platform.backButton
    .subscribeWithPriority(0, () => {
      if (this.router.url === '/login' || this.router.url === '/user/home' || this.router.url === '/user/notification' || this.router.url === '/user/profile' || this.router.url === '/user/product') {
        this.presentAlertConfirm();
      } 
      else if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }  else {
         this.presentAlertConfirm();
      }
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
    this.router.navigate([page]);
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
          this.presentToast(res.msg);
          localStorage.setItem('isLoggedin', 'false');
          localStorage.setItem('userId', '');
          localStorage.setItem('userEmail', '');
          this.loadUserInfo();
          this.authenticationService.logout();
          this.router.navigateByUrl('/login');//
      },
      error => {
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Exit',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }


}
