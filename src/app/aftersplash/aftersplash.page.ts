import { Component, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
@Component({
  selector: 'app-aftersplash',
  templateUrl: './aftersplash.page.html',
  styleUrls: ['./aftersplash.page.scss'],
})
export class AftersplashPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.getApiKey();
  }
  skip() { 
  }
  getApiKey() {
    var data = {
      "keyDetails":1
    }

  }

}
