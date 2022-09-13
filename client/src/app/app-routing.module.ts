import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewStudentComponent } from './components/new-student/new-student.component';

const routes: Routes = [
  {
    path: 'new-student',
    component: NewStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
