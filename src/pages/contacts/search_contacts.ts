import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { ListContactsPendingPage } from './list_contacts_pending';
import { ProfileContactsPage } from './profile_contact';
import { AddContactsPage } from './add_contacts';
import { ListContactsPage } from './list_contacts';

@Component({
  selector: 'search-contact',
  templateUrl: 'search_contacts.html'
})
export class SearchContactsPage implements OnInit {
  page: number = 1;
  maxSearch: number = -1;
  search:any ={
    'textField':'',
    'cancel':false
  };
  quantity: number = 0;
  submitted:boolean;
  currentChoice:any;
  acceptedMessage:string='';
  rejectedMessage:string='';
  infiniteScroll: any;
  listSearch: Array<object> = [];
  section:string='search';
  loadingMessage: string = '';
  route: string = '';

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService) { }
  public ngOnInit(): void {
    this.submitted = false;
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
        this.listSearch = [];
        this.getSearch();
      }
    );
  }

  private getSearch(): void {
    let params = [
      this.translateService.getDefaultLang(),
      'search',
      { page: this.page },
      { quantity: this.quantity }
    ];

    if( this.search.textField.trim()!=='' && this.search.textField.trim().length>=3 )
      params.push(this.search.textField.trim());

    this.httpService.get({
      url: 'contacts',
      urlParams: params,
      app: this.app,
      success: this.callBackSearch,
      context: this
    });
  }

  private callBackSearch(response): void {
    this.messages.closeMessage();
    this.page++;
    if(response.data.contacts_mixed_count!==undefined){
      this.maxSearch = response.data.contacts_mixed_count;
      console.log(this.maxSearch);
      if (this.maxSearch == 0){
        this.disableScroll();
        this.messages.closeMessage();
      }
    }

    let search = response.data.contacts_mixed;
    let searchLength = search.length;
    for(let i=0;i<searchLength;i++) {
      if (search[i]['image_profile'] !== undefined && search[i]['image_profile'] !== null && search[i]['image_profile'] !== '') {
        search[i]['imageLoaded'] = false;
        if (search[i]['image_profile'].indexOf('http') === -1)
          search[i]['image_profile'] = this.route + search[i]['image_profile'];

        search[i]['url'] = search[i]['image_profile'];
      } else {
        search[i]['imageLoaded'] = true;
        search[i]['image_profile'] = this.configService.getProfileImage();
      }
      if (search[i]['imageLoaded'] === false)
        this.loadImage(search[i]);
      this.listSearch.push(search[i]);
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

  public moreSearch(infiniteScroll): void {
    this.infiniteScroll = infiniteScroll;
    if (!this.isLimit()) {
      console.log(this.page, 'cargando pagina');
      this.getSearch();
    } else {
      this.disableScroll();
    }
  }

  public isLimit():boolean{
    if (((this.page-1)*this.quantity) < this.maxSearch)
      return false;
    else
      return true;
  }

  public onInput(event:Event):void{
    if(this.search.textField.trim()==='' || (this.search.textField.trim()!=='' && this.search.textField.trim().length>=3) ){
      this.page = 1;
      this.listSearch = [];
      this.maxSearch = 0;
      this.enableScroll();
      this.getSearch();
    }
  }

  public acceptInvitation(event:Event,invitation:any){
    event.stopPropagation();
    console.log(invitation);
    this.currentChoice = invitation;
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
    this.currentChoice = invitation;
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
    this.currentChoice.type_query ='users_friends';
    this.currentChoice.status =0;
    this.proccessCallBack(response,this.acceptedMessage);
  }

  private callBackRejected(response): void {
    let index = this.listSearch.indexOf(this.currentChoice);
    if(index > -1)
      this.listSearch.splice(index, 1);
    this.maxSearch--;
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
    }else{
      this.messages.showMessage({
        content: response.data.message,
        spinner:false,
        duration:3000
      });
    }
  }

  public sendInvitation(event:Event,user:any):void{
    event.stopPropagation();
    console.log(user);
    this.currentChoice = user;
    this.submitted = true;
    let data = {
      email: user.email.trim().toLowerCase(),
      full_name: user.first_name.trim()+' '+user.last_name.trim()
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
      this.messages.showMessage({
        content: response.data.message,
        spinner:false,
        duration:3000
      });
    } else {
      //fino
      this.currentChoice.type_query ='contacts_invited';
      this.currentChoice.status =0;
    }
  }

  private callBackError(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
  }

  public goInvitations(): void {
    this.navCtrl.push(ListContactsPendingPage);
  }

  public addContact():void{
    this.app.getRootNav().push(AddContactsPage, {destiny:'list_contacts' });
  }

  public goContacts(): void {
    this.navCtrl.push(ListContactsPage);
  }

  public detailContact(contact):void{
    if(contact.id_user!==undefined && contact.id_user!==null && contact.id_user!=='')
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

  private enableScroll(): void {
    console.log("disabled");
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(true);
  }
}
