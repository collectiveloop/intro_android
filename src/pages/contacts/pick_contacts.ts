import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';

@Component({
  selector: 'pick-contacts',
  templateUrl: 'pick_contacts.html'
})
export class PickContactsPage implements OnInit {
  page: number = 1;
  intros:any;
  target:string;
  maxContacts: number = -1;
  quantity: number = 0;
  infiniteScroll: any;
  listContacts: Array<object> = [];
  loadingMessage: string = '';
  route: string = '';

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public navParams: NavParams, public sanitizer: DomSanitizer) { }
  public ngOnInit(): void {
    if(this.navParams.get('intros')===undefined || this.navParams.get('intros')===null || this.navParams.get('target')===undefined || this.navParams.get('target')===null || this.navParams.get('target')==='')
      this.navCtrl.pop();
    //recojemos los parametros
    this.intros = this.navParams.get('intros');
    this.target = this.navParams.get('target');

    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.quantity = this.configService.getQuantity();
        this.route = this.configService.getDomainImages() + '/profiles/';
        this.page = 1;
        this.getCountContacts();
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
      //no debe ser un friend seleccionado previamente
      if(this.intros!==undefined && ( (this.intros['friend_1']!==undefined && (this.intros['friend_1']['id_user']===undefined || this.intros['friend_1']['id_user']===null || this.intros['friend_1']['id_user']==='' || contacts[i]['id_user']!=this.intros['friend_1']['id_user']) ) && (this.intros['friend_2']!==undefined && (this.intros['friend_2']['id_user']===undefined || this.intros['friend_2']['id_user']===null || this.intros['friend_2']['id_user']==='' || contacts[i]['id_user']!=this.intros['friend_2']['id_user']) )   ) ){
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
    }
    this.refreshScroll();
  }

  private loadImage(image: any): void {
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({ 'image': image });
    img.onerror = this.onErrorHandler.bind({ 'image': image, 'config':this.configService, 'sanitizer':this.sanitizer });
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
      this.getContacts();
    } else {
      this.disableScroll();
    }
  }

  public returnContact(contact:any):void{
    this.intros[this.target] = {
      'id_user':contact.id_user,
      'id_user_friend':contact.id_user_friend,
      'email':contact.email,
      'push_id':contact.push_id,
      'first_name':contact.first_name,
      'last_name':contact.last_name,
      'image_loaded' : true,
      'friend_loaded' : true,
      'image_profile': contact.image_profile
    };

    this.app.getRootNav().pop();
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
}
