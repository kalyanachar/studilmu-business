import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { MainService } from '../core/services/main.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
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
  assignmentDetails: any = {};
  itemsNew: any = [];
  data = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public mainService: MainService,
    private iab: InAppBrowser,
    public alertController: AlertController,
    public toastController: ToastController,
  ) {

  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.currentSegment = 'overview';
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
    this.currentSegment = ev.detail.value;
  }



  getCourseDetails() {
    var data = {
      "apikey": environment.apikey,
      "userid": this.userId,
      "courseid": this.courseId
    }
    this.mainService.getcourseDetails(data).subscribe(
      res => {
        // this.userDetails = res.UserDetails;
        this.courseDetails = res;
        this.totalLec = res.totalLectureCount;
        this.totalViewsCount = res.totalViewedLectureCount;
        this.lessonCount = res.lessonCount;
        this.lecDesc = res.courseInfo[0][2]
        this.courseContent = this.courseDetails.courseContent;
        this.bannerImage = res.courseImgInfo;
        this.courseInfo = res.courseInfo;
        this.courseContent.forEach(item => item["showDetails"] = false);
        this.courseContentNew = this.courseContent;
      },
      error => {
        
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
      this.router.navigate(['/quiz', lecture.id]);
    }
    if (lecture.readLectureInfo == 0 && lecture.type == 2) {
      this.router.navigate(['/quiz', lecture.id]);
    }
    if (lecture.readLectureInfo == 1 && lecture.type == 2) {
      this.presentAlert("Sorry, you have completed the pre test quiz before");
    }

    if (lecture.readLectureInfo === '' && lecture.type == 1) {
      this.presentAlert("Sorry, you cannot view this before completing the previous content. Please  complete the previous content first.");
    }
    if (lecture.readLectureInfo === 0 && lecture.type == 1) {
      if (lecture.is_quiz_finish == 0) {
        this.router.navigate(['/quiz', lecture.id]);
      }
      else {
        this.router.navigate(['/marks', lecture.id]);
      }

    }
    if (lecture.readLectureInfo === 1 && lecture.type == 1) {
      if (lecture.is_quiz_finish == 0) {
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
      }
    }
    if (lecture.readLectureInfo == 1 && lecture.type == 0) {
      if (lecture.lectureType == 'video') {
        this.router.navigate(['/video'], { queryParams: lecture });
      }
      else {
        this.activeNextVideo(lecture);
      }
    }

  }


  activeNextVideo(lecture) {
    var data = {
      "apikey": environment.apikey,
      "userid": this.userId,
      "currentLectureId": lecture.id
    }
    this.mainService.activeNextVideo(data).subscribe(
      res => {
        if (res.code == 1) {
          this.iab.create(lecture.source);
          this.courseId = this.route.snapshot.paramMap.get('id');
          this.getCourseDetails();
        }
      },
      error => {
        
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
      "apikey": environment.apikey,
      "courseid": this.courseId,
      "userid": this.userId
    }
    this.mainService.listassignment(data).subscribe(
      res => {
        this.assignmentDetails = res;

      },
      error => {
        
      }
    )
  }
  gotoDownload(url) {
    this.iab.create(url, '_system');

  }



  importFile(event, assignment) {
    if (event.target.files.length == 0) {
      return
    }
    let file: File = event.target.files[0];

    let formData: FormData = new FormData();
    formData.append('assignment', file, file.name);
    formData.append('assignment_id', assignment.assignmentId);
    formData.append('user_id', this.userId);
    formData.append('course_id', this.courseId);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.mainService.uploadassignment(formData).subscribe(
      res => {
        this.listAssignment();
        this.presentToast(res.msg);

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
