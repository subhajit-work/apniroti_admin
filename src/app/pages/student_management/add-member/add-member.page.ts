import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpEventType } from '@angular/common/http';


import { CommonUtils } from '../../../services/common-utils/common-utils';
import { environment } from '../../../../environments/environment';

/* tslint:disable */ 

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})

export class AddMemberPage implements OnInit, OnDestroy {

  main_url = environment.apiUrl;
  file_url = environment.fileUrl;

  constructor(
    private plt: Platform,
    private modalController : ModalController,
    private storage: Storage,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private http : HttpClient,
    private alertController : AlertController,
    private commonUtils: CommonUtils // common functionlity come here
  ) { }

  // variable declartion section
  model: any = {};
  private getListSubscribe: Subscription;
  private uploadSubscribe: Subscription;
  private contactByCompanySubscribe: Subscription;
  private formSubmitSubscribe: Subscription;
  private editDataSubscribe: Subscription;
  curentDate;
  // select checkbox end

//--------------  getlist data fetch start -------------
  transaction_id;
  account
  accountList;
  lender
  lenderList;
  borrower;
  borrowerList;
  principle;
  interest;
  setStartdate;
  setEnddate;
  contact_by_company;
  servicesList;
  selectLoading;
  selectLoadingDepend;
  groupList;
  form_submit_text = 'Submit';
  form_api;
  companyByContact_api;
  uploadURL;
  interestCycle = '1';
  parms_action_name;
  parms_action_id;
  actionHeaderText;
  toggleShow;
  companyList;
  countryList;
  stateList;
  onEditField = 'PUT';
  editLoading;
  allEditData;
  industryList;
  cityList;
  companyCategoryList;
  default_country_id;
  cityMainList;
  industryTypeList;
  roleList;
  getCountryId;
  viewData;

  // ------ init function call start ------

    commonFunction(){
      // get active url name
      this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
      this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
      this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
      
      // getlist data
      this.getlist('student/getlist');

      if( this.parms_action_name == 'edit'){
        // form submit api edit
        this.form_api = 'student/return_edit/'+this.parms_action_id;
      }else{
        // form submit api add
        this.form_api = 'student/return_add'
      }

      // company by contact api
      this.companyByContact_api = 'ajaxs_post/'

      // file upload url
      this.uploadURL = `fileupload?identifier=internalsupportticket`;

      let curentDate = new Date();
      this.setStartdate = moment(curentDate).format('DD/MM/YYYY');

      setInterval(() => {
        this.curentDate = new Date();
      }, 1);

      // init call
      this.init();

    }

    // init
    ngOnInit() {
    //  this.commonFunction();
    }

    ionViewWillEnter() {
      this.commonFunction();
    }
  // init function call end
   
  // ---------- init start ----------
  init(){
    if( this.parms_action_name == 'edit'){
      this.actionHeaderText = 'Edit';
      this.onEditField = 'PUT';

      this.editLoading = true;
      //edit data call
      this.editDataSubscribe = this.http.get(this.form_api).subscribe(
        (res:any) => {
          this.editLoading = false;
          this.viewData = res.return_data;
          console.log("Edit data  res >", this.viewData);
          if(res.return_status > 0){
            this.model = {
              // industry_type : JSON.parse(res.return_data.industry_type),
              fname : res.return_data.fname,
              lname : res.return_data.lname,
              email : res.return_data.email,
              mobile : res.return_data.mobile,
              username : res.return_data.system_generated_username,
              dob : moment(res.return_data.dob).format('DD/MM/YYYY'),
              password : res.return_data.password,
              role_id : res.return_data.role_id,
              adhar_no : res.return_data.adhar_no,
              image : res.return_data.image,
              country_id : res.return_data.country_id,
              state_id : res.return_data.state_id,
              city_id : res.return_data.city_id,
              pin : res.return_data.pin,
              address_1 : res.return_data.address_1,
              address_2 : res.return_data.address_2,
              gender_name : res.return_data.gender_name,
              // superuser : parseInt(res.return_data.superuser),
              // enable : parseInt(res.return_data.status)
            }; 

            // status
            if(res.return_data.status){
              if(res.return_data.status == '1'){
                this.model.enable = 'true';
              }else{
                this.model.enable = '';
              }
            }

            // gps_location
            if(res.return_data.gps_location){
              if(res.return_data.gps_location == '1'){
                this.model.gps_location = 'true';
              }else{
                this.model.gps_location = '';
              }
            }

            // approve
            if(res.return_data.approve){
              if(res.return_data.approve == '1'){
                this.model.approve = 'true';
              }else{
                this.model.approve = '';
              }
            }

            // edit data
            this.allEditData = res;

            if(res.return_data.country_id)
            {
              this.contactByCompany(res.return_data.country_id , 'return_getState', '' );
            }
            if(res.return_data.state_id)
            {
              this.contactByCompany(res.return_data.state_id , 'return_getCity', '' );
            }

            // console.log('country >', this.model.country);
            /* this.model.borrower = [];
            res.return_data.company.forEach(element => {
              this.model.borrower.push(element.contact_id);
            }); */
            // this.selectedPeople = [this.people[0].id, this.people[1].id]
          }
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.editLoading = false;
        }
      );

    }else{
      this.actionHeaderText = 'Add';
      this.reloadPage();
    }
  }
  // ---------- init end ----------

