import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../../environments/environment';
import { MainService } from '../core/services/main.service';
import videojs from 'video.js';
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
    // console.log("data==>",this.activatedRoute.snapshot.paramMap.get('data'));
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res);
      this.courseDetails = res;
      this.videoSource = res.source;
      console.log("Video Url ==>",this.videoSource);


  });
  //var myPlayer = videojs('example_video_1');
 // statusBar.overlaysWebView(false);
//  const player = videojs('videoPlayer', {
//   autoplay: true,
//   controls: false
// });


// var enabled = false;

// videojs("example_video_1").ready(function () {
//     this.disableProgress();
    
//     if(enabled){
//        this.disableProgress.enable();   
//     }
//     else{
//         this.disableProgress.disable();
//     }
    
// });



   }

   

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
   // this.url ="https://s3-ap-southeast-1.amazonaws.com/s3-studilmu-ap-southeast-1.amazonaws.com/lecture_video/5d1c3a308bbfc.mp4";
   //this.getDetails= this.router.snapshot.paramMap.get("data")
  //  this.sub = this.route.params.subscribe(params => {
  //   this.id = params['id']; 
// });
  }



  videoEnded() {
   // console.log("Video Ended 123!!!!!");
    //alert("Video ENded!!!!!");
    this.activeNextVideo();
  }

  activeNextVideo() {
    var data = {
      "apikey":environment.apikey,
      "userid":this.userId,
      "currentLectureId":this.courseDetails.id
    }
    console.log(data);
    this.mainService.activeNextVideo(data).subscribe(
      res => {
          console.log("Result ==>",res)
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
