import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { ListContactsPendingPage } from './list_contacts_pending';

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
  route: string = '';

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService) { }
  public ngOnInit(): void {
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
      if (contacts[i]['image_profile'] !== undefined && contacts[i]['image_profile'] !== null && contacts[i]['image_profile'] !== '') {
        contacts[i]['imageLoaded'] = false;
        if (contacts[i]['image_profile'].indexOf('http') === -1)
          contacts[i]['image_profile'] = this.route + contacts[i]['image_profile'];

        contacts[i]['url'] = contacts[i]['image_profile'];
      } else {
        contacts[i]['imageLoaded'] = true;
        contacts[i]['image_profile'] = this.configService.getProfileImage();
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
      this['image'].image_profile = this['config'].getProfileImage();
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

  public goInvitations(): void {
    this.navCtrl.push(ListContactsPendingPage);
  }

  public goSearch(): void {
    //this.navCtrl.push(DetailAboutPage, { id: id });
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
