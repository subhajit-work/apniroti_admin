import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { SubscriberPage } from './subscriber.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberPage
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
  declarations: [SubscriberPage]
})
export class SubscriberPageModule {}
