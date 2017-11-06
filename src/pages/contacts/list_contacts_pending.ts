import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { ListContactsPage } from './list_contacts';
import { ProfileContactsPage } from './profile_contact';
import { AddContactsPage } from './add_contact';

@Component({
  selector: 'list-contacts-pending',
  templateUrl: 'list_contacts_pending.html',
  providers:[Contacts]
})
export class ListContactsPendingPage implements OnInit {
  page: number = 1;
  maxContactsPending: number = -1;
  quantity: number = 0;
  infiniteScroll: any;
  listContactsPending: Array<object> = [];
  searchPending:any = [];
  contactsDevice: Array<object> = [];
  section:string='invitations';
  loadingMessage: string = '';
  acceptedMessage:string='';
  rejectedMessage:string='';
  route: string = '';
  submitted:boolean = false;
  currentInvitation:any;

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public contacts: Contacts, public sanitizer: DomSanitizer) { }
  public ngOnInit(): void {
    this.submitted = false;
    this.getContactsDevice();
    this.translateService.get('ACCEPTED_INVITATIONS').subscribe(
      value => {
        this.acceptedMessage = value;
      }
    );

    this.translateService.get('REJECTED_INVITATION').subscribe(
      value => {
        this.rejectedMessage = value;
      }
    );

    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.quantity = this.configService.getQuantity();
        this.route = this.configService.getDomainImages() + '/profiles/';
        this.page = 1;
        this.getCountContactsPending();
      }
    );
  }

  private getCountContactsPending(): void {
    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.get({
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        'pending',
        'count'
      ],
      app: this.app,
      success: this.callBackCountContactsPending,
      context: this
    });
  }

  private callBackCountContactsPending(response): void {
    this.maxContactsPending = response.data.contacts_pending_count;
    if (this.maxContactsPending != 0){
      this.getContactsPending();
    }else{
      this.disableScroll();
      this.messages.closeMessage();
    }
  }

  private getContactsPending(): void {
    this.httpService.get({
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        'pending',
        { page: this.page },
        { quantity: this.quantity },
      ],
      app: this.app,
      success: this.callBackContactsPending,
      context: this
    });
  }

  private callBackContactsPending(response): void {
    this.messages.closeMessage();
    this.page++;
    let pending = response.data.contacts_pending;
    let pendingLength = pending.length;
    for(let i=0;i<pendingLength;i++) {
      if (pending[i]['image_profile'] !== undefined && pending[i]['image_profile'] !== null && pending[i]['image_profile'] !== '') {
        pending[i]['imageLoaded'] = false;
        if (pending[i]['image_profile'].indexOf('http') === -1)
          pending[i]['image_profile'] = this.route + pending[i]['image_profile'];

        pending[i]['url'] = pending[i]['image_profile'];
        pending[i]['image_profile'] = this.sanitizer.  bypassSecurityTrustStyle('url('+pending[i]['image_profile']+')');
        this.loadImage(pending[i]);
      } else {
        if(this.contactsDevice.length>0){
          this.getFilterContact(pending[i]);
        }else{
          this.searchPending.push(pending[i]);
        }
      }

      this.listContactsPending.push(pending[i]);
    }
    this.refreshScroll();
  }

  public getContactsDevice():void{
    this.contacts.find(['displayName', 'name', 'emails'], {filter: '',multiple : true}).then((contacts)=>{
      this.contactsDevice = contacts;
      if(this.searchPending.length>0){
        for(let a=0;a<this.searchPending.length;a++){
          this.getFilterContact(this.searchPending[a]);
        }
      }
    },(error)=>{
      console.log(error);
    });
  }

  public getFilterContact(pending:any):void{
    let founded = false;
    let max = this.contactsDevice.length;
    for(let i=0;i<max;i++) {
      if (this.contactsDevice[i]['emails']!==undefined && this.contactsDevice[i]['emails']!==null && this.contactsDevice[i]['emails'].length>0 && this.contactsDevice[i]['emails'][0].value===pending['email'] && this.contactsDevice[i]['photos']!==undefined && this.contactsDevice[i]['photos']!==null && this.contactsDevice[i]['photos'].length>0 && this.contactsDevice[i]['photos'][0].value!==undefined && this.contactsDevice[i]['photos'][0].value!==null && this.contactsDevice[i]['photos'][0].value!==''){
        pending['imageLoaded'] = true;
        pending['image_profile'] = this.sanitizer.  bypassSecurityTrustStyle('url('+this.contactsDevice[i]['photos'][0].value+')');
        founded =  true;
        break;
      }
    }

    if(!founded){
      pending['imageLoaded'] = true;
      pending['image_profile'] = this.sanitizer.  bypassSecurityTrustStyle('url('+this.configService.getProfileImage()+')');
    }
  }

  private loadImage(image: any): void {
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({ 'image': image });
    img.onerror = this.onErrorHandler.bind({ 'image': image, 'config':this.configService });
    img.src = image.url;
  }

  private onErrorHandler(data): void {
    console.log(data);
    this['image'].imageLoaded = true;
    this['image'].image_profile = this.sanitizer.  bypassSecurityTrustStyle('url('+this['config'].getProfileImage()+')');
  }

  private onloadHandler(data): void {
    if (this['image'] !== undefined)
      this['image'].imageLoaded = true;
  }

  public moreContacts(infiniteScroll): void {
    this.infiniteScroll = infiniteScroll;
    if (((this.page-1)*this.quantity) < this.maxContactsPending) {
      console.log(this.page, 'cargando pagina');
      this.getContactsPending();
    } else {
      this.disableScroll();
    }
  }

  public acceptInvitation(event:Event,invitation:any){
    event.stopPropagation();
    console.log(invitation);
    this.currentInvitation = invitation;
    this.submitted = true;
    this.httpService.put({
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        'accept',
        invitation.id
      ],
      app: this.app,
      success: this.callBackAccept,
      context: this
    });
  }

  public rejectInvitation(event:Event,invitation:any){
    event.stopPropagation();
    console.log(invitation);
    this.currentInvitation = invitation;
    this.submitted = true;
    this.httpService.put({
      url: 'contacts',
      urlParams: [
        this.translateService.getDefaultLang(),
        'reject',
        invitation.id
      ],
      app: this.app,
      success: this.callBackRejected,
      context: this
    });
  }

  private callBackAccept(response): void {
    this.proccessCallBack(response,this.acceptedMessage);
  }

  private callBackRejected(response): void {
    this.proccessCallBack(response,this.rejectedMessage);
  }

  private proccessCallBack(response:any,message:string):void{
    this.submitted = false;
    if (response.status==='success'){
      let data = response.data.invitation_pending;
      this.messages.showMessage({
        content: message,
        spinner:false,
        duration:3000
      });
      let index = this.listContactsPending.indexOf(this.currentInvitation);
      if(index > -1)
        this.listContactsPending.splice(index, 1);
      this.maxContactsPending--;
    }else{
      this.messages.showMessage({
        content: response.data.message,
        spinner:false,
        duration:3000
      });
    }
  }

  public goContacts(): void {
    this.navCtrl.push(ListContactsPage);
  }

  public detailContact(contact):void{
    this.app.getRootNav().push(ProfileContactsPage, { contactId: contact.id_user, destiny:'pending_contacts' });
  }

  public addContact():void{
    this.app.getRootNav().push(AddContactsPage, { destiny:'pending_contacts' });
  }

  public goSearch(contact): void {
    //this.navCtrl.push(DetailAboutPage);
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
