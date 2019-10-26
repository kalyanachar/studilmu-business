import { Component } from '@angular/core';
import { ToastController,MenuController,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
import * as moment from "moment"; 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userId:any;
  courseList:any=[];
  userDetails:any;
  imageBaseUrl:any;
  today:any;
  constructor(
    private router: Router,
    public toastController: ToastController,
    public mainService: MainService,
    public menuCtrl: MenuController,
    public navCtrl:NavController
  ) {
   // this.menuCtrl.open();
   this.menuCtrl.close();
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = localStorage.getItem('userId');
    this.listCourse();
    this.today  = moment().format("YYYY-MM-DD");
    //alert(moment().format("YYYY-MM-DD"));
  
  }
  ionViewWillEnter() {
    this.menuCtrl.close();
    this.listCourse();
  }


  listCourse() {
    var data = {
      "apikey":environment.apikey,
      "userid":this.userId
    }
    console.log(data);
    this.mainService.listCourse(data).subscribe(
      res => {
        console.log(res);
        this.userDetails = res.UserDetails;
        this.courseList = res.CourseDetails;
        console.log("Course List==>", this.courseList);
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

  gotoCourse(course) {
    console.log(course)
    if(course.taken==0) {
      this.takeCourse(course);
    }
    else {
      this.router.navigate(['/course',course.cid]);
    }
  // 

  }

  takeCourse(course) {
    var data = {
      "apikey":environment.apikey,
      "comid":course.competencyid
    }
    console.log(data);
    this.mainService.takeCourse(data).subscribe(
      res => {
        console.log(res);
        if(res.code ==1) {
          this.router.navigate(['/course',course.cid]);
          this.listCourse();
        }
     //   this.userDetails = res.UserDetails;
      //  this.courseList = res.CourseDetails;
     //   console.log("Course List==>", this.courseList);
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

  gotoCourseFeedback(course) {
    //this.router.navigate(['coursefeedback']);
    this.router.navigate(['/coursefeedback',course.cid]);
  }

  gotoPage(page){
    // this.router.navigateByUrl(page);
     this.router.navigate([page]);
   }

}
