import { Component, Renderer, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser'; //use for fabicon
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Subscription, observable } from 'rxjs';

import { AuthService } from './services/auth/auth.service';
import { CommonUtils } from './services/common-utils/common-utils';

import { environment } from '../environments/environment';

/* tslint:disable */ 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  main_url = environment.apiUrl;
  file_url = environment.fileUrl;

  // variable define
  url_name;
  url_path_name;
  get_user_type;
  panelOpenState: boolean;
  userInfodDataLoading;
  private userInfoSubscribe: Subscription;
  private groupMenuDataSubscribe : Subscription;
  menuPages = [];
  menuPagesList;
  menuPages2 = [];
  activeMenuHilight;
  selectedItemActive;
  parentSelectedIndex;
  childSelectedIndex;
  siteInfo : any;
  isActive : boolean = false;
  siteInfoLoading;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private activatedRoute : ActivatedRoute,
    private http : HttpClient,
    private authService : AuthService,
    public menuCtrl: MenuController,
    public renderer: Renderer2,
    public router : Router,
    private commonUtils: CommonUtils, // common functionlity come here
    @Inject(DOCUMENT) private _document: HTMLDocument //use for fabicon
  ) {

    this.onSiteInformation();
    // this.initializeApp();




    /* this.commonUtils.menuDataobservable.subscribe(menuData =>{
      menuData.forEach(element => {
        element.pages.forEach(element2 => {
       console.log('menu data gurd >>>>>>>>>>>>>>>>>>>>>>>>> element2', element2.type.split('/')[1]);
      this.commonUtils.pagePathNameAnywhereObsv.subscribe(pathRes => {
        // console.log(' url name #### >>', pathRes);
        if(element2.type.split('/')[1] == pathRes){
           console.log('founddddddddddddddddddddddddddddddddddddddddddddddddd');
          //return of(!!isAuthenticated); //(!!) means true or false (boolean value)
        }else{
          console.log('not tt  founddddddddddddddddddddddddddddddddddddddddddddddddd');
          //return of(!!isAuthenticated); //(!!) means true or false (boolean value)
          this.router.navigateByUrl('/auth');
        }
      }); 
        });
      });
    }); */

    /* this.commonUtils.menuDataobservable.subscribe(menuData =>{
      console.log('menu data gurd aa >>>>>>>>>>>>>>>>>>>>>>>>> element2', menuData);
    }); */


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      // user data call
      this.userInfoData();
      
      // ----get current active url name start---
        this.activatedRoute.url.subscribe(activeUrl => {
          this.url_name = window.location.pathname;
          console.log('this.url_name app.componet.ts @@@>>', this.url_name.split('/')[1]);
        })
        
      //get current active url name end

      // observable data for all page url name get
      this.commonUtils.pagePathNameAnywhereObsv.subscribe(pathRes => {
        // console.log('common utility path page url name #### @@@@@@@ >>', pathRes);
        this.url_path_name = pathRes;
      });
      
      
    });
  }
  //------------------- menu item show start------------------------


  

  // menu data call
  mapped;
  userInfoData(){

    // console.log('main componenttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');

    this.menuPages = [];
    this.userInfodDataLoading = false;

    this.authService.globalparamsData.subscribe(res => {
      // console.log('componet.ts Toke store >>>>>>>>>>>>>>>111', res);

      this.menuPages = [];

      if(res != null || res != undefined){
        if(res.token != undefined ){
          this.userInfodDataLoading = true;
          this.userInfoSubscribe = this.http.get('login/userinfo?token='+res.token+'&master='+res.master).subscribe(
            (response:any) => {
            this.userInfodDataLoading = false;

            if(response.return_status > 0){
              //  console.log("user info res ++++++++++++++++++++++++=>", response.return_data.menu_data.list);
              // console.log("user info res menu =====================>", response.return_data.menu_data.list);

              // ================= site information dynamic start ==========
               /*  this.siteInfo = response.return_data.siteinfo;
                this.commonUtils.setSiteInfo(response.return_data.siteinfo);
                console.log('this.siteInfo >>', this.siteInfo);

                // pageTitle
                this._document.getElementById('pageTitle').innerHTML = this.siteInfo.name;

                // fabicon set
                this._document.getElementById('appFavicon').setAttribute('href', this.file_url+'/'+this.siteInfo.favicon); */
              // ================= site information dynamic end ===========

              this.get_user_type = response.return_data.user_type;
              this.commonUtils.setUserType(response.return_data.user_type);
              // console.log('this.get_user_type ^^^^^^^^^^^^^^^^^^^>>>>', this.get_user_type);
              
              this.commonUtils.menuPermissionService(response.return_data.menu_data.permission);
              
              if(response.return_data.user_type == 'group'){
                // group login menu
                this.groupMenuData();
                
              }else{
                // super admin menu

                this.menuPages = []; // menu array delete data first
                
                if(response.return_data.menu_data){

                  if(response.return_data.menu_data.list){
                    this.menuPagesList = response.return_data.menu_data.list;

                    response.return_data.menu_data.list.forEach((val, ind) => {
                      // console.log('val >', val.pages);
                      /* for ( var item in val.pages ){
                        if(val.module_id == val.pages[ item ].module_id){
                          this.menuPages2.push( val.pages[ item ] );
                        }
                      } */
    
                      // object to array convert
                      if(val.pages!= null && val.pages!= '' && val.pages != undefined){
                        this.mapped = Object.keys(val.pages).map(key => ({type: key, value: val.pages[key]}));
                      }
                      
                      // if(val.module_access == 1){
                        this.menuPages.push({'value':val, 'pages':this.mapped});
                        this.commonUtils.getMenudataService(this.menuPages);
                      // }
    
                    });
                  }
                  // console.log('mapped >', this.mapped);
  
                  // console.log("this.menuPages =====================>", this.menuPages);
  
                  // --active menu start---
                  this.panelOpenState = false;
                  if(this.menuPages != undefined || this.menuPages != null ){
  
                    // console.log('this.menuPages =############====>', this.menuPages);
                    // console.log('val2.url @@@@ 11>>', this.url_name);
  
                    this.menuPages.forEach((val, ind) => {
                      if(val.pages != null){
                        val.pages.forEach((val2, ind2) => {
                          if(this.url_path_name == val2.value.page_url.split('/')[1]){
                            val.isOpen = true;
                          }
                          /* else if(this.url_name.split('/')[1] == 'auth'){
                            this.menuCtrl.enable(false);
                          }else{
                            this.menuCtrl.enable(true);
                          } */
                        });
                      }
                    })
                  }
                  //active menu end
                }
              }
              
            }

          },
          errRes => {
            this.userInfodDataLoading = false;
          }
          );
        }
      }
    });
  }

  // group login menu data start
  group_map:any = [];
  groupMenuData(){
    this.userInfodDataLoading = true;
    this.group_map = [];
    this.groupMenuDataSubscribe = this.http.get('groupclient').subscribe(
      (res:any) => {
        console.log("group login view data  res =====================>", res.return_data.client);
        this.userInfodDataLoading = false;
        if(res.return_status > 0){
          this.menuPages = [];
          this.group_map = [];
          this.menuPagesList = res.return_data.client;
          
            // res.return_data.client[0] = 'dashboard';

            res.return_data.client.forEach((val, ind) => {
              // console.log('val >', val.pages);
              /* for ( var item in val.pages ){
                if(val.module_id == val.pages[ item ].module_id){
                  this.menuPages2.push( val.pages[ item ] );
                }
              } */

              // object to array convert
              /* if(val.lender!= null && val.lender!= '' && val.lender != undefined){
                this.mapped = Object.keys(val.lender).map(key => ({type: key, value: val.lender[key]}));
              }
              
              console.log('this.mapped  sss>>', this.mapped); */

              /*  this.mapped = [
                {
                  'page_display_name': 'group_sub_name',
                  'page_url':	'/transaction-list',
                  'page_icon': 'list-box',
                  'value': val
                }
              ]; */

              
              this.group_map = [
                {
                  'page_display_name': 'group_sub_name',
                  'page_url':	'/group-transaction-list',
                  'page_icon': 'list-box'
                }
              ];

              // res.return_data.client[0].module_display_name = 'dashboard';
              /* if(ind == 0){
                val.module_display_name = 'dashboard';
              }else{
                val.module_display_name = val.name;
                val.module_icon = 'list';
              } */
              // this.mapped.value.page_url = '/brokerage-list';

              val.module_display_name = val.name;
              val.module_icon = 'list';

              this.menuPages.push({'value':val, 'pages':this.group_map});
              

              // console.log('this.menuPages sss >>', this.menuPages);
            

            });
        }
      },
      errRes => {
        this.userInfodDataLoading = false;
      }
    );
  }

  // on click function call
  groupLoginData:any = {};
  onClickGroupItem( pIndex, cIndex, indentifire, _item, _itemsArray){

    this.commonUtils.onClickGroupIdentifire(indentifire);
    
    console.log('pIndex >', pIndex);
    console.log('indentifire >', indentifire);
    this.parentSelectedIndex = pIndex;
    this.childSelectedIndex = indentifire;
    this.isActive = !this.isActive;   
    this.groupLoginData = {
      'indentifire':indentifire,
      'item': _item,
      'itemsArray': _itemsArray
    }
    this.commonUtils.onClickGroupItemData(this.groupLoginData);
  }

  // ============site information get start =============
  site_path;
  site_href;
  site_href_split;
  site_path_split;
  site_url_name;
  onSiteInformation(){
    // console.log('this.url_name app.componet.ts  pathname @@@>>',  window.location.pathname);

    this.site_path = window.location.pathname;
    this.site_href = window.location.href;
    this.site_href_split = window.location.href.split('/')[1];
    this.site_path_split = window.location.pathname.split('/')[1];

    // server print reasult///////
    /* site_path > /ci/apniroti/online/ 
    site_href > https://demo.rnjcs.in/ci/apniroti/online/#/auth 
    site_href_split > 
    site_path_split > ci  */

    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.hostname;
    //console.log('parsedUrl> ', parsedUrl);
    console.log('baseUrl> ', baseUrl); // this will print http://example.com or http://localhost:4200
    if(baseUrl == 'localhost' || baseUrl == '192.168.0.10'){
      this.site_url_name = 'http://www.sbsevatrust.com/apniroti/online/#/auth';
      // this.site_url_name = 'https://demo.rnjcs.in/ci/apniroti/online/#/auth';
    }else{
      this.site_url_name = window.location.href;
    }

    this.siteInfoLoading = true;
    this.groupMenuDataSubscribe = this.http.get('siteinfo/sitedetails?link='+this.site_url_name).subscribe(
      (res:any) => {
        // console.log("site info  data  res =====================>", res);
        this.siteInfoLoading = false;
        if(res.return_status > 0){
          this.siteInfo = res.return_data;
          this.commonUtils.setSiteInfo(res.return_data);
          // console.log('this.siteInfo >>', this.siteInfo);

          // pageTitle
          if(res.return_data && res.return_data.name && res.return_data.favicon) {
            // code...
          
          this._document.getElementById('pageTitle').innerHTML = res.return_data.name;

          // fabicon set
          this._document.getElementById('appFavicon').setAttribute('href', this.file_url+'/'+res.return_data.favicon);
          }

          // initializeApp
          this.initializeApp();
        }
      },
      errRes => {
        this.siteInfoLoading = false;
      }
    );
  }
  

    
  // group login menu data end

    /* list = [
        {
          title: 'Dashboard',
          url: '/menu/main',
          icon: 'speedometer'
        },
        {
          title: 'Transaction Management',
          url: '',
          icon: 'card',
          isOpen: false,
          pages: [
            {
              title: 'Add New',
              url: '/add-transaction/add/id',
              icon: 'add'
            },
            {
              title: 'Transaction',
              url: '/transaction-list',
              icon: 'list-box'
            },
            {
              title: 'Interest Incurred',
              url: '/interest-incurred',
              icon: 'list-box'
            },
            {
              title: 'Recieved Payment',
              url: '/recived-payment',
              icon: 'cash'
            },
            {
              title: 'Rejected Payment',
              url: '/reject-payment',
              icon: 'hand'
            },
            {
              title: 'Expiring Transaction',
              url: '/expiring-transaction',
              icon: 'lock'
            },
          ]
        },
        {
          title: 'Brokerage Management',
          url: '/menu/main',
          icon: 'eye-off',
          isOpen: false,
          pages: [
            {
              title: 'Brokerage',
              url: '/brokerage-list',
              icon: 'list'
            },
            {
              title: 'Brokerage Recieved',
              url: '/menu/flutter',
              icon: 'clipboard'
            },
            {
              title: 'Rejected Payment',
              url: '/menu/flutter',
              icon: 'hand'
            },
          ]
        },
        {
          title: 'Report Management',
          url: '/menu/main',
          icon: 'today',
          pages: [
            {
              title: 'Report',
              url: '/menu/ionic',
              icon: 'list-box'
            }
          ]
        },
        {
          title: 'Contact Manager',
          url: '/menu/main',
          icon: 'eye-off',
          isOpen: false,
          pages: [
            {
              title: 'Group',
              url: '/menu/ionic',
              icon: 'people'
            },
            {
              title: 'Lender/Borrower',
              url: '/menu/flutter',
              icon: 'business'
            }
          ]
        },
        {
          title: 'Master Types',
          url: '/menu/main',
          icon: 'medical',
          isOpen: false,
          pages: [
            {
              title: 'Manage Role',
              url: '/menu/ionic',
              icon: 'people'
            },
            {
              title: 'Employee',
              url: '/menu/flutter',
              icon: 'list'
            },
            {
              title: 'Fiscal Year',
              url: '/menu/flutter',
              icon: 'calendar'
            },
            {
              title: 'Account',
              url: '/menu/flutter',
              icon: 'folder'
            },
            {
              title: 'Phone Type',
              url: '/menu/flutter',
              icon: 'call'
            },
            {
              title: 'Email Type',
              url: '/menu/flutter',
              icon: 'mail'
            },
            {
              title: 'Address Type',
              url: '/menu/flutter',
              icon: 'paper-plane'
            }
          ]
        }
    ]; */
  // ------------------- menu item show end------------------------
 
}
