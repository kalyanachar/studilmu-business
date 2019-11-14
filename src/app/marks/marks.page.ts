import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-marks',
  templateUrl: './marks.page.html',
  styleUrls: ['./marks.page.scss'],
})
export class MarksPage implements OnInit {
  percentage: any;
  totalscore: any;
  userscore: any;
  courseId: any;
  isCertificate: any;
  companyId: any;
  quizId: any;
  lecId: any;
  userId: any;
  pageTitle: string = "";
  constructor(
    private router: Router,
    public toastController: ToastController,
    public mainService: MainService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.lecId = this.route.snapshot.paramMap.get('id');
    this.getQuizFinalScore();
  }

  getQuizFinalScore() {
    var data = {
      "apikey": environment.apikey,
      "lectureid": this.lecId,
      "userid": localStorage.getItem('userId')
    }
    this.mainService.quizFinalResult(data).subscribe(
      res => {
        if (res['code'] == 1) {
          if (res['is_quiz_exist'] == 0) {
            this.pageTitle = "Final Test result";
          }
          else {
            this.pageTitle = "Quiz result";
          }
          this.percentage = res['percentage'];
          this.totalscore = res['totalscore'];
          this.userscore = res['userscore'];
          this.courseId = res['courseid'];
          this.isCertificate = res['certificate'];
          this.companyId = res['companyid'];
          this.quizId = res['quizid'];

        }
        else {

        }

      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

  getCertificate() {
    this.iab.create("https://business.studilmu.com/learns/app_certification/" + this.quizId + "/" + this.userId + "/" + this.companyId, '_system');
  }
  gotoCourse() {
    this.router.navigate(['/course', this.courseId]);
  }



}
