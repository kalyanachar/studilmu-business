import { Component, OnInit } from '@angular/core';
import { ToastController,MenuController,NavController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-coursefeedback',
  templateUrl: './coursefeedback.page.html',
  styleUrls: ['./coursefeedback.page.scss'],
})
export class CoursefeedbackPage implements OnInit {
  userId:any;
  courseId:any;
 
  courseDetails:any={};
  CourseContentWatchVideo:any =[];
  CourseContentPreTest:any =[];
  CourseContentFinalTest:any=[];
  CourseContentAssignment:any=[];
  CourseContentCertificate:any=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController,
    public mainService: MainService,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.courseInfo();
  }


  courseInfo() {
    var data = {
      "apikey":environment.apikey,
      "userid":localStorage.getItem('userId'),
      "courseid":this.courseId
    }
    console.log(data);
    this.mainService.businessCourseInfo(data).subscribe(
      res => {
        console.log(res);
        this.courseDetails = res.CourseInfo[0];
        console.log(this.courseDetails);
        this.CourseContentPreTest= res.CourseContentInfo[0];
        this.CourseContentWatchVideo= [...res.CourseContentInfo[1], ...res.CourseContentInfo[2]];
        this.CourseContentFinalTest= res.CourseContentInfo[3];
        console.log("Final Test==>",this.CourseContentFinalTest)
        this.CourseContentAssignment= res.CourseContentInfo[4];
        console.log("Assignment==>",this.CourseContentAssignment);
        this.CourseContentCertificate= res.CourseContentInfo[5];
        console.log("Certificate==>",this.CourseContentCertificate);

      },
      error => {
        console.log("Error==>", error);
      }
    )
  }


}
