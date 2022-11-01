import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { IndustryTypeListPage } from './industry-type-list.page';

const routes: Routes = [
  {
    path: '',
    component: IndustryTypeListPage
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
  declarations: [IndustryTypeListPage]
})
export class IndustryTypeListPageModule {}
