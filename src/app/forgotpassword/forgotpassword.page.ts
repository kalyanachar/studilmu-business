import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../core/validators/password.validator';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  forgotForm: FormGroup;
  otpForm: FormGroup;
  changePasswordForm: FormGroup;
  matching_passwords_group: FormGroup;
  isFormShow: number;
  getOtp: any;
  email: any;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.isFormShow = 1;

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.forgotForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

    });
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.changePasswordForm = this.formBuilder.group({
      matching_passwords: this.matching_passwords_group,
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'otp': [
      { type: 'required', message: 'OTP is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
  };

  onSubmitForgot(forgotForm) {
    this.forgotForm.value.apikey = environment.apikey;
    this.email = forgotForm.value.email;
    this.mainService.forgotPassword(this.forgotForm.value).subscribe(
      res => {
        if (res.code == 1) {
          this.isFormShow = 2;
          this.getOtp = res.otp;
          this.presentToast(res.msg);
        }
        else {
          this.presentToast(res.msg);
        }
      },
      error => {
        
      }
    )
  }

  onSubmitOTP(otpForm) {
    if (otpForm.value.otp = this.getOtp) {
      this.isFormShow = 3;
    }
    else {
      this.presentToast('OTP mismatch, Please try again');
    }
  }

  onSubmitChangePass(changePasswordForm) {
    this.changePasswordForm.value.apikey = environment.apikey;
    var data = {
      "email": this.email,
      "password": this.changePasswordForm.value.matching_passwords.password,
      "apikey": environment.apikey
    }
    this.mainService.updatePassword(data).subscribe(
      res => {
        if (res.code == 1) {
          this.getOtp = res.otp;
          this.presentToast(res.msg);
          this.router.navigate(["/login"]);
        }
        else {
          this.presentToast(res.msg);
        }
      },
      error => {
        
      }
    )
  }
  gotoPage() {
    this.router.navigate(["/login"]);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
