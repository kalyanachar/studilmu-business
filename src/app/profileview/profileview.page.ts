import { Component, OnInit,ViewChild } from '@angular/core';
import { ToastController, MenuController, NavController,ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { MainService } from '../core/services/main.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

declare var cordova: any;
@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.page.html',
  styleUrls: ['./profileview.page.scss'],
})
export class ProfileviewPage implements OnInit {
  @ViewChild('content') content:any;
  userId:any;
  imageBaseUrl: any;
  userDetails: any = {};
  lastImage:any;
  loading:any;
  constructor(
    public menuCtrl: MenuController,
    private router: Router,
    private camera: Camera, 
    private file: File, 
   // private http: HttpClient, 
    //private webview: WebView,
    private actionSheetCtrl: ActionSheetController, 
    private toastController: ToastController,
    private platform: Platform, 
    private loadingController: LoadingController,
   // private ref: ChangeDetectorRef, 
    private filePath: FilePath,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public mainService: MainService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.menuCtrl.close();
    //  this.menuCtrl.enable(false);
    this.userProfile();
    this.userId = localStorage.getItem('userId');
  }
  ionViewWillEnter() {
    this.userProfile();
  }
  userProfile() {
    var data = {
      "apikey": environment.apikey,
      "userid": localStorage.getItem('userId')
    }
    this.mainService.getuserDetails(data).subscribe(
      res => {
        this.userDetails = res.UserDetails;
      },
      error => {
        console.log("Error==>", error);
      }
    )
  }

async selectImage() {
  let actionSheet = await this.actionSheetCtrl.create({
    header: 'Select Image Source',
    buttons: [
      {
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();
}

public takePicture(sourceType) {
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    this.uploadImage();
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 

 // Always get the accurate path to your apps folder
 public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
  // File name only
  var filename = this.lastImage;
  var options = {
    fileKey: "profile",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params: { 
      'profile': filename,
      'user_id':this.userId
     }
  };

  const fileTransfer: FileTransferObject = this.transfer.create();
  this.presentLoadingWithOptions();
  fileTransfer.upload(targetPath, environment.apiEndpoint + 'user/business_updateProfilePic', options).then(data => {
    this.presentToast('Image succesful uploaded.');
    var userUpdateImg = JSON.parse(data.response);
   localStorage.setItem('userImage', userUpdateImg.imgUrl);
    this.userProfile();
  this.mainService.profileStatus(true);
  }, err => {
   console.log(err);
    this.presentToast('Error while uploading file.');
  });
}

  
  gotoPage(page) {
    this.router.navigate([page]);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }


  async  presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
   


