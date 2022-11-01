import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController, ToastController, MenuController } from '@ionic/angular';


import { CommonUtils } from './../../services/common-utils/common-utils';

import { environment } from '../../../environments/environment';

declare var $ :any; //jquary declear

/* tslint:disable */ 
@Component({
  selector: 'app-dashboard',
templateUrl: './dashboard.page.html',
styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  main_url = environment.apiUrl;
  file_url = environment.fileUrl;


  // ----- pie chart start -----------
  /* public data: any[] = [{
    kind: 'Job Posted', share: 30
  }, {
    kind: 'Job Applied', share: 20
  }, {
    kind: 'Skill', share: 25.8
  }, {
    kind: 'Skill Ordered', share: 15
  }, {
    kind: 'Student Registered', share: 15
  }, {
    kind: 'Attempted Assessment', share: 10
  }];
 */
// ----- pie chart end -----------

  // variable declartion section
  model: any = {};
  isListLoading = false;
  page = 1;
  noDataFound = true;
  fetchItems;
  tableHeaderData;
  tableHeaderDataDropdown;
  current_url_path_name;
  private dashboardDataSubscribe: Subscription;
  parms_action_id;
  listing_view_url;
  viewLoadData;
  viewData;
  dashboardData;
  dashboardDataChartColor = [];

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private http : HttpClient,
    private commonUtils : CommonUtils,
    public menuCtrl: MenuController,
  ) { }

  // tslint:disable-next-line: comment-format
  // pager object
  pager: any = {};
  // paged items
  pageItems: any[];

  listAlldata;
  curentDate;
  setStartdate;

  // ------ init function call start -------
  commonFunction(){
    // get active url name
    this.current_url_path_name =  this.router.url.split('/')[1] + 'ColumnSelect';
    this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);

    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
    
    // view page url name
    // this.listing_view_url = `dashboard/return_index?link=${}` ;

    // view data call   
    this.dashboardDataSubscribe = this.commonUtils.getSiteInfoObservable.subscribe(res =>{
      console.log('getSiteInfoObservable res DASHBOARD >>>>>>>>>>>>>>>>>>>.. >', res);
      this.dashboardDataChartColor = [];
      if(res){

        // view page url name
        this.listing_view_url = `dashboard/return_index?link=${res.link}` ;
        this.viewPageData();
        
      }
    })


    let curentDate = new Date();
    this.setStartdate = moment(curentDate).format('DD/MM/YYYY');

    setInterval(() => {
      this.curentDate = new Date();
    }, 1);
    
  }

  ngOnInit() {
    // menu hide
    this.menuCtrl.enable(true);
  }

  // ion View Will Enter call
  ionViewWillEnter() {
    this.commonFunction();
    
  }


  // open description
  openDescription(event, _item, _items){
    _item.isOpenDescription = !_item.isOpenDescription;

    /* _items.forEach(element => {
      element.isOpenDescription = false;
    });
    if(_item){
      _item.isOpenDescription = true;
    } */
  }

  // ================== view data fetch start =====================
    viewPageData(){
      this.viewLoadData = true;
      this.dashboardDataSubscribe = this.http.get(this.listing_view_url).subscribe(
        (res:any) => {
          this.viewLoadData = false;
          console.log("view data  res -------------------->", res.return_data);
          if(res.return_status > 0){
            this.viewData = res.return_data;
            this.dashboardData = res.return_data;

              if(res.return_data.dashboard){
                res.return_data.dashboard.forEach(element => {
                  this.dashboardDataChartColor.push(element.color);
                });
              }
              console.log('DASHBOARD CHART COLOR => ',  this.dashboardDataChartColor);
          }
        },
        errRes => {
          this.viewLoadData = false;
        }
      );
    }
  // view data fetch end


  // ----------- destroy subscription start ---------
    ngOnDestroy() {
      if(this.dashboardDataSubscribe !== undefined){
        this.dashboardDataSubscribe.unsubscribe();
      }
    }
  // destroy subscription end
}
  

