import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, Platform, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { CommonUtils } from '../../../services/common-utils/common-utils';
import { environment } from '../../../../environments/environment';


/* tslint:disable */ 
@Component({
  selector: 'app-add-common-model',
  templateUrl: './add-common-model.page.html',
  styleUrls: ['./add-common-model.page.scss'],
})
export class AddCommonModelPage implements OnInit, OnDestroy {
  
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  
  // variable declar
  model: any = {};
  form_submit_text = 'Submit';
  private formSubmitSubscribe: Subscription;
  private editDataSubscribe: Subscription;
  private getListSubscribe: Subscription;
  setStartdate;
  api_url;

  get_identifier;
  get_item;
  get_array;
  heder_title;
  onEditField = 'PUT';
  showSubmitButton = true;
  previewOtherUrl;
  principleStartdate;
  get_identifier_type;
  onHiddenFieldIdentifire;
  get_hidden_type;
  onHiddenFieldStatus;
  selectLoading;

  parentList;

  // @Input() identifire;
  
  constructor(
    private plt: Platform,
    private modalController : ModalController,
    private http : HttpClient,
    private navParams : NavParams,
    private commonUtils: CommonUtils // common functionlity come here
  ) { }

  ngOnInit() {

    // today select
    let curentDate = new Date();
    this.setStartdate = moment(curentDate).format('DD/MM/YYYY');

    // this.model.setStartdate = moment(curentDate).format('DD/MM/YYYY');

    this.get_identifier =  this.navParams.get('identifier');
    this.get_identifier_type =  this.navParams.get('identifier_type');
    this.get_hidden_type =  this.navParams.get('hidden_type');

    this.get_item =  this.navParams.get('modalForm_item');
    this.get_array =  this.navParams.get('modalForm_array');
    console.log('this.get_item >>>>>>>>>>>>>>', this.get_item);

    if(this.get_identifier == 'csv_upload')
    {
      this.heder_title = 'Import Question';
      this.onEditField = 'PUT';
      this.api_url = 'question/upload_csv';
      
      // this.model.image = '';
      
    }else if(this.get_identifier == 'student_csv_upload'){
      this.heder_title = 'Import Student';
      this.onEditField = 'PUT';
      this.api_url = 'student/upload_csv';
    }else if(this.get_identifier == 'file_preview'){
      this.heder_title = 'Preview';
      this.showSubmitButton = false;
      this.previewOtherUrl = this.main_url+'/'+this.get_item.file_path;
    }else if(this.get_identifier == 'change_password_modal'){
      this.heder_title = 'Change Password';
      this.onEditField = 'PUT';
      this.api_url = 'login/change_password/'+ this.get_item.id;
    }else if(this.get_identifier == 'profile_update_modal'){
      this.heder_title = 'Profile';
      this.onEditField = 'PUT';
      this.api_url = 'user/'+ this.get_item.id;

      // edit page data
      this.editPagaDataCall('group', this.get_item);

    }else if(this.get_identifier == 'category'){
      this.onHiddenFieldIdentifire = this.get_hidden_type;
      this.onEditField = 'PUT';
      this.onHiddenFieldStatus = 'true';

      // getlist data
      this.getlist('category/getlist');
      
      // this.api_url = 'user/'+ this.get_item.id;
      if(this.get_identifier_type == 'add'){
        this.heder_title = 'Add Category';
        this.api_url = 'category/return_add'
      }else{
        this.heder_title = 'Edit Category';
        this.api_url = 'category/return_edit/'+this.get_item.id;

        // edit page data
        this.editPagaDataCall('category/return_edit', this.get_item);
      }

    }


  }