  // ----------------- file upload start -------------
    files: any = [];
    uploadResponseProgress;
    
    // file upload
    uploadFile(_type, e) {
      console.log('e >>>>>>>>>>>>>>>>>>>', e);
      if(_type == 'single'){
        this.files = [];
        let singleFile = e[0];
        this.goForUpload(this.uploadURL, singleFile, this.files);
      }else{
        for (let index = 0; index < e.length; index++) {
          const element = e[index];
          this.goForUpload(this.uploadURL, element, this.files);
        }  
      }
    }
    // goForUpload call
    goForUpload(_url, _getvalue, _filesArray){
      const fd = new FormData();
      fd.append('files', _getvalue, _getvalue.name);

      this.uploadSubscribe = this.http.post<any>(_url, fd, {
        reportProgress: true,
        observe: 'events'
        }).subscribe( event => {
          if(event.type === HttpEventType.UploadProgress){
            this.uploadResponseProgress = Math.round( event.loaded / event.total * 100 );
          }else if(event.type === HttpEventType.Response){
            // console.log('event.body >>>>>', event.body);
            event.body.return_data_mobile.files.id = '';
            _filesArray.push(event.body.return_data_mobile.files);
            this.uploadResponseProgress = 0;
          }
      })
    }
  // file upload end


  //-------------------- pdc file upload start-------------------------
    pdcFiles: any = [];
    pdcUploadResponseProgress = false;
    
    // file upload
    pdcUploadFile(_type, e) {
      this.pdcUploadResponseProgress = true;
      // console.log('e >>>>>>>>>>>>>>>>>>>', e);
      if(_type == 'single'){
        this.pdcFiles = [];
        let singleFile = e[0];
        this.goForUpload(this.uploadURL, singleFile, this.pdcFiles);
      }else{
        for (let index = 0; index < e.length; index++) {
          const element = e[index];
          this.goForUpload(this.uploadURL, element, this.pdcFiles);
        }  
      }
    }
  // pdc file upload end


  onChange(_item){
    console.log("dropdown selected item >", _item);
  }

  // select company
  OnChangeSelect(_item){
    // this.contactByCompany(_item );
  }

  onChangeLocation(_item, _identifire, colon_item){
    let identy;
    if(_identifire == 'state'){
      identy = 'return_getState';

      colon_item.state_id = null;
      colon_item.city_id = null;

      /* this.model.pages_address.forEach(element => {
        if(element.country_id == _item){
          colon_item.state_id = null;
          colon_item.city_id = null;
        }
      }); */
    }else{
      identy = 'return_getCity';
      colon_item.city_id = null;
    }
    this.contactByCompany(_item,  identy, colon_item);
  }

  //contactByCompany
  contactByCompany = function( _id , _name, _colon_item){

    this.selectLoadingDepend = true;
    this.contactByCompanySubscribe = this.http.get(this.companyByContact_api+ _name + '/' + _id).subscribe(
      (res:any) => {
        this.selectLoadingDepend = false;
        if(res.return_status > 0){

          if(_name == 'return_getState'){
            this.stateList = res.return_data.state;
          }else{
            this.cityList = res.return_data.city;
          }
        }
    },
    errRes => {
      this.selectLoadingDepend = false;
    }
    );
  }

