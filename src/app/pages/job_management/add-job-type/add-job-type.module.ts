import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { AddJobTypePage } from './add-job-type.page';

const routes: Routes = [
  {
    path: '',
    component: AddJobTypePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddJobTypePage]
})
export class AddJobTypePageModule {}
