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
  selector: 'app-add-skill-qualification',
  templateUrl: './add-skill-qualification.page.html',
  styleUrls: ['./add-skill-qualification.page.scss'],
})

export class AddSkillQualificationPage implements OnInit, OnDestroy {
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

    // ------ init function call start ------

      commonFunction(){
        // get active url name
        this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
        this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
        this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
        
        // getlist data
        // this.getlist('skill_qualification/getlist');

        if( this.parms_action_name == 'edit'){
          // form submit api edit
          this.form_api = 'skill_qualification/return_edit/'+this.parms_action_id;
        }else{
          // form submit api add
          this.form_api = 'skill_qualification/return_add'
        }

        // company by contact api
        // this.companyByContact_api = 'contact_bycompany/'

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
                // industry_type : JSON.parse(res.return_data.industry_type),
                name : res.return_data.name,
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

              // edit data
              this.allEditData = res;

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
      this.contactByCompany(_item );
    }

    //contactByCompany
    contactByCompany = function( _id ){
      this.selectLoadingDepend = true;
      this.contactByCompanySubscribe = this.http.get(this.companyByContact_api+_id).subscribe(
        res => {
        this.selectLoadingDepend = false;
        console.log("contactByCompany res >", res);
        this.contact_by_company = res.return_data.contact
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
            this.companyList = resData.company_type;
            this.industryList = resData.industry_type;
            this.cityList = resData.city;
            this.stateList = resData.state;
            this.countryList = resData.country;
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

    /* if(this.fileVal) {
    // normal file upload
    fd.append("company_logo", this.fileVal, this.fileVal.name);
    }else{
      fd.append("company_logo", '');
    } */

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

            this.router.navigate(['/skill_qualification']);

          }

          // this.notifier.notify( type, 'aa' );
    
          if( this.parms_action_name == 'add'){
            // form.reset();
            this.files = [];
            this.model.profile = '';
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
      this.model.profile =  event.target.files[0].name;
    }
    fileCross(_item1){
      this.model.profile = '';
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
          name : this.allEditData.return_data.name,
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



