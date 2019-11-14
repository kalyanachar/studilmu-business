import { Component, OnInit } from '@angular/core';
import { ToastController,MenuController,NavController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  lecId:any;
  quizDetails:any ={};

  constructor(
    private router: Router,
    public toastController: ToastController,
    public mainService: MainService,
    public menuCtrl: MenuController,
    public navCtrl:NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.lecId =this.route.snapshot.paramMap.get('id');
    this.getquizDetails(this.lecId);

  }

  getquizDetails(id) {
    var data = {
      "apikey":environment.apikey,
      "lectureid":id,
      "userid":localStorage.getItem('userId')
    }
    this.mainService.getquizDetails(data).subscribe(
      res => {
      this.quizDetails = res;
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

  gotoQuizDetails(lecid) {
    this.router.navigate(['/quizdetails',lecid]);
  }

  

}
