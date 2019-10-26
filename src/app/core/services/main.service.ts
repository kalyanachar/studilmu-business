import { Injectable,EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
 @Output() getLoginStatus: EventEmitter<any> = new EventEmitter();
 @Output() getProfileUpdateStatus: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }
  loginStatus(data): Observable<any> {
    if (data = true) {
 
      this.getLoginStatus.emit(true);
      return
    }
  }

profileStatus(data): Observable<any> {
    if (data = true) {
      this.getProfileUpdateStatus.emit(true);
      return
    }
  }
  getAPiKey(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_apikeylist',data)
  }
  login(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/businesslogin', data)
  }
  forgotPassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_forgetpassword', data)
  }

  logout(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/businesslogout', data)
  }
  updatePassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_updatepassword', data)
  }
  listCourse(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_dashboard', data)
  }
  getuserDetails(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_profile', data)
  }

  editProfile(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_editprofile', data)
  }
  getcourseDetails(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_CourseDetails', data)
  }

  activeNextVideo(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_nextLecture', data)
  }

  getquizDetails(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_quizInfo', data)
  }

  getquizQuestion(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_quiz', data)
  }
  getquizQuestionNext(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_quiz_next', data)
  }

  quizAddScore(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_quizAddScore', data)
  }

  quizFinalResult(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_quizFinalResult', data)
  }

  getCertificateDetails(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_certificate', data)
  }

  takeCourse(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_takeCourse', data)
  }

  businessCourseInfo(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'user/business_CourseInfo', data)
  }



}
