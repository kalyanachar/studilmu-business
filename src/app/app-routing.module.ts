import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'aftersplash', pathMatch: 'full'},
 // { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'profileview', loadChildren: './profileview/profileview.module#ProfileviewPageModule' },
  { path: 'profileedit', loadChildren: './profileedit/profileedit.module#ProfileeditPageModule' },
  { path: 'companyprofile', loadChildren: './companyprofile/companyprofile.module#CompanyprofilePageModule' },
  { path: 'listcourse', loadChildren: './listcourse/listcourse.module#ListcoursePageModule' },
  { path: 'coursedetails', loadChildren: './coursedetails/coursedetails.module#CoursedetailsPageModule' },
  { path: 'aftersplash', loadChildren: './aftersplash/aftersplash.module#AftersplashPageModule' },
  { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'course/:id', loadChildren: './course/course.module#CoursePageModule' },
  { path: 'coursefeedback/:id', loadChildren: './coursefeedback/coursefeedback.module#CoursefeedbackPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'quiz/:id', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'video', loadChildren: './video/video.module#VideoPageModule' },
  { path: 'quizdetails/:id', loadChildren: './quizdetails/quizdetails.module#QuizdetailsPageModule' },
  { path: 'certificate/:cid/:quizid/:companyid', loadChildren: './certificate/certificate.module#CertificatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
