import { Component, OnInit } from '@angular/core';
import { ToastController,MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../core/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  matching_passwords_group: FormGroup;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public mainService: MainService,
    public menuCtrl: MenuController,
    private storage: Storage,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.menuCtrl.close();
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
      ]))
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }
  ionViewWillEnter() {
    this.menuCtrl.close();
  }
  gotoPage() {
    this.router.navigateByUrl('/forgotpassword');
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
     ]

  };

  onSubmit(loginForm) {
    this.loginForm.value.apikey = environment.apikey;
    this.mainService.login(this.loginForm.value).subscribe(
      res => {
        if (res.ack == 1) {
          this.presentToast(res.msg);
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userId', res['UserDetails']['id']);
          localStorage.setItem('userEmail', res['UserDetails']['email']);
          localStorage.setItem('userFullName', res['UserDetails']['full_name']);
          localStorage.setItem('userHrId', res['UserDetails']['hr_id']);
          localStorage.setItem('userCompanyId', res['UserDetails']['hr_id']);
          localStorage.setItem('userDeptId', res['UserDetails']['department_id']);
          localStorage.setItem('userDesignationId', res['UserDetails']['designation_id']);
          localStorage.setItem('userImage', res['UserDetails']['profile_image']);
          this.mainService.loginStatus(true)
          this.authService.login(res.result);
        }
        else {
          this.presentToast(res.msg);
        }
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

}