  getlist(_getlistUrl){
    this.plt.ready().then(() => {
      this.selectLoading = true;
      this.getListSubscribe = this.commonUtils.getlistCommon(_getlistUrl).subscribe(
        resData => {
          this.selectLoading = false;
          this.roleList = resData.role;
          this.countryList = resData.country.list;

          if(resData.country.list){
            resData.country.list.forEach(value => {
              if(value.id == resData.country.default){
                this.model.country_id = value.id;
                this.getCountryId = value.id;
                this.contactByCompany(this.model.country_id , 'return_getState', '' );
              }
            });
          }
        },
        errRes => {
          this.selectLoading = false;
        }
      );
    });
  }
// getlist data fetch end

// -----datepicker start------
datePickerObj: any = {
  dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
  closeOnSelect: true
};

// get selected date
myFunction(){
  console.log('get seleted date');
}
startdatePickerObj: any = {
  dateFormat: 'DD/MM/YYYY',
  closeOnSelect: true,
  yearInAscending: true
  //inputDate: new Date('2018-08-10'), // default new Date()
};

onDateChangePriDate(_item){
  console.log('onDateChangePriDate >', _item);
  // this.model.start_date = _item;
  this.model.start_date = '';
  this.startdatePickerObj = {
    dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
    fromDate:moment(_item).format('YYYY-DD-MM'),
    closeOnSelect: true,
    yearInAscending: true
  };
}

endDatePickerObj:any = {
  dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
  closeOnSelect: true,
  yearInAscending: true
};

// --- start date select ---
selectCycleDate;
getStartDate;
onDateChangeStartDate(_item){

  console.log('_item  start date select >>>', _item);
  // console.log("aaaaaaaaaaaaaaaaaaa1", moment(new Date()).format('YYYY-MM-DD'));

  this.getStartDate = _item;
  // this.model.start_date = _item;
  this.model.end_date = '';
  this.endDatePickerObj = {
    dateFormat: 'DD/MM/YYYY',
    fromDate:moment(_item).format('YYYY-DD-MM'),
    closeOnSelect: true,
    yearInAscending: true
  };


  //---- set day + count add start----
    this.selectCycleDate = new Date();
    this.selectCycleDate.setDate( this.selectCycleDate.getDate() + 3 );
    // alert('this.date >'+this.selectCycleDate);

    this.model.end_date = moment(this.selectCycleDate).format('DD/MM/YYYY');
  //---- set day + count add end----


}

//----- end date select------
noOfDays;
onDateChangeEndDate(_item){

  console.log('_item end  date select >>>', _item);
  console.log('_item start  date select >>>', this.getStartDate);

  let start_date = moment(this.getStartDate, 'DD/MM/YYYY');
  let end_date = moment(_item, 'DD/MM/YYYY');

  if(this.getStartDate == undefined){
    start_date = moment(this.setStartdate, 'DD/MM/YYYY');
  }else{
    start_date = moment(this.getStartDate, 'DD/MM/YYYY');
  }

  this.model.no_of_days = end_date.diff(start_date, 'days');

  console.log('this.noOfDays >>>>>>>', this.model.no_of_days );

}

//----- no of day select ---
onChangeNoOfDay(_item){
  console.log('no of day select >>>', _item);
  console.log('this.getStartDate >>>', this.getStartDate);
}

// datepicker  end

// ======================== form submit start ===================
clickButtonTypeCheck = '';
form_submit_text_save = 'Save';
form_submit_text_save_another = 'Save & Add Another' ;

// click button type 
clickButtonType( _buttonType ){
  this.clickButtonTypeCheck = _buttonType;
}

onSubmit(form:NgForm){
  console.log("add form submit >", form.value);
  
  if(this.clickButtonTypeCheck == 'Save'){
    this.form_submit_text_save = 'Submitting';
  }else{
    this.form_submit_text_save_another = 'Submitting';
  }

  this.form_submit_text = 'Submitting';

  // get form value
  let fd = new FormData();

  if(this.fileVal) {
  // normal file upload
  fd.append("image", this.fileVal, this.fileVal.name);
  }else{
    fd.append("image", '');
  }

  for (let val in form.value) {
    if(form.value[val] == undefined){
      form.value[val] = '';
    }
    fd.append(val, form.value[val]);
  };

  console.log('value >', fd);

  if(!form.valid){
    return;
  }

  this.formSubmitSubscribe = this.http.post(this.form_api, fd).subscribe(
    (response:any) => {

      if(this.clickButtonTypeCheck == 'Save'){
        this.form_submit_text_save = 'Save';
      }else{
        this.form_submit_text_save_another = 'Save & Add Another';
      }
      this.form_submit_text = '';
      console.log("add form response >", response);

      if(response.return_status > 0){
        this.files = [];
        this.pdcFiles = [];
        // this.commonUtils.presentToast(response.return_message);
        this.commonUtils.presentToast('success', response.return_message);

        if(this.clickButtonTypeCheck == 'Save'){

          this.router.navigate(['/member']);

        }

        // this.notifier.notify( type, 'aa' );
  
        if( this.parms_action_name == 'add'){
          // form.reset();
          this.files = [];
          this.model.profile = '';
          this.model = {};
          this.reloadPage();

          this.contactByCompany(this.getCountryId , 'return_getState', '' );

        }

        
        
      }
    },
    errRes => {
      if(this.clickButtonTypeCheck == 'Save'){
        this.form_submit_text_save = 'Save';
      }else{
        this.form_submit_text_save_another = 'Save & Add Another';
      }
      this.form_submit_text = '';
    }
  );

}
// form submit end

// delete uploaded file Aleart Start

