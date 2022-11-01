import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpEventType } from '@angular/common/http';
 
 
import { CommonUtils } from '../../../services/common-utils/common-utils';
import { AddCommonModelPage } from '../../../pages/modal/add-common-model/add-common-model.page';

/* tslint:disable */ 
@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.page.html',
  styleUrls: ['./add-skill.page.scss'],
})

export class AddSkillPage implements OnInit, OnDestroy {
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
  qualificationList;
  categoryList;
  subjectList;
  ratingList;
  branchList;
  degreeList;
  interestList;
  default_qualification_id;

  // ------ init function call start ------

    commonFunction(){
      // get active url name
      this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
      this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
      this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
      
      // getlist data
      this.getlist('skill/getlist');

      if( this.parms_action_name == 'edit'){
        // form submit api edit
        this.form_api = 'skill/return_edit/'+this.parms_action_id;
      }else{
        // form submit api add
        this.form_api = 'skill/return_add'
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

      // contact multiple
      this.model.pages = [
        {
          "is_default":true
        }
      ];
      
      // address multiple
      this.model.pages_address = [
        {
          "is_default":true
        }
      ];

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
              // qualification_id : res.return_data.qualification_id,
              price : res.return_data.price,
              placement : res.return_data.placement,
              duration : res.return_data.duration,
              requirement : res.return_data.requirement,
              short_description : res.return_data.short_description,
              certification : res.return_data.certification,
              certification_desc : res.return_data.certification_desc,
              description : res.return_data.description,
              company_id: res.return_data.company_id,
              industry_type_id: res.return_data.industry_type_id,
              image: res.return_data.image,
              city : res.return_data.city,
              rating : res.return_data.rating,
              branch : res.return_data.branch,
              // enable :  parseInt(res.return_data.status)
            }; 
            
            // status
            if(res.return_data.status){
              if(res.return_data.status == '1'){
                  this.model.enable = 'true';
              }else{
                  this.model.enable = '';
              }
            }

            // multiple category
            this.model.category = [];
              if(res.return_data.category){
                res.return_data.category.forEach(element => {
                this.model.category.push(element.id);
              });
            }

            // City
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

            // multiple module
            if(res.return_data.module){
              if(res.return_data.module.length > 0){
                this.model.pages = res.return_data.module;
              }else{
                // multiple
                this.model.pages = [
                  {
                    "is_default":true
                  }
                ];
              } 
            }

            // multiple feature
            if(res.return_data.feature){
              if(res.return_data.feature.length > 0){
                this.model.pages_address = res.return_data.feature;
              }else{
                // multiple
                this.model.pages_address = [
                  {
                    "is_default":true
                  }
                ];
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
          this.qualificationList = resData.qualification;
          this.subjectList = resData.qual_subject;
          this.categoryList = resData.category;
          this.companyList = resData.company;
          this.industryList = resData.industry_type;
          this.cityList = resData.city;
          this.ratingList = resData.rating;
          this.branchList = resData.branch;

          if(resData.qualification){

            console.log('Edit Data>>>>>>>>>>>>>', resData.qualification );

            resData.qualification.forEach(value => {
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

          this.router.navigate(['/skill']);

        }

        // this.notifier.notify( type, 'aa' );
  
        if( this.parms_action_name == 'add'){
          // form.reset();
          this.files = [];
          this.model.image = '';
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
  this.model.image2 = '';
}
// Normal file upload end

//----------- reload page start ------------
  reloadPage(){
    if( this.parms_action_name == 'add'){
      this.files = [];
      this.model = {
        enable : 'true'
      };
       // multiple module
      this.model.pages = [
        {
          "is_default":true
        }
      ];

      // multiple feature
      this.model.pages_address = [
        {
          "is_default":true
        }
      ];

    }else{
      this.model = {
        name : this.allEditData.return_data.name,
        // qualification_id : this.allEditData.return_data.qualification_id,
        price : this.allEditData.return_data.price,
        placement : this.allEditData.return_data.placement,
        duration : this.allEditData.return_data.duration,
        requirement : this.allEditData.return_data.requirement,
        short_description : this.allEditData.return_data.short_description,
        certification : this.allEditData.return_data.certification,
        certification_desc : this.allEditData.return_data.certification_desc,
        description : this.allEditData.return_data.description,
        company_id : this.allEditData.return_data.company_id,
        industry_type_id: this.allEditData.return_data.industry_type_id,
        image: this.allEditData.return_data.image,
        city : this.allEditData.return_data.city,
        rating : this.allEditData.return_data.rating,
        branch : this.allEditData.return_data.branch,
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

      // multiple category
      this.model.category = [];
      if(this.allEditData.return_data.category){
        this.allEditData.return_data.category.forEach(element => {
          this.model.category.push(element.id);
        });
      }

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



      // multiple module
      if(this.allEditData.return_data.module.length > 0){
        this.model.pages = this.allEditData.return_data.module;
      }else{
        // multiple
        this.model.pages = [
          {
            "is_default":true
          }
        ];
      } 

      // multiple feature
      if(this.allEditData.return_data.feature.length > 0){
        this.model.pages_address = this.allEditData.return_data.feature;
      }else{
        // multiple
        this.model.pages_address = [
          {
            "is_default":true
          }
        ];
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

// ---texte editor configration start----
config: any = {
  height: 50,
  theme: 'modern',
  // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
  plugins: 'code print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
  toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code',
  image_advtab: true,
  imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
  templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
  ],
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ]
};
// ---texte editor configration end----

// ..... caterory modal start ......
async onCategoryAddModal(_identifier, _item, _items, identifier_type, _type) {
  // console.log('_identifier >>', _identifier);
  let principle_modal;
    principle_modal = await this.modalController.create({
      component: AddCommonModelPage,
      componentProps: { 
        identifier: _identifier,
        identifier_type: identifier_type,
        hidden_type: _type,
        modalForm_item: _item,
        modalForm_array: _items
      }
    });
  
  // modal data back to Component
  principle_modal.onDidDismiss()
  .then((getdata) => {
    console.log('modal getdata category  >>>>>>>>>>>', getdata);
    if(getdata.data == 'submitClose'){
      // this.categoryList = getdata.role;
      this.categoryList = [...getdata.role];
    }

  });

  return await principle_modal.present();
}
// caterory modal end 

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



