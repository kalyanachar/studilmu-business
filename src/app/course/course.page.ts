import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { MainService } from '../core/services/main.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import videojs from 'video.js';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  
  public items: any = [];
  currentSegment: any;
  courseId: any;
  userId: any;
  courseDetails: any;
  imageBaseUrl: any;
  bannerImage: any;
  courseContent: any = [];
  courseInfo: any = [];
  totalLec: any;
  lecDesc: any;
  courseContentNew: any;
  lessonCount: any;
  totalViewsCount: any;
  assignmentDetails:any = {};


  itemsNew: any = [];
  //data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];
  data = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public mainService: MainService,
    private iab: InAppBrowser,
    public alertController: AlertController
  ) {
    
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.currentSegment = 'overview';
    //alert(this.route.snapshot.queryParamMap.get('id'));
    // alert("kk"+this.route.snapshot.paramMap.get('id'));
    this.userId = localStorage.getItem('userId');
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
    this.listAssignment();
  }

  ionViewDidEnter() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
  }
  ionViewWillEnter() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.currentSegment = ev.detail.value;
  }

  

  getCourseDetails() {
    var data = {
      "apikey": environment.apikey,
      "userid": this.userId,
      "courseid": this.courseId
    }
    console.log(data);
    this.mainService.getcourseDetails(data).subscribe(
      res => {
        console.log(res);
        // this.userDetails = res.UserDetails;
        this.courseDetails = res;
        this.totalLec = res.totalLectureCount;
        this.totalViewsCount = res.totalViewedLectureCount;
        this.lessonCount = res.lessonCount;
        this.lecDesc = res.courseInfo[0][2]
        //  alert(this.totalLec);
        this.courseContent = this.courseDetails.courseContent;
        console.log("Course Content ==>", this.courseContent);
        // alert(this.courseDetails.courseImgInfo);
        this.bannerImage = res.courseImgInfo;

        this.courseInfo = res.courseInfo;
        // this.courseDetails.courseContent.forEach(item => {
        // //  console.log(item);
        // //  this.courseDetails.expanded.push =false;

        // })
        this.courseContent.forEach(item => item["showDetails"] = false);
        // console.log("kk",this.courseDetails.courseContent);
        this.courseContentNew = this.courseContent;
        console.log("zzzzz==>", this.courseContentNew);
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }


  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  gotoPage(lecture) {
    
    if (lecture.readLectureInfo == '' && lecture.type == 2) {
      // type ==1 == pre test
      console.log("go to pre quiz Url");
      this.router.navigate(['/quiz', lecture.id]);
      // this.router.navigate(['/course',course.cid]);
    }
    if (lecture.readLectureInfo == 0 && lecture.type == 2) {
      console.log("go to pre quiz Url");
      this.router.navigate(['/quiz', lecture.id]);
    }
    if (lecture.readLectureInfo == 1 && lecture.type == 2) {
      console.log("go to quiz Url");
     // this.router.navigate(['/quiz', lecture.id]);
     this.presentAlert("Sorry, you have completed the pre test quiz before");
    }

    if (lecture.readLectureInfo === '' && lecture.type == 1) {
      // type ==1 == final test
      console.log("no Url");
      this.presentAlert("Sorry, you cannot view this before completing the previous content. Please  complete the previous content first.");

    }
    if (lecture.readLectureInfo === 0 && lecture.type == 1) {
      console.log("go to quiz Url 222222");
      console.log("Lecture 123==>",lecture);
     // this.router.navigate(['/quiz', lecture.id]);
       if(lecture.is_quiz_finish ==0) {
        this.router.navigate(['/quiz', lecture.id]);
       }
       else {
        this.router.navigate(['/marks', lecture.id]);
       }
      
    }
    if (lecture.readLectureInfo === 1 && lecture.type == 1) {
      console.log("Lecture 234==>",lecture);
      if(lecture.is_quiz_finish ==0) {
        this.router.navigate(['/quiz', lecture.id]);
       }
       else {
        this.router.navigate(['/marks', lecture.id]);
       }
    }

    if (lecture.readLectureInfo === "" && lecture.type == 0) {
      this.presentAlert("Sorry, you cannot view this before completing the previous content. Please  complete the previous content first.");
     
    }
    if (lecture.readLectureInfo === 0 && lecture.type == 0) {
      if (lecture.lectureType == 'video') {
        this.router.navigate(['/video'], { queryParams: lecture });
      }
      else {
 
        this.activeNextVideo(lecture);
       // this.iab.create(lecture.source);
      }
    }
    // else {
    //   this.presentAlert("Sorry, you cannot view this content. Please complete your previous content.");
    // }
    if (lecture.readLectureInfo == 1 && lecture.type == 0) {
      console.log("go to video Url3333");
      if (lecture.lectureType == 'video') {
        this.router.navigate(['/video'], { queryParams: lecture });
      }
      else {
        this.activeNextVideo(lecture);
       // this.iab.create(lecture.source);
      }
    }
    // else {
    //   this.presentAlert("Sorry, you cannot view this content. Please complete your previous content.");
    // }
  }


  activeNextVideo(lecture) {
    var data = {
      "apikey": environment.apikey,
      "userid": this.userId,
      "currentLectureId": lecture.id
    }
    console.log(data);
    this.mainService.activeNextVideo(data).subscribe(
      res => {
        console.log("Result ==>", res)
        if (res.code == 1) {
          this.iab.create(lecture.source);
          //  this.route.navigateByUrl('/course/'+this.courseDetails.post_id);
          this.courseId = this.route.snapshot.paramMap.get('id');
          this.getCourseDetails();
        }
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Message',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  listAssignment() {
    var data = {
      "apikey":environment.apikey,
      "courseid":this.courseId
    }
    console.log(data);
    this.mainService.listassignment(data).subscribe(
      res => {
        console.log("Assignment===>",res);
        this.assignmentDetails = res;

      },
      error => {
        console.log("Error==>", error);
      }
    )
  }
  gotoDownload(url) {
    this.iab.create(url,'_system');

  }
 


}
