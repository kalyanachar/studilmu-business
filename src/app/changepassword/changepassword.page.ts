import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../core/validators/password.validator';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  matching_passwords_group: FormGroup;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public menuCtrl: MenuController,
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.menuCtrl.close();
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.changePasswordForm = this.formBuilder.group({
      matching_passwords: this.matching_passwords_group,
    });
  }

  validation_messages = {

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
  };

  onSubmitChangePass(changePasswordForm) {
    this.changePasswordForm.value.apikey = environment.apikey;
    var data = {
      "email": localStorage.getItem('userEmail'),
      "password": this.changePasswordForm.value.matching_passwords.password,
      "apikey": environment.apikey
    }
    this.mainService.updatePassword(data).subscribe(
      res => {
        if (res.code == 1) {
          this.presentToast(res.msg);
          this.router.navigate(["/home"]);
        }
        else {
          this.presentToast(res.msg);
        }
      },
      error => {

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
