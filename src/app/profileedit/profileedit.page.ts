import { Component, OnInit } from '@angular/core';
import { ToastController,MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { MainService } from '../core/services/main.service';
@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.page.html',
  styleUrls: ['./profileedit.page.scss'],
})
export class ProfileeditPage implements OnInit {
  editProfileForm: FormGroup;
  languages:any=[];
  userDetails:any;
  constructor(
    public menuCtrl:MenuController,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public mainService: MainService,
    private router: Router,
  ) { 
    this.languages = [
      {
        "name":"English",
        "value":"En"
      }
    ]
  }

  ngOnInit() {
    this.menuCtrl.close();
    this.userProfile();
    this.editProfileForm = this.formBuilder.group({
      emptype: new FormControl('Staff'),
      fname: new FormControl('',Validators.compose([Validators.required])),
      lname: new FormControl('',Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      biography: new FormControl('',Validators.compose([Validators.required])),
      language_preference: new FormControl(''),
      location: new FormControl('',Validators.compose([Validators.required])),
      websitelink:new FormControl(''),
      googlelink:new FormControl(''),
      twitterlink:new FormControl(''),
      facebooklink:new FormControl(''),
      linkedinlink:new FormControl(''),
      youtubelink: new FormControl(''),
    });
  }

  userProfile() {
    var data = {
      "apikey": environment.apikey,
      "userid": localStorage.getItem('userId')
    }
    this.mainService.getuserDetails(data).subscribe(
      res => {
        this.userDetails = res.UserDetails;
        this.editProfileForm = this.formBuilder.group({
          emptype: new FormControl('Staff'),
          fname: new FormControl(this.userDetails.first_name),
          lname: new FormControl(this.userDetails.last_name),
          email: new FormControl(this.userDetails.email),
          biography: new FormControl(this.userDetails.biography),
          language_preference: new FormControl(this.userDetails.language_preference),
          location: new FormControl(this.userDetails.address),
          websitelink:new FormControl(this.userDetails.website_link),
          googlelink:new FormControl(this.userDetails.google_link),
          twitterlink:new FormControl(this.userDetails.twitter_link),
          facebooklink:new FormControl(this.userDetails.facebook_link),
          linkedinlink:new FormControl(this.userDetails.linkedin_link),
          youtubelink: new FormControl(this.userDetails.youtube_link),
        });
      },
      error => {
        
      }
    )
  }

  validation_messages = {
    'fname': [{ type: 'required', message: 'First Name is required.' }],
    'lname': [{ type: 'required', message: 'Last Name is required.' }],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'biography': [{ type: 'required', message: 'Biography is required.' }],
    'location': [{ type: 'required', message: 'Location is required.' }],

  };

 

  onSubmit(editProfileForm) {
    var data ={
      "userid": localStorage.getItem('userId'),
      "apikey":environment.apikey,
      "first_name":editProfileForm.value.fname,
      "email":editProfileForm.value.email,
      "last_name":editProfileForm.value.lname,
      "address":editProfileForm.value.location,
      "biography":editProfileForm.value.biography,
      "language_preference":editProfileForm.value.language_preference,
      "website_link":editProfileForm.value.websitelink,
      "facebook_link":editProfileForm.value.facebooklink,
      "google_link":editProfileForm.value.googlelink,
      "twitter_link":editProfileForm.value.twitterlink,
      "linkedin_link":editProfileForm.value.linkedinlink,
      "youtube_link":editProfileForm.value.youtubelink
    }

    this.mainService.editProfile(data).subscribe(
      res => {
       localStorage.setItem('userFullName', res['userDetails']['full_name']);
        this.mainService.loginStatus(true);
        this.router.navigateByUrl('/profileview');
      },
      error => {
        
        this.presentToast('Error!!!');
      }
    )
  }

  onChange(event) {
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }


}
