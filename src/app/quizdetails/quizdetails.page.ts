import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute,NavigationExtras  } from '@angular/router';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
import { ThrowStmt } from '@angular/compiler';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file/ngx'
// import {WebView} from '@ionic-native/ionic-webview/ngx';
@Component({
  selector: 'app-quizdetails',
  templateUrl: './quizdetails.page.html',
  styleUrls: ['./quizdetails.page.scss'],
})
export class QuizdetailsPage implements OnInit {
  lecId: any;
  quizDetails: any = {};
  userId: any;
  ansOptions: any = [];
  showQuestion: boolean = true;
  ansStatus: any;
  ansindex: any;
  score:any;
  percentage:any;
  totalscore :any;
  userscore :any;
  courseId:any;
  isCertificate:any;
  companyId:any;
  quizId:any;
  certificateHtml:any;
  certificatePdf:any;
  private downloadPath = null
  path:any;
  showPath:any;
  pageTitle:string="Quiz Details"
  constructor(
    private router: Router,
    public toastController: ToastController,
    public mainService: MainService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private iab: InAppBrowser,
    private fileX: FileTransfer,
  ) {

   }

  ngOnInit() {
    this.lecId = this.route.snapshot.paramMap.get('id');
    this.getQuizList(this.lecId);
    this.userId = localStorage.getItem('userId');
    this.showQuestion = true;
  }

  getQuizList(id) {
    var data = {
      "apikey": environment.apikey,
      "lectureid": id,
      "userid": localStorage.getItem('userId')
    }
    this.mainService.getquizQuestion(data).subscribe(
      res => {
        this.showQuestion = true;
        this.quizDetails = res['quizData'];
        this.ansOptions = JSON.parse(res['quizData']['options']);
      },
      error => {
        
      }
    )
  }

  nextQuestion(quizDetails) {
    var data = {
      "apikey": environment.apikey,
      "lectureid": this.lecId,
      "currentquizid": quizDetails.id,
      "userid": localStorage.getItem('userId')
    }
    this.mainService.getquizQuestionNext(data).subscribe(
      res => {
        this.ansStatus = '';
        this.ansindex = '';
        if (res['code'] == 1) {
          this.showQuestion = true;
          this.quizDetails = res['quizData'];
          this.ansOptions = JSON.parse(res['quizData']['options']);
        }
        else {
          this.showQuestion = false;
          this.getQuizFinalScore(quizDetails)
        }

      },
      error => {
        
      }
    )
  }

  selectAnswer(ans, questionDetails, i) {
    if (ans.answer == questionDetails.answer) {
      this.ansStatus = 1;
      this.ansindex = i;
    this.quizaddScore(ans,questionDetails);
 
    }
    else {
      this.ansStatus = 2;
      this.ansindex = i;
    this.quizaddScore(ans,questionDetails);

    }
  }



  quizaddScore(ans,questionDetails) {
    if (ans.answer == questionDetails.answer) {
      this.score = questionDetails.marks;
    } 
    else {
      this.score = 0;
    }
    var data = {
      "quizid":questionDetails.quiz_id,
      "questionid":questionDetails.id,
      "userid":localStorage.getItem('userId'),
      "score":this.score, // if correct send marks 1 or false 0 
      "correctans":questionDetails.answer,
      "userans":ans.answer,
      "qtype":questionDetails.Qtype,
      "apikey": environment.apikey
    }
    this.mainService.quizAddScore(data).subscribe(
      res => {
        if(res['code']==1) {
           this.showQuestion =true;
           this.nextQuestion(questionDetails);
        }
        else {
          this.showQuestion =false;
          this.getQuizFinalScore(questionDetails)
        }

      },
      error => {
        
      }
    )
  }

  getQuizFinalScore(quizDetails) {
    var data = {
      "apikey": environment.apikey,
      "lectureid": this.lecId,
      "userid": localStorage.getItem('userId')
    }
    this.mainService.quizFinalResult(data).subscribe(
      res => {
        if(res['code']==1) {
          if(res['is_quiz_exist'] == 0) {
            this.pageTitle = "Final Test result";
          }
          else {
            this.pageTitle = "Quiz result";
          }
          this.percentage = res['percentage'];
          this.totalscore = res['totalscore'];
          this.userscore = res['userscore'];
          this.courseId = res['courseid'];
          this.isCertificate =res['certificate'];
          this.companyId =res['companyid'];
          this.quizId =res['quizid'];

          this.getCertificateResult(this.courseId);
        }
        else {

        }
      },
      error => {
        
      }
    )
  }


  getCertificateResult(cid) {
    var data = {
      "apikey": environment.apikey,
      "userid": this.userId,
      "courseid": this.courseId
    }
    this.mainService.getCertificateDetails(data).subscribe(
      res => {
        this.certificateHtml = res['html'];
        this.certificatePdf = res['url'];
      },
      error => {
        
      }
    )
  }

  gotoCourse() {
   this.router.navigate(['/course',this.courseId]);
  }

  gotoCertificate() {
    var data = {
      "quizid":this.quizId,
      "companyid":this.companyId,
      "courseid":this.courseId
    }
  this.router.navigate(['/certificate',this.courseId,this.quizId,this.companyId])
  }

  getCertificate() {
    this.iab.create("https://business.studilmu.com/learns/app_certification/"+this.quizId+"/"+this.userId+"/"+this.companyId,'_system');
  }

 
}