  // ======================== form submit start ===================
    onSubmit(form:NgForm){
      this.form_submit_text = 'Submitting';

      // get form value
      let fd = new FormData();
      for (let val in form.value) {
        if(form.value[val] == undefined){
          form.value[val] = '';
        }
        fd.append(val, form.value[val]);

        if(this.get_identifier == 'csv_upload' || this.get_identifier == 'student_csv_upload'){
          if(this.fileVal) {
            // normal file upload
          fd.append("csvFile", this.fileVal, this.fileVal.name);
          }else{
            fd.append("csvFile", '');
          }
        }

      };

      if(!form.valid){
        return;
      }
      this.formSubmitSubscribe = this.http.post(this.api_url, fd).subscribe(
        (response:any) => {
          this.form_submit_text = 'Submit';
          if(response.return_status > 0){

            // category
            if(this.get_identifier == 'category'){
              this.get_array.push(response.return_data);
              this.modalController.dismiss('submitClose', this.get_array);
            }else if(this.get_identifier == 'csv_upload' || this.get_identifier == 'student_csv_upload'){
              this.fileCross();
              this.modalController.dismiss('submitClose');
            }

            this.commonUtils.presentToast('success', response.return_message);
            form.reset();
            this.modalController.dismiss('submitClose');
          }
        },
        errRes => {
          this.form_submit_text = 'Submit';
        }
      );

    }
  // form submit end

  // onChange dropdown
  onChange(event){

  }

  // close modal
  closeModal() {
    // this.modalController.dismiss(this.arrayList);
    this.modalController.dismiss();
  }

  // -----datepicker start------

    datePickerObj: any = {
      dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
      toDate: new Date(),
      closeOnSelect: true,
      yearInAscending: true
    };

    principledatePickerObj: any = {
      dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
      closeOnSelect: true,
      yearInAscending: true
    };

    // get selected date
    myFunction(){
      console.log('get seleted date')
    }
// datepicker 

  // -------------- edit page api call start  ------------
    profileLoading;
    allClient;
    editPagaDataCall(api_name, _item){
      // console.log('aa _item >', _item.toString());
      this.onEditField = 'PUT';
      this.profileLoading = true;
      //edit data call
      this.editDataSubscribe = this.http.get(api_name+'/'+_item.id).subscribe(
        (res:any) => {
          this.profileLoading = false;
          console.log("Edit data  res profile >", res.return_data);
          if(res.return_status > 0){

            // category
            if(this.get_identifier == 'category'){
              this.model = {
                name : res.return_data.name,
                seo: res.return_data.seo,
                parent_id: res.return_data.parent_id,
                description: res.return_data.description
              }; 
            }

            this.model = {
              name : res.return_data.name,
              // borrower : JSON.parse(res.return_data.client[0].id),
              // enable : res.return_data.status,
              is_login : res.return_data.is_login,
              description : res.return_data.description
            };

            // status
            if(res.return_data.status){
              if(res.return_data.status == '1'){
                  this.model.enable = 'true';
              }else{
                  this.model.enable = '';
              }
            }
            
            if(res.return_data.user_info){
              this.model.username = res.return_data.user_info[0].email;
              this.model.password = res.return_data.user_info[0].password;
            }

            // console.log('country >', this.model.country);
            this.allClient = [];
            res.return_data.client.forEach(element => {
              this.allClient.push(element);
            });
            // this.selectedPeople = [this.people[0].id, this.people[1].id
          }
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.profileLoading = false;
        }
      );

    }
  // edit page api call end
  
  // seo name generate start
    getSeoName(_item){
      if(_item){
        //edit data call
        this.editDataSubscribe = this.http.get('seo/return_generateSeoURL/category?name='+_item).subscribe(
          (res:any) => {
            console.log("seo Edit data  res >", res.return_data);
            if(res.return_status > 0){
              this.model.seo = res.return_data;
            }
          },
          errRes => {
            // this.selectLoadingDepend = false;
          }
        );
      }
    }
  // seo name generate end

// getlist data fetch start
  getlist(_getlistUrl){
    this.plt.ready().then(() => {
      this.selectLoading = true;
      this.getListSubscribe = this.commonUtils.getlistCommon(_getlistUrl).subscribe(
        resData => {
          this.selectLoading = false;
          this.parentList = resData.parent;
        },
        errRes => {
          this.selectLoading = false;
        }
      );
    });
  }
// getlist data fetch end

// Normal file upload
  fileVal;
  normalFileUpload(event) {
    this.fileVal =  event.target.files[0];
    this.model.csvFile =  event.target.files[0].name;
  }
  fileCross(){
    this.model.csvFile = '';
    this.model.image2 = '';
  }
// Normal file upload end

  // destroy call
  ngOnDestroy(){
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
    if(this.editDataSubscribe !== undefined){
      this.editDataSubscribe.unsubscribe();
    }
    if(this.getListSubscribe !== undefined){
      this.getListSubscribe.unsubscribe();
    }
  }

}

