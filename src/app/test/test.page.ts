import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../core/validators/username.validator';
import { PhoneValidator } from '../core/validators/phone.validator';
import { PasswordValidator } from '../core/validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { Router } from '@angular/router';

// RxJs
import { Subject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { BitrateOption, VgAPI } from 'videogular2/compiled/core';
// import { IDRMLicenseServer } from 'videogular2/compiled/streaming';
// import { VgDASH } from 'videogular2/compiled/src/streaming/vg-dash/vg-dash';
// import { VgHLS } from 'videogular2/compiled/src/streaming/vg-hls/vg-hls';

// export interface IMediaStream {
//   type: 'vod' | 'dash' | 'hls';
//   source: string;
//   label: string;
//   token?: string;
//   licenseServers?: IDRMLicenseServer;
// } 

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  // @ViewChild(VgDASH, { static: true }) vgDash: VgDASH;
  // @ViewChild(VgHLS, { static: true }) vgHls: VgHLS;
  // currentStream: IMediaStream;
  // api: VgAPI;
  // public routerData: any;
  // bitrates: BitrateOption[];
  // streamsList: IMediaStream[] = [
  //   {
  //     type: 'vod',
  //     label: 'VOD',
  //     source: 'https://s3-ap-southeast-1.amazonaws.com/s3-studilmu-ap-southeast-1.amazonaws.com/lecture_video/5a0ec9cee1bee.mp4'
  //   },
  //   {
  //     type: 'dash',
  //     label: 'DASH: Multi rate Streaming',
  //     source: 'http://dash.edgesuite.net/akamai/bbb_30fps/bbb_30fps.mpd'
  //   },
  //   {
  //     type: 'dash',
  //     label: 'DASH: Live Streaming',
  //     source: 'https://24x7dash-i.akamaihd.net/dash/live/900080/dash-demo/dash.mpd'
  //   },
  //   {
  //     type: 'dash',
  //     label: 'DASH: DRM with Widevine',
  //     source: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd',
  //     licenseServers: {
  //         'com.widevine.alpha': {
  //             serverURL: 'https://widevine-proxy.appspot.com/proxy'
  //         }
  //     }
  //   },
  //   {
  //     type: 'hls',
  //     label: 'HLS: Streaming',
  //     source: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
  //   }
  // ];
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slidesOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) { translateX = 0; }
          if (Math.abs(translateY) < 0.001) { translateY = 0; }
          if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
          if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
          if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
            if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
          }
        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  };

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  genders: Array<string>;








  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.countries = [
      new CountryPhone('UY', 'Uruguay'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('BR', 'Brasil')
    ];

    this.genders = [
      "Male",
      "Female"
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      country_phone: this.country_phone_group,
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  // onSubmit(values){
  //   console.log(values);
  //   this.router.navigate(["/user"]);
  // }


  // onPlayerReady(api: VgAPI) {
  //   this.api = api;
  // }

  // setBitrate(option: BitrateOption) {
  //   switch (this.currentStream.type) {
  //       case 'dash':
  //           this.vgDash.setBitrate(option);
  //           break;

  //       case 'hls':
  //           this.vgHls.setBitrate(option);
  //           break;
  //   }
  // }
  // onClickStream(stream: IMediaStream) {
  //   this.api.pause();
  //   this.bitrates = null;

  //   const timerStore: Subscription = timer(0, 10).subscribe(
  //       val => {
  //           this.currentStream = stream;
  //           timerStore.unsubscribe();
  //       }
  //   );
  // }

}