  // @ViewChild('fileInput') fileInputVariable: ElementRef;

  async deleteAlertConfirm(_itemsArray, _index) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Do you really want to delete selected item ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'popup-cancel-btn',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          cssClass: 'popup-ok-btn',
          handler: () => {
            // console.log('Confirm Okay');
            _itemsArray.splice(_index, 1);
            // this.fileInputVariable.nativeElement.value = "";

          }
        }
      ]
    });

    await alert.present();
  }
// delete  Aleart End

// Normal file upload
fileVal;
normalFileUpload(event) {
  this.fileVal =  event.target.files[0];
  this.model.image =  event.target.files[0].name;
}
fileCross(_item1){
  this.model.image = '';
  this.model.profile2 = '';
}
// Normal file upload end

//----------- reload page start ------------
  reloadPage(){
    if( this.parms_action_name == 'add'){
      this.files = [];
      this.model = {
        enable : 'true'
      };
    }else{
      this.model = {
        fname : this.allEditData.return_data.fname,
        lname : this.allEditData.return_data.lname,
        email : this.allEditData.return_data.email,
        mobile : this.allEditData.return_data.mobile,
        username : this.allEditData.return_data.system_generated_username,
        password : this.allEditData.return_data.password,
        role_id : this.allEditData.return_data.role_id,
        adhar_no : this.allEditData.return_data.adhar_no,
        image : this.allEditData.return_data.image,
        country_id : this.allEditData.return_data.country_id,
        state_id : this.allEditData.return_data.state_id,
        city_id : this.allEditData.return_data.city_id,
        gender_name : this.allEditData.return_data.gender_name,
        pin : this.allEditData.return_data.pin,
        address_1 : this.allEditData.return_data.address_1,
        address_2 : this.allEditData.return_data.address_2,
        dob : moment(this.allEditData.return_data.dob).format('DD/MM/YYYY'),
        // superuser : parseInt(this.allEditData.return_data.superuser),
        // enable : parseInt(this.allEditData.return_data.status)
      };
      
      // status
      if(this.allEditData.return_data.status){
        if(this.allEditData.return_data.status == '1'){
            this.model.enable = 'true';
        }else{
            this.model.enable = '';
        }
      }

      // gps_location
      if(this.allEditData.return_data.gps_location){
        if(this.allEditData.return_data.gps_location == '1'){
          this.model.gps_location = 'true';
        }else{
          this.model.gps_location = '';
        }
      }

      // approve
      if(this.allEditData.return_data.approve){
        if(this.allEditData.return_data.approve == '1'){
          this.model.approve = 'true';
        }else{
          this.model.approve = '';
        }
      }
      
    }
  }
  // reload alert
  async reloadPageAlert() {
    const reload = await this.alertController.create({
      header: 'Reload',
      message: 'Do you really want to Reload?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'popup-cancel-btn',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          cssClass: 'popup-ok-btn',
          handler: () => {
            // console.log('Confirm Okay');
            this.reloadPage();

          }
        }
      ]
    });

    await reload.present();
  }
// reload page end

// addItem contact
addItem(_items, _item){
  // this.commonUtils.addToItem(_items);
  // _items.push(_item);

  _items.push({"is_default":true});
  // console.log('_items >>>>>>>>.', _items);
  
}

// remove item contact
removeItem(index, event, items, action, isDefault){
  this.commonUtils.removeToItem(index, event, items, action, isDefault);
}

// ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.getListSubscribe !== undefined){
      this.getListSubscribe.unsubscribe();
    }
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
    if(this.contactByCompanySubscribe !== undefined){
      this.contactByCompanySubscribe.unsubscribe();
    }
    if(this.uploadSubscribe !== undefined){
      this.uploadSubscribe.unsubscribe();
    }
    if(this.editDataSubscribe !== undefined ){
      this.editDataSubscribe.unsubscribe();
    }
  }
// destroy subscription end
}