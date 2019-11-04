import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CoursePage } from './course.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";

const routes: Routes = [
  {
    path: '',
    component: CoursePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [CoursePage,MiAccordionComponent],
  declarations: [CoursePage,ExpandableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursePageModule {}
