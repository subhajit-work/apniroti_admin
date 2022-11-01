import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpEventType } from '@angular/common/http';


import { CommonUtils } from '../../../services/common-utils/common-utils';

/* tslint:disable */ 
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.page.html',
  styleUrls: ['./add-job.page.scss'],
})

export class AddJobPage implements OnInit, OnDestroy {
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
  qualificationList;
  onEditField = 'PUT';
  editLoading;
  allEditData;
  jobTypeList;
  cityList;
  salaryTypeList;
  industryTypeList;
  subjectList;
  degreeList;
  interestList;
  default_qualification_id;
  checkSalaryRequired = false;

  // ------ init function call start ------

    commonFunction(){
      // get active url name
      this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
      this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
      this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
      
      // getlist data
      this.getlist('job/getlist');

      if( this.parms_action_name == 'edit'){
        // form submit api edit
        this.form_api = 'job/return_edit/'+this.parms_action_id;
      }else{
        // form submit api add
        this.form_api = 'job/return_add'
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
          console.log("Edit data  res >", res.return_data);
          if(res.return_status > 0){
            this.model = {
              name : res.return_data.name,
              company_id: res.return_data.company_id,
              job_type_id : res.return_data.job_type_id,
              // date_time:  moment(res.return_data.date_time).format(),
              salary_min: res.return_data.salary_min,
              salary_max: res.return_data.salary_max,
              salary_type: res.return_data.salary_type,
              position: res.return_data.position,
              notice_period: res.return_data.notice_period,
              industry_type_id: res.return_data.industry_type_id,
              summary: res.return_data.summary,
              responsibility: res.return_data.responsibility,
              skill: res.return_data.skill,
              // exp_qualification: res.return_data.exp_qualification,
              benefit: res.return_data.benefit,
              email: res.return_data.email,
              phone: res.return_data.phone,
              link: res.return_data.link,
              // enable: res.return_data.status

            }; 

            // status
            if(res.return_data.status){
              if(res.return_data.status == '1'){
                this.model.enable = 'true';
              }else{
                this.model.enable = '';
              }
            }

            // show_company_details
            if(res.return_data.show_company_details){
              if(res.return_data.show_company_details == '1'){
                this.model.show_company_details = 'true';
              }else{
                this.model.show_company_details = '';
              }
            }

            if(res.return_data.expiry_date){
              this.model.expiry_date = moment(res.return_data.expiry_date).format('DD/MM/YYYY');
            }

            // if job type walk in then date show
            if(res.return_data.job_type_id == '9'){
              this.model.date_time =  moment(res.return_data.date_time).format();
            }else{
              this.model.date_time = '';
            }

            this.dateTimeFormatChangeValue = moment(res.return_data.date_time).format("YYYY-MM-DD HH:mm:ss");

            // public invalidMoment =  new Date(2018, 2, 15, 9, 30);

            // edit data
            this.allEditData = res;

            // console.log('country >', this.model.country);
            this.model.city = [];
            res.return_data.city.forEach(element => {
              this.model.city.push(element.id);
            });
            

            // qualification
            if(res.return_data.qualification){
              this.model.qualification = [];
              res.return_data.qualification.forEach(element => {
                this.model.qualification.push(element.id);
              });

              let identy;
              identy = 'return_getDegree?qualification';

              this.contactByCompany(this.model.qualification,  identy, '');
            }

            // Degree
            if(res.return_data.qual_degree){
              this.model.qual_degree = [];
              res.return_data.qual_degree.forEach(element => {
                this.model.qual_degree.push(element.id);
              });

              let identy;
              identy = 'return_getInterest?degree';

              this.contactByCompany(this.model.qual_degree,  identy, '');
            }

            // Area of Interest
            if(res.return_data.qual_interest){
              this.model.qual_interest = [];
              res.return_data.qual_interest.forEach(element => {
                this.model.qual_interest.push(element.id);
              });
            }

            // Subject
            if(res.return_data.qual_subject){
              this.model.qual_subject = [];
              res.return_data.qual_subject.forEach(element => {
                this.model.qual_subject.push(element.id);
              });
            }
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

  onChangeCompany(_item){
    /* console.log('companyList _item>', _item);
    console.log('companyList >', this.companyList); */
    if(this.companyList){
      this.companyList.forEach(element => {
        if(element.id == _item){
          // console.log('element >>', element);
          this.model.email = element.email;
          this.model.phone = element.phone;
        }
      });
    }
  }

  // select company
  OnChangeSelect(_item){
    // this.contactByCompany(_item );
  }

  onChangeStudy(_item, _identifire, colon_item){
    let identy;
    if(_identifire == 'degree'){
      identy = 'return_getDegree?qualification';

      this.model.qual_degree = null;
      this.model.qual_interest = null;
    }else{
      identy = 'return_getInterest?degree';
      this.model.qual_interest = null;
    }
    this.contactByCompany(_item,  identy, colon_item);
  }

  //contactByCompany
  contactByCompany = function( _id , _name, _colon_item){
    this.selectLoadingDepend = true;
    this.contactByCompanySubscribe = this.http.get(this.companyByContact_api+ _name + '=' +_id).subscribe(
      (res:any) => {
      this.selectLoadingDepend = false;
      console.log("contactByCompany res >", res);
      this.contact_by_company = res.return_data.contact

      if(res.return_status > 0){

        if(_name == 'return_getDegree?qualification'){
          this.degreeList = res.return_data.degree;
        }else{
          this.interestList = res.return_data.interest;
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
          this.companyList = resData.company;
          this.qualificationList = resData.qualification;
          this.subjectList = resData.qual_subject;
          this.cityList = resData.city;
          this.jobTypeList = resData.job_type;
          this.salaryTypeList = resData.salary_type;
          this.industryTypeList = resData.industry_type;;

          if(resData.qualification.list){
            resData.qualification.list.forEach(value => {
              if(value.id == resData.qualification.default){
                this.default_qualification_id = value.id;
                this.model.qualification = value.id;
                this.contactByCompany(this.default_qualification_id , 'return_getDegree', '' );
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
    dateFormat: 'DD/MM/YYYY' // default DD MMM YYYY
  };

  // get selected date
  myFunction(){
    console.log('get seleted date')
  }

  startdatePickerObj: any = {
    dateFormat: 'DD/MM/YYYY',
    closeOnSelect: true,
    yearInAscending: true
    //inputDate: new Date('2018-08-10'), // default new Date()
  };

  timePickerObj: any = {
    /* timeFormat: '', // default 'hh:mm A'
    setLabel: 'Set', // default 'Set'
    closeLabel: 'Close', // default 'Close'
    titleLabel: 'Select a Time', // default 'Time'
    clearButton: false, // default true
    btnCloseSetInReverse: true, // default false
    momentLocale: 'pt-BR', //  default 'en-US' */
  };
  
// datepicker 

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

          this.router.navigate(['/job']);

        }

        // this.notifier.notify( type, 'aa' );
  
        if( this.parms_action_name == 'add'){
          // form.reset();
          this.model = {};
          this.reloadPage();
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

  @ViewChild('fileInput') fileInputVariable: ElementRef;

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
            this.fileInputVariable.nativeElement.value = "";

          }
        }
      ]
    });

    await alert.present();
  }
// delete  Aleart End

//----------- reload page start ------------
  reloadPage(){
    if( this.parms_action_name == 'add'){
      this.files = [];
      this.model = {
        enable : 'true'
      };
    }else{
      this.model = {
        name : this.allEditData.return_data.name,
        company_id: this.allEditData.return_data.company_id,
        job_type_id : this.allEditData.return_data.job_type_id,
        // date_time: moment(this.allEditData.return_data.date_time).format(),
        salary_min: this.allEditData.return_data.salary_min,
        salary_max: this.allEditData.return_data.salary_max,
        salary_type: this.allEditData.return_data.salary_type,
        position: this.allEditData.return_data.position,
        notice_period: this.allEditData.return_data.notice_period,
        industry_type_id: this.allEditData.return_data.industry_type_id,
        summary: this.allEditData.return_data.summary,
        responsibility: this.allEditData.return_data.responsibility,
        skill: this.allEditData.return_data.skill,
        // exp_qualification: this.allEditData.return_data.exp_qualification,
        benefit: this.allEditData.return_data.benefit,
        email: this.allEditData.return_data.email,
        phone: this.allEditData.return_data.phone,
        link: this.allEditData.return_data.link,
        // enable: this.allEditData.return_data.status

      }; 

      // status
      if(this.allEditData.return_data.status){
        if(this.allEditData.return_data.status == '1'){
          this.model.enable = 'true';
        }else{
          this.model.enable = '';
        }
      }

      // show_company_details
      if(this.allEditData.return_data.show_company_details){
        if(this.allEditData.return_data.show_company_details == '1'){
          this.model.show_company_details = 'true';
        }else{
          this.model.show_company_details = '';
        }
      }

      if(this.allEditData.return_data.expiry_date){
        this.model.expiry_date = moment(this.allEditData.return_data.expiry_date).format('DD/MM/YYYY');
      }

      // if job type walk in then date show
      if(this.allEditData.return_data.job_type_id == '9'){
        this.model.date_time =  moment(this.allEditData.return_data.date_time).format();
      }else{
        this.model.date_time = '';
      }

      // console.log('country >', this.model.country);
      this.model.city = [];
      this.allEditData.return_data.city.forEach(element => {
        this.model.city.push(element.id);
      });

      // qualification
      if(this.allEditData.return_data.qualification){
        this.model.qualification = [];
        this.allEditData.return_data.qualification.forEach(element => {
          this.model.qualification.push(element.id);
        });
      }

      // Degree
      if(this.allEditData.return_data.qual_degree){
        this.model.qual_degree = [];
        this.allEditData.return_data.qual_degree.forEach(element => {
          this.model.qual_degree.push(element.id);
        });
      }

      // Area of Interest
      if(this.allEditData.return_data.qual_interest){
        this.model.qual_interest = [];
        this.allEditData.return_data.qual_interest.forEach(element => {
          this.model.qual_interest.push(element.id);
        });
      }

      // Subject
      if(this.allEditData.return_data.qual_subject){
        this.model.qual_subject = [];
        this.allEditData.return_data.qual_subject.forEach(element => {
          this.model.qual_subject.push(element.id);
        });
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
//-------------- date time picker function call start ------------
dateTimeFormatChangeValue;
dateTimePickerChange(_item){
  this.dateTimeFormatChangeValue = moment(_item).format("YYYY-MM-DD HH:mm:ss");
  console.log('date get >', this.dateTimeFormatChangeValue);
}

// onChangeJobType
onChangeJobType(_item){
  console.log('_item >', _item);
  if( this.parms_action_name == 'add'){
    if(_item != '9'){
      this.model.date_time =  '';
    }
  }else{
    if(_item != '9'){
      this.model.date_time =  '';
    }else{
      this.model.date_time =  moment(this.allEditData.return_data.date_time).format();
    }
  }

}

// crossDateTime
crossDateTime(_show, _input){
  this.model.date_time = '';
  this.dateTimeFormatChangeValue = '';
}

// date time picker function call end

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



