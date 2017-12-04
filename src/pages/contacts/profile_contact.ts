import { Component } from '@angular/core';
import { NavController, NavParams, App, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';

import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

import { ListContactsPage } from './list_contacts';
import { ListContactsPendingPage } from './list_contacts_pending';

@Component({
  selector: 'page-contact-profile',
  templateUrl: 'profile_contact.html'
})
export class ProfileContactsPage {
  ready: boolean;
  errorProfile:string='';
  loadingMessage: string = '';
  imageProfile: any;
  firstName: string ='';
  lastName: string ='';
  userName: string ='';
  email: string ='';
  jobTitle: string ='';
  companyName: string ='';
  jobDescription: string ='';
  destiny:string='';
  contactId:string='';
  ios: boolean = false;

  constructor(public navCtrl: NavController, public app: App, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public navParams: NavParams, private platform: Platform, public messages: MessageService, public sanitizer: DomSanitizer) {
    if(this.navParams.get('contactId')===undefined || this.navParams.get('contactId')===null || this.navParams.get('contactId')==='' || this.navParams.get('destiny')===undefined || this.navParams.get('destiny')===null || this.navParams.get('destiny')==='')
      this.navCtrl.pop();

    if (this.platform.is('ios')) {
      this.ios = true;
    } else {
      this.ios = false;
    }

    this.contactId = this.navParams.get('contactId');
    this.destiny = this.navParams.get('destiny') ;
    this.ready = false;

    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.messages.showMessage({
          content: this.loadingMessage
        });
        this.getContact();
      }
    );
  }

  private getContact() {
    let params = {
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        this.contactId
      ],
      app: this.app,
      success: this.callBackProfile,
      error: this.callBackError,
      context: this,
    };

    this.httpService.get(params);
  }

  private callBackProfile(response: any): void {
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorProfile = response.data.message;
    } else {
      let data = response.data.contact;

      if(data.first_name!==undefined && data.first_name!==null)
        this.firstName = data.first_name;

      if(data.last_name!==undefined && data.last_name!==null)
        this.lastName = data.last_name;

      if(data.user_name!==undefined && data.user_name!==null)
        this.userName = data.user_name;

      if(data.email!==undefined && data.email!==null)
        this.email = data.email;

      if(data.job_title!==undefined && data.job_title!==null)
        this.jobTitle = data.job_title;

      if(data.company_name!==undefined && data.company_name!==null)
        this.companyName = data.company_name;

      if(data.job_description!==undefined && data.job_description!==null)
        this.jobDescription = data.job_description;

      if (data.image_profile !== undefined && data.image_profile !== null && data.image_profile !== '') {
        if (data.image_profile.indexOf('http') !== -1)
          this.imageProfile = data.image_profile;
        else{
          this.imageProfile = this.configService.getDomainImages() + '/profiles/' + data.image_profile;
        }
        if(this.ios)
          this.imageProfile = this.sanitizer.bypassSecurityTrustStyle('url('+this.imageProfile+')');
      }
      this.ready = true;
    }
  }

  public backAction(): void {
    //this.updateProfile.reset();
    if(this.destiny ==='pending_contacts')
      this.navCtrl.pop(ListContactsPendingPage);
    else
      this.navCtrl.pop(ListContactsPage);
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
