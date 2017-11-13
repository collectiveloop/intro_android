import { Component, ViewChild } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, App, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

import { ListContactsPage } from './list_contacts';
import { ListContactsPendingPage } from './list_contacts_pending';

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add_contacts.html',
  providers:[Contacts]
})
export class AddContactsPage {
  @ViewChild('fullName') fullName;
  @ViewChild('email') email;
  contactForm: FormGroup;
  ready: boolean;
  submitted: boolean;
  imageLoaded:boolean;
  route: string = '';
  errorProfile:string='';
  loadingMessage: string = '';
  requiredMessages: any = {};
  oldEmail:string='';
  imageProfile: any;
  urlImagePending: string ='';
  destiny:string='';
  ios: boolean = false;

  constructor(public navCtrl: NavController, public app: App, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public navParams: NavParams, private platform: Platform, public messages: MessageService, public formBuilder:FormBuilder, public contacts: Contacts, public sanitizer: DomSanitizer) {
    this.imageLoaded = true;
    if(this.navParams.get('destiny')===undefined || this.navParams.get('destiny')===null || this.navParams.get('destiny')==='')
      this.navCtrl.pop();
    this.buildValidations();

    if (this.platform.is('ios')) {
      this.ios = true;
    } else {
      this.ios = false;
    }

    this.destiny = this.navParams.get('destiny') ;
    this.route = this.configService.getDomainImages() + '/profiles/';
    this.ready = true;

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
      }
    );
  }

  private buildValidations() {
    this.contactForm = this.formBuilder.group({
      full_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      email: ['', Validators.compose([Validators.minLength(5), Validators.email, Validators.required])]
    });
  }

  public searchContact():void{
    if(this.contactForm.value.email!==undefined && this.contactForm.value.email!==null && this.contactForm.value.email.trim()!=='' && this.oldEmail!==this.contactForm.value.email.trim()){
      this.messages.showMessage({
        content: this.loadingMessage
      });
      this.oldEmail = this.contactForm.value.email.trim();
      this.ready = false;
      let params = {
        url: 'contacts',
        urlParams: [
          this.translateService.getDefaultLang(),
          {find:this.oldEmail}
        ],
        app: this.app,
        success: this.callBackProfile,
        error: this.callBackError,
        context: this,
      };

      this.httpService.get(params);
    }
  }

  private callBackProfile(response: any): void {
    this.messages.closeMessage();
    this.errorProfile = '';
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this['email'].setFocus();
      this.cleanForm();
      this.errorProfile = response.data.message;
    } else {
      if (response !== undefined && response.status !== undefined && response.status === 'success') {
        this['fullName'].setFocus();
        let data = response.data.contact;
        if(data.first_name!==undefined && data.first_name!==null && data.last_name!==undefined && data.last_name!==null){
          let first_name = '';
          let last_name = '';
          if(data.first_name!==undefined && data.first_name!==null && data.first_name.trim()!=='')
            first_name = data.first_name.trim();

          if(data.last_name!==undefined && data.last_name!==null && data.last_name.trim()!=='')
            last_name = data.last_name.trim();
          this.contactForm.controls['full_name'].patchValue(first_name+' '+last_name);
          this.contactForm.controls['full_name'].setValue(first_name+' '+last_name);

          if (data['image_profile'] !== undefined && data['image_profile'] !== null && data['image_profile'] !== '') {
            this.imageLoaded = false;
            if (data['image_profile'].indexOf('http') === -1)
              data['image_profile'] = this.route + data['image_profile'];
            this.urlImagePending = data['image_profile'];
            this.imageProfile = data['image_profile'];
            this.loadImage();
          } else {
            this.cleanImageForm();
          }
        }else{
          this.cleanForm();
        }
      }else{
        this.cleanForm();
      }
    }
    this.ready = true;
  }

  private cleanForm():void{
    this.contactForm.controls['full_name'].patchValue('');
    this.contactForm.controls['full_name'].setValue('');
    this.cleanImageForm();
  }

  private cleanImageForm():void{
    this.imageLoaded = true;
    this.imageProfile ='';
  }

  private loadImage(): void {
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind(this);
    img.onerror = this.onErrorHandler.bind(this);
    img.src = this.urlImagePending;
  }

  private onErrorHandler(data): void {
    console.log(data);
    this.imageLoaded = true;
    this.imageProfile = '';
  }

  private onloadHandler(data): void {
    console.log("listo");
      this['imageLoaded'] = true;
  }

  public submitForm() {
    if (this.contactForm.valid)
      this.addContact();
  }

  public addContact(): void {
    this.errorProfile = '';
    this.submitted = true;

    let data = {
      email: this.contactForm.value.email.trim().toLowerCase(),
      full_name: this.contactForm.value.full_name.trim()
    };

    let params = {
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      inputs: data,
      success: this.callBackRegister,
      error: this.callBackError,
      context: this,
    };

    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.post(params);
  }

  private callBackRegister(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorProfile = response.data.message;
    } else {
      this.contactForm.reset();
      this.navCtrl.pop();
    }
  }

  public getDeviceContact():void{
    this.ready = false;
    this.contacts.pickContact().then((contact)=>{
      this.ready = true;
      console.log(contact);
      this.contactForm.reset();
      if(contact!==undefined && contact!==null){
        if(contact.name!==undefined && contact.name!==null && contact.name.formatted!==undefined && contact.name.formatted!==null && contact.name.formatted.trim()!==''){
          this.contactForm.controls['full_name'].patchValue(contact.name.formatted.trim());
          this.contactForm.controls['full_name'].setValue(contact.name.formatted.trim());
        }else{
          if(contact.displayName!==undefined && contact.displayName!==null && contact.displayName.trim()!==''){
            this.contactForm.controls['full_name'].patchValue(contact.displayName.trim());
            this.contactForm.controls['full_name'].setValue(contact.displayName.trim());
          }
        }

        if(contact.emails!==undefined && contact.emails!==null && contact.emails.length>0){
          this.contactForm.controls['email'].patchValue(contact.emails[0].value);
          this.contactForm.controls['email'].setValue(contact.emails[0].value);
        }

        this.imageLoaded = true;
        if(contact['photos']!==undefined && contact['photos']!==null && contact['photos'].length>0)
          this.imageProfile = this.sanitizer.bypassSecurityTrustResourceUrl(contact['photos'][0].value);
        else
          this.imageProfile = '';
      }else{
        this.cleanForm();
      }

    },(error)=>{
      this.ready = true;
      console.log(error);
    });
  }

  public backAction(): void {
    if(this.destiny ==='pending_contacts')
      this.navCtrl.pop(ListContactsPendingPage);
    else
      this.navCtrl.pop(ListContactsPage);
  }

  private callBackError(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
  }
}
