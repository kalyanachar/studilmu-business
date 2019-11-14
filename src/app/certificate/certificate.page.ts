import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../core/services/main.service';
import { environment } from '../../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.page.html',
  styleUrls: ['./certificate.page.scss'],
})
export class CertificatePage implements OnInit {
  courseId:any;
  userId:any;
  certificateHtml:any;
  certificatePdf:any;
  quizId:any;
  companyId:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public mainService: MainService,
    private iab: InAppBrowser
  ) { 
    
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.courseId = this.route.snapshot.paramMap.get('cid');
    this.quizId = this.route.snapshot.paramMap.get('quizid');
    this.companyId = this.route.snapshot.paramMap.get('companyid');
    this.getCertificate(this.courseId);
  }

  getCertificate(cid) {
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

  gotoUrl() {
  this.iab.create("http://13.251.15.73/app/webroot/business/learns/app_certification/"+this.quizId+"/"+this.userId+"/"+this.companyId,'_system');
  }

}
