import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Platform } from 'ionic-angular';

import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';

import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

import { ListContactsPage } from './list_contacts';
import { ListContactsPendingPage } from './list_contacts_pending';

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add_contact.html'
})
export class AddContactsPage {
  @ViewChild('fullName') userName;
  @ViewChild('email') email;
  ready: boolean;
  submitted: boolean;
  logo: string;
  errorProfile:string='';
  loadingMessage: string = '';
  requiredMessages: any = {};
  imageProfile: string ='';
  destiny:string='';
  ios: boolean = false;

  constructor(public navCtrl: NavController, public app: App, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public navParams: NavParams, private platform: Platform, public messages: MessageService) {
    if(this.navParams.get('destiny')===undefined || this.navParams.get('destiny')===null || this.navParams.get('destiny')==='')
      this.navCtrl.pop();
    this.buildValidations();

    if (this.platform.is('ios')) {
      this.ios = true;
    } else {
      this.ios = false;
    }

    this.destiny = this.navParams.get('destiny') ;
    this.ready = false;

    this.translateService.get('INVALID_USERNAME').subscribe(
      value => {
        this.requiredMessages['INVALID_USERNAME']  = value;
      }
    );

    this.translateService.get('INVALID_FULL_NAME').subscribe(
      value => {
        this.requiredMessages['INVALID_FULL_NAME']  = value;
      }
    );

    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER');
        this.messages.showMessage({
          content: this.loadingMessage
        });
      }
    );
  }

  private buildValidations() {
    this.updateProfile = this.formBuilder.group({
      full_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      email: ['', Validators.compose([Validators.minLength(5), Validators.email, Validators.required])]
    });
  }

  public handleLogin(action: any): void {
    this[action].setFocus();
  }

  public submitForm() {
    if (this.updateProfile.valid)
      this.update();
  }

  public update(): void {
    this.errorProfile = '';
    this.submitted = true;

    let data = {
      first_name: this.updateProfile.value.first_name,
      last_name: this.updateProfile.value.last_name,
      user_name: this.updateProfile.value.user_name.toLowerCase(),
      email: this.updateProfile.value.email.toLowerCase()
    };

    if(this.updateProfile.value.job_title!==null && this.updateProfile.value.job_title!=='')
      data['job_title'] =  this.updateProfile.value.job_title;

    if(this.updateProfile.value.company_name!==null && this.updateProfile.value.company_name!=='')
      data['company_name'] =  this.updateProfile.value.company_name;

    if(this.updateProfile.value.job_description!==null && this.updateProfile.value.job_description!=='')
      data['job_description'] =  this.updateProfile.value.job_description;

    if (this.imageTaken === true && this.oldImageProfile !== undefined && this.oldImageProfile != null && this.oldImageProfile !== '')
      data['old_image_profile'] = this.oldImageProfile;

    let paramsPut = {
      url: 'user',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      inputs: data,
      success: this.callBackRegister,
      error: this.callBackError,
      context: this,
    };
    if (this.imageTaken === true && this.imageProfile !== undefined && this.imageProfile != null && this.imageProfile !== '')
      paramsPut['files'] = { 'image_profile': this.imageProfile };

    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.put(paramsPut);
  }

  private callBackRegister(response: any): void {
    this.submitted = false;
    this.ready = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorProfile = response.data.message;
    } else {
      this.navCtrl.push(ListContactsPendingPage);
    }
  }

  public backAction(): void {
    if(this.destiny ==='pending_contacts')
      this.navCtrl.pop(ListContactsPendingPage);
    else
      this.navCtrl.pop(ListContactsPage);
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
