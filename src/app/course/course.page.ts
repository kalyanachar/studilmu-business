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
  // public technologies : Array<{ name: string, description: string, image: string }> = [
  //   {
  //      name : 'Angular',
  //      description : 'Google\'s front-end development framework - default option for Ionic development',
  //      image: '/assets/images/angular-logo.png'
  //   },
  //   {
  //      name : 'VueJS',
  //      description : 'Latest cutting edge front-end development framework - can be enabled as an option for Ionic development',
  //      image: '/assets/images/vuejs-logo.png'
  //   },
  //   {
  //      name : 'React',
  //      description : 'Popular front-end development framework from Facebook- can be enabled as an option for Ionic development',
  //      image: 'assets/images/react-logo.png'
  //   },
  //   {
  //      name : 'TypeScript',
  //      description : 'Superset of JavaScript that provides class based object oriented programming and strict data typing',
  //      image: 'assets/images/typescript-logo.png'
  //   },
  //   {
  //      name : 'Ionic Native',
  //      description : 'Apache Cordova compatible plugins that allow native device API\'s to be utilised',
  //      image: 'assets/images/ionic-native-logo.png'
  //   },
  //   {
  //      name : 'Capacitor',
  //      description : 'Plugins for Progressive Web App and hybrid app development',
  //      image: 'assets/images/capacitor-logo.png'
  //   },
  //   {
  //      name : 'StencilJS',
  //      description : 'Custom web component development framework',
  //      image: 'assets/images/stencil-logo.png'
  //   },
  //   {
  //      name : 'Sass',
  //      description : 'CSS pre-processor development library',
  //      image: 'assets/images/sass-logo.png'
  //   },
  //   {
  //      name : 'HTML5',
  //      description : 'Markup language and front-end API support',
  //      image: 'assets/images/html5-logo.png'
  //   }
  // ];
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
    // this.items = [
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false }
    // ];


    // for(let i = 0; i < 10; i++ ){
    //   this.data.push({
    //       title: 'Title '+i,
    //       details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //       icon: 'ios-add-circle-outline',
    //       showDetails: false
    //     });
    // }
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.currentSegment = 'overview';
    //alert(this.route.snapshot.queryParamMap.get('id'));
    // alert("kk"+this.route.snapshot.paramMap.get('id'));
    this.userId = localStorage.getItem('userId');
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
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

  // public captureName(event: any) : void
  // {
  //    console.log(`Captured name by event value: ${event}`);
  // }

  // expandItem(item): void {
  //   console.log("Kalyan",item.expand);
  //   if (item.expanded) {
  //     item.expanded = false;
  //   } else {
  //     this.items.map(listItem => {
  //       if (item == listItem) {
  //         listItem.expanded = !listItem.expanded;
  //       } else {
  //         listItem.expanded = false;
  //       }
  //       return listItem;
  //     });
  //   }
  // }


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
    // console.log(lecture); return false;
    console.log("Lecture", lecture);
    // if(lecture.type ==2) {
    //   alert("Quiz");
    // }
    // else if(lecture.type ==1) {
    //   alert("Final Test");
    // }
    // else {
    //   alert("Video");
    // }

    //this.router.navigate(['/quiz', lecture.id]);
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
     this.presentAlert("Sorry, you have been completed  the pre test quiz");
    }

    if (lecture.readLectureInfo === '' && lecture.type == 1) {
      // type ==1 == final test
      console.log("no Url");
      //
      this.presentAlert("Sorry, you cannot view this before completing the previous content. Please  complete the previous content first.");

    }
    if (lecture.readLectureInfo === 0 && lecture.type == 1) {
      console.log("go to quiz Url");
      this.router.navigate(['/quiz', lecture.id]);
    }
    if (lecture.readLectureInfo === 1 && lecture.type == 1) {
      console.log("go to quiz Url");
      this.router.navigate(['/quiz', lecture.id]);
    }

    if (lecture.readLectureInfo === "" && lecture.type == 0) {
      this.presentAlert("Sorry, you cannot view this before completing the previous content. Please  complete the previous content first.");
      // type ==1 == final test
      // console.log("no video Url1111");
      // if (lecture.lectureType == 'video') {
      //   // this.router.navigate(['/video'], { queryParams:lecture });
       
      //   if(lecture.readLectureInfo == "") {
      //     this.presentAlert("Sorry, you cannot view this content. Please complete your previous content.");
      //   }
      // }
      // else {
      //   // this.activeNextVideo(lecture);
      //   //  this.iab.create(lecture.source);
      //   //this.presentAlert("Sorry2, you cannot view this content. Please complete your previous content.");
      // }
    }
    if (lecture.readLectureInfo === 0 && lecture.type == 0) {
      console.log("go to video Url2222");
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


}
