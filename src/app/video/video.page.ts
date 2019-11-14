import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../../environments/environment';
import { MainService } from '../core/services/main.service';
@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  url:any;
  getDetails:any;
  videoSource:any;
  courseDetails:any={};
  userId:any;
  constructor(
    public route:Router,
    public activatedRoute :ActivatedRoute,
    private statusBar: StatusBar,
    public mainService: MainService,
  ) {
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.courseDetails = res;
      this.videoSource = res.source;
  });
 
   }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
  videoEnded() {

    this.activeNextVideo();
  }

  activeNextVideo() {
    var data = {
      "apikey":environment.apikey,
      "userid":this.userId,
      "currentLectureId":this.courseDetails.id
    }
    this.mainService.activeNextVideo(data).subscribe(
      res => {
          if(res.code ==1) {
            this.route.navigateByUrl('/course/'+this.courseDetails.post_id);
          }
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

}
