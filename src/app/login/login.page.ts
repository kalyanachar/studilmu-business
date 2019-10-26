import { Component, OnInit } from '@angular/core';
import { ToastController,MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
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
    private storage: Storage
  ) {
  //  alert(environment.apikey);

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
  // login() {
  //   this.router.navigateByUrl('/home');
  // }
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
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ]

  };


  onSubmit(loginForm) {
    // console.log(values);
    console.log(loginForm.value);
    this.loginForm.value.apikey = environment.apikey;
    this.mainService.login(this.loginForm.value).subscribe(
      res => {
        console.log("Login Result==>", res);
        if (res.ack == 1) {
          this.presentToast(res.msg);
          this.mainService.loginStatus(true);
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

          this.router.navigateByUrl('/home');//
        }
        else {
          this.presentToast(res.msg);
        }


      },
      error => {
        console.log("Error==>", error);
        this.presentToast('Error!!!');
      }
    )
    //  this.router.navigate(["/user"]);
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
