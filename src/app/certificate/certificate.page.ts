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
    console.log("Course Id====>",this.route.snapshot.paramMap.get('cid'));
    this.quizId = this.route.snapshot.paramMap.get('quizid');
    console.log("Quiz Id====>",this.route.snapshot.paramMap.get('quizid'));
    this.companyId = this.route.snapshot.paramMap.get('companyid');
    console.log("Company Id====>",this.route.snapshot.paramMap.get('companyid'));
    this.getCertificate(this.courseId);
  }


  getCertificate(cid) {
    var data = {
      "apikey": environment.apikey,
      "userid": this.userId,
      "courseid": this.courseId
    }
    console.log(data);
    this.mainService.getCertificateDetails(data).subscribe(
      res => {
        console.log("Certificate Details====>",res);
        this.certificateHtml = res['html'];
        this.certificatePdf = res['url'];
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

  gotoUrl() {
   // this.iab.create(this.certificatePdf);
   console.log("Quiz Id ==>",this.quizId);
   console.log("User Id ==>",this.userId);
   console.log("company Id ==>",this.companyId);
  this.iab.create("http://13.251.15.73/app/webroot/business/learns/app_certification/"+this.quizId+"/"+this.userId+"/"+this.companyId,'_system');
  //this.iab.create("https://www.flipkart.com/",'_blank');
  
  }

  // downloadFile() {
  //   console.log("Entered download File with url: ", this.address)
  //   let url = this.address
  //   const fileTransfer: FileTransferObject = this.fileX.create();
  //   fileTransfer.download(url, this.downloadPath).then((entry) => {
  //     console.log('fileTransfer.download data ** ** ** **:' + JSON.stringify(entry));
  //   }, (err) => {
  //     console.log("downloadfile() error: " + JSON.stringify(err));
  //   });
  // }

}
