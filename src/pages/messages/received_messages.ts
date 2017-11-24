import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../lib/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from '../../lib/messages.service';
import { ConfigService } from '../../lib/config.service';
import { DetailIntrosPage } from '../intros/detail_intros';
import { MadeMessagesPage } from '../messages/made_messages';
import { ChatMessagesPage } from '../messages/chat_messages';
import { SessionService } from '../../lib/session.service';

@Component({
  selector: 'received-messages',
  templateUrl: 'received_messages.html'
})
export class ReceivedMessagesPage {
  page: number = 1;
  section: string = '';
  listIntros: any = [];
  maxIntros: number = 0;
  quantity: number = 0;
  infiniteScroll: any;
  loadingMessage: string = '';
  route: string = '';
  ready: boolean = false;
  leaveQuestion:string ='';
  leave:string ='';
  cancel:string ='';
  leaveConfirmation:string ='';
  submitted:boolean;
  currentChoice:any;

  constructor(public app: App, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public sanitizer: DomSanitizer, private httpService: HttpService, private navCtrl: NavController, public navParams: NavParams, private sessionService: SessionService, private alertCtrl: AlertController) {
    console.log(this.navParams.get('introId'));
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.quantity = this.configService.getQuantity();
        this.route = this.configService.getDomainImages() + '/profiles/';
      }
    );
    this.translateService.get('LEAVE').subscribe(
      value => {
        this.leave = value;
      }
    );

    this.translateService.get('CANCEL').subscribe(
      value => {
        this.cancel = value;
      }
    );

    this.translateService.get('CONFIRM_LEAVE_INTRO').subscribe(
      value => {
        this.leaveQuestion = value;
      }
    );

    this.translateService.get('LEAVE_ROOM').subscribe(
      value => {
        this.leaveConfirmation = value;
      }
    );
  }

  ionViewWillEnter(): void {
    this.submitted = false;
    let destiny = this.sessionService.getDestinySession();
    this.sessionService.cleanDestinySession();
    if (destiny.params !== undefined && destiny.params.index !== undefined && destiny.params.index !== null && destiny.params.introId !== undefined && destiny.params.introId !== null) {
      console.log("redireccionando");
      this.app.getRootNav().push(ChatMessagesPage, { introId: destiny.params.introId });
    }

    this.section = 'received';
    this.ready = false;
    this.page = 1;
    this.listIntros = [];
    this.getCountIntros();
  }

  private getCountIntros(): void {
    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.get({
      url: 'intros',
      urlParams: [
        this.translateService.getDefaultLang(),
        'received',
        'count'
      ],
      app: this.app,
      success: this.callBackCountIntros,
      context: this
    });
  }

  private callBackCountIntros(response): void {
    this.maxIntros = response.data.intros_count;
    if (this.maxIntros != 0) {
      this.getReceivedIntros();
    } else {
      this.ready = true;
      this.disableScroll();
      this.messages.closeMessage();
    }
  }

  private getReceivedIntros(): void {
    this.httpService.get({
      url: 'intros',
      urlParams: [
        this.translateService.getDefaultLang(),
        'received',
        { page: this.page },
        { quantity: this.quantity },
      ],
      app: this.app,
      success: this.callBackIntros,
      context: this
    });
  }

  private callBackIntros(response): void {
    this.ready = true;
    this.messages.closeMessage();
    this.page++;
    let intros = response.data.intros;
    let id_user = response.data.id_user;
    let introsLength = intros.length;
    for (let i = 0; i < introsLength; i++) {

      //el que hizo la intro
      intros[i]['user_image_loaded'] = false;
      if (intros[i]['user_image_profile'] !== undefined && intros[i]['user_image_profile'] !== null && intros[i]['user_image_profile'] !== '') {
        if (intros[i]['user_image_profile'].indexOf('http') === -1)
          intros[i]['user_image_profile'] = this.route + intros[i]['user_image_profile'];

        intros[i]['user_url'] = intros[i]['user_image_profile'];
        intros[i]['user_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + intros[i]['user_image_profile'] + ')');
      } else {
        intros[i]['user_image_loaded'] = true;
        intros[i]['user_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
      }
      if (intros[i]['user_image_loaded'] === false)
        this.loadImage(intros[i], 'user');

      intros[i]['user_name'] = intros[i]['user_user_name'];

      //buscamos a la otra pérsona que invitaron a la intro, que no sea el usuario de la app
      intros[i]['other_image_loaded'] = false;
      if (id_user != Number(intros[i]['id_user_1'])) {
        if (intros[i]['user_1_image_profile'] !== undefined && intros[i]['user_1_image_profile'] !== null && intros[i]['user_1_image_profile'] !== '') {
          if (intros[i]['user_1_image_profile'].indexOf('http') === -1)
            intros[i]['other_image_profile'] = this.route + intros[i]['user_1_image_profile'];
          intros[i]['other_url'] = intros[i]['other_image_profile'];
          intros[i]['other_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + intros[i]['other_image_profile'] + ')');
        } else {
          intros[i]['other_image_loaded'] = true;
          intros[i]['other_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
        }

        intros[i]['other_user_name'] = intros[i]['user_1_user_name'];
      } else {
        if (intros[i]['user_2_image_profile'] !== undefined && intros[i]['user_2_image_profile'] !== null && intros[i]['user_2_image_profile'] !== '') {
          if (intros[i]['user_2_image_profile'].indexOf('http') === -1)
            intros[i]['other_image_profile'] = this.route + intros[i]['user_2_image_profile'];

          intros[i]['other_url'] = intros[i]['other_image_profile'];
          intros[i]['other_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + intros[i]['other_image_profile'] + ')');
        } else {
          intros[i]['other_image_loaded'] = true;
          intros[i]['other_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
        }
        intros[i]['other_user_name'] = intros[i]['user_2_user_name'];
      }
      if (intros[i]['other_image_loaded'] === false)
        this.loadImage(intros[i], 'other');

      intros[i]['created_at'] = intros[i]['created_at'].replace(' ', ' / ');

      this.listIntros.push(intros[i]);
    }
    this.refreshScroll();
  }

  private loadImage(image: any, prefix: any): void {
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({ 'image': image, 'prefix': prefix });
    img.onerror = this.onErrorHandler.bind({ 'image': image, 'prefix': prefix, 'config': this.configService, 'sanitizer': this.sanitizer });
    img.src = image[prefix + '_url'];
  }

  private onErrorHandler(data): void {
    this['image'][this['prefix'] + '_image_loaded'] = true;
    this['image'][this['prefix'] + '_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this['config'].getProfileImage() + ')');
  }

  private onloadHandler(data): void {
    if (this['image'] !== undefined)
      this['image'][this['prefix'] + '_image_loaded'] = true;
  }

  public moreMessages(infiniteScroll): void {
    this.infiniteScroll = infiniteScroll;
    if (((this.page - 1) * this.quantity) < this.maxIntros) {
      this.getReceivedIntros();
    } else {
      this.disableScroll();
    }
  }

  public leaveRoom(event:Event,intro:any):void {
    event.stopPropagation();
    let title = this.leaveQuestion;
    let alert = this.alertCtrl.create({
      title: title,
      buttons: [
        {
          text: this.leave.toUpperCase(),
          cssClass:'delete',
          handler: () => {
            this.sendLeaveRoom(intro);
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

  public sendLeaveRoom(intro:any):void{
    this.currentChoice = intro;
    this.submitted = true;

    let params = {
      url: 'messages',
      urlParams: [
        this.translateService.getDefaultLang(),
        'leave',
        intro.id
      ],
      app: this.app,
      success: this.callBackLeave,
      error: this.callBackError,
      context: this,
    };

    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.delete(params);
  }

  private callBackLeave(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.messages.showMessage({
        content: response.data.message,
        spinner:false,
        duration:3000
      });
    }else{
      let index = this.listIntros.indexOf(this.currentChoice);
      if(index > -1)
      this.listIntros.splice(index, 1);
      this.maxIntros--;
      this.messages.showMessage({
        content: this.leaveConfirmation,
        spinner:false,
        duration:3000
      });
    }
  }

  private refreshScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.complete();
  }

  private disableScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(false);
  }

  public goDetail(event: Event, intro: any): void {
    event.stopPropagation();
    this.app.getRootNav().push(DetailIntrosPage, { introId: intro.id });
  }

  public goMessages(event: Event, intro: any): void {
    event.stopPropagation();
    this.app.getRootNav().push(ChatMessagesPage, { introId: intro.id });
  }

  public goMadeMessages(): void {
    this.navCtrl.push(MadeMessagesPage);
  }

  private callBackError(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
  }
}
