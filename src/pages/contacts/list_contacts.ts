import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, AlertController  } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { ListContactsPendingPage } from './list_contacts_pending';
import { ProfileContactsPage } from './profile_contact';
import { AddContactsPage } from './add_contacts';
import { SearchContactsPage } from './search_contacts';
import { SessionService } from '../../lib/session.service';

@Component({
  selector: 'list-contacts',
  templateUrl: 'list_contacts.html'
})
export class ListContactsPage implements OnInit {
  page: number = 1;
  maxContacts: number = -1;
  quantity: number = 0;
  infiniteScroll: any;
  listContacts: Array<object> = [];
  section:string='contacts';
  loadingMessage: string = '';
  deletedMessage:string='';
  deletedQuestion:string='';
  delete: string ='';
  cancel: string ='';
  route: string = '';
  submitted:boolean;
  currentChoice:any;

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public navParams: NavParams, private sessionService: SessionService, private alertCtrl: AlertController, public sanitizer: DomSanitizer) { }
  public ngOnInit(): void {
    this.submitted = false;
    let destiny = this.sessionService.getDestinySession();
    this.sessionService.cleanDestinySession();

    if(destiny.params!==undefined && destiny.params!==null && destiny.params.section!==undefined && destiny.params.section!==null){
      if(ListContactsPendingPage===destiny.params.section)
        this.goInvitations();
        return;
    }

    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.quantity = this.configService.getQuantity();
        this.route = this.configService.getDomainImages() + '/profiles/';
        this.page = 1;
        this.getCountContacts();
      }
    );

    this.translateService.get('DELETED_CONTACT').subscribe(
      value => {
        this.deletedMessage = value;
      }
    );

    this.translateService.get('CANCEL').subscribe(
      value => {
        this.cancel = value;
      }
    );

    this.translateService.get('DELETE').subscribe(
      value => {
        this.delete = value;
      }
    );

    this.translateService.get('CONFIRM_DELETE_CONTACT').subscribe(
      value => {
        this.deletedQuestion = value;
      }
    );
  }

  private getCountContacts(): void {
    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.get({
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        'count'
      ],
      app: this.app,
      success: this.callBackCountContacts,
      context: this
    });
  }

  private callBackCountContacts(response): void {
    this.maxContacts = response.data.contacts_count;
    if (this.maxContacts != 0){
      this.getContacts();
    }else{
      this.disableScroll();
      this.messages.closeMessage();
    }
  }

  private getContacts(): void {
    this.httpService.get({
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        { page: this.page },
        { quantity: this.quantity },
      ],
      app: this.app,
      success: this.callBackContacts,
      context: this
    });
  }


  private callBackContacts(response): void {
    this.messages.closeMessage();
    this.page++;
    let contacts = response.data.contacts;
    let contactsLength = contacts.length;
    for(let i=0;i<contactsLength;i++) {
      if (contacts[i]['image_profile'] !== undefined && contacts[i]['image_profile'] !== null && contacts[i]['image_profile'] !== '') {
        contacts[i]['imageLoaded'] = false;
        if (contacts[i]['image_profile'].indexOf('http') === -1)
          contacts[i]['image_profile'] = this.route + contacts[i]['image_profile'];

        contacts[i]['url'] = contacts[i]['image_profile'];
        contacts[i]['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url('+contacts[i]['image_profile']+')');
      } else {
        contacts[i]['imageLoaded'] = true;
        contacts[i]['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url('+this.configService.getProfileImage()+')');
      }
      if (contacts[i]['imageLoaded'] === false)
        this.loadImage(contacts[i]);
      this.listContacts .push(contacts[i]);
    }
    this.refreshScroll();
  }

  private loadImage(image: any): void {
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({ 'image': image });
    img.onerror = this.onErrorHandler.bind({ 'image': image, 'config':this.configService });
    img.src = image.url;
  }

  private onErrorHandler(data): void {
      this['image'].imageLoaded = true;
      this['image'].image_profile = this.sanitizer.bypassSecurityTrustStyle('url('+this['config'].getProfileImage()+')');
  }

  private onloadHandler(data): void {
    if (this['image'] !== undefined)
      this['image'].imageLoaded = true;
  }

  public moreContacts(infiniteScroll): void {
    this.infiniteScroll = infiniteScroll;
    if (((this.page-1)*this.quantity) < this.maxContacts) {
      console.log(this.page, 'cargando pagina');
      this.getContacts();
    } else {
      this.disableScroll();
    }
  }

  public confirmDelete(event:Event,contact:any):void {
    event.stopPropagation();
    let title = this.deletedQuestion+contact.first_name+' '+contact.last_name+'?';
    let alert = this.alertCtrl.create({
      title: title,
      buttons: [
        {
          text: this.delete.toUpperCase(),
          cssClass:'delete',
          handler: () => {
            this.sendInvitation(contact);
          }
        },
        {
          text: this.cancel.toUpperCase(),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  public sendInvitation(contact:any):void{
    this.currentChoice = contact;
    this.submitted = true;

    let params = {
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        contact.id_user_friend
      ],
      app: this.app,
      success: this.callBackRegister,
      error: this.callBackError,
      context: this,
    };

    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.delete(params);
  }

  private callBackRegister(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.messages.showMessage({
        content: response.data.message,
        spinner:false,
        duration:3000
      });
    }else{
      let index = this.listContacts.indexOf(this.currentChoice);
      if(index > -1)
      this.listContacts.splice(index, 1);
      this.maxContacts--;
      this.messages.showMessage({
        content: this.deletedMessage,
        spinner:false,
        duration:3000
      });
    }
  }

  public goInvitations(): void {
    this.navCtrl.push(ListContactsPendingPage);
  }

  public addContact():void{
    this.app.getRootNav().push(AddContactsPage, {destiny:'list_contacts' });
  }

  public goSearch(): void {
    this.navCtrl.push(SearchContactsPage);
  }

  public detailContact(contact):void{
    this.app.getRootNav().push(ProfileContactsPage, { contactId: contact.id_user, destiny:'list_contacts' });
  }

  private refreshScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.complete();
  }

  private disableScroll(): void {
    console.log("disabled");
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(false);
  }

  private callBackError(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
  }
}
