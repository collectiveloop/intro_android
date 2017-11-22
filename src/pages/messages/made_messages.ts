import { Component } from '@angular/core';
import { App,NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../lib/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from '../../lib/messages.service';
import { ConfigService } from '../../lib/config.service';
import { DetailIntrosPage } from '../intros/detail_intros';
import { ReceivedMessagesPage } from '../messages/received_messages';
import { ChatMessagesPage } from '../messages/chat_messages';

@Component({
  selector: 'made-messages',
  templateUrl: 'made_messages.html'
})
export class MadeMessagesPage {
  page: number = 1;
  section:string = '';
  listIntros: any = [];
  maxIntros: number = 0;
  quantity: number = 0;
  infiniteScroll: any;
  loadingMessage: string = '';
  route: string = '';
  ready:boolean = false;

  constructor(public app: App, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public sanitizer: DomSanitizer, private httpService: HttpService, private navCtrl:NavController) {
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.quantity = this.configService.getQuantity();
        this.route = this.configService.getDomainImages() + '/profiles/';
      }
    );
  }

  ionViewWillEnter(): void {
    this.section = 'made';
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
        'made',
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
      this.getMadeIntros();
    } else {
      this.ready = true;
      this.disableScroll();
      this.messages.closeMessage();
    }
  }

  private getMadeIntros(): void {
    this.httpService.get({
      url: 'intros',
      urlParams: [
        this.translateService.getDefaultLang(),
        'made',
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
      if (intros[i]['friend_1_image_profile'] !== undefined && intros[i]['friend_1_image_profile'] !== null && intros[i]['friend_1_image_profile'] !== '') {
        intros[i]['friend_1_image_loaded'] = false;
        if (intros[i]['friend_1_image_profile'].indexOf('http') === -1)
          intros[i]['friend_1_image_profile'] = this.route + intros[i]['friend_1_image_profile'];

        intros[i]['friend_1_url'] = intros[i]['friend_1_image_profile'];
        intros[i]['friend_1_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + intros[i]['friend_1_image_profile'] + ')');
      } else {
        intros[i]['friend_1_image_loaded'] = true;
        intros[i]['friend_1_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
      }
      if (intros[i]['friend_1_image_loaded'] === false)
        this.loadImage(intros[i], 'friend_1');


      if (intros[i]['friend_2_image_profile'] !== undefined && intros[i]['friend_2_image_profile'] !== null && intros[i]['friend_2_image_profile'] !== '') {
        intros[i]['friend_2_image_loaded'] = false;
        if (intros[i]['friend_2_image_profile'].indexOf('http') === -1)
          intros[i]['friend_2_image_profile'] = this.route + intros[i]['friend_2_image_profile'];

        intros[i]['friend_2_url'] = intros[i]['friend_2_image_profile'];
        intros[i]['friend_2_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + intros[i]['friend_2_image_profile'] + ')');
      } else {
        intros[i]['friend_2_image_loaded'] = true;
        intros[i]['friend_2_image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
      }
      intros[i]['friend_2_style']='crop';
      intros[i]['created_at']=intros[i]['created_at'].replace(' ',' / ');
      if (intros[i]['friend_2_image_loaded'] === false)
        this.loadImage(intros[i], 'friend_2');

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
      this.getMadeIntros();
    } else {
      this.disableScroll();
    }
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

  public gotoDetail(event:Event, intro:any): void {
    event.stopPropagation();
    this.app.getRootNav().push(DetailIntrosPage, { introId: intro.id });
  }

  public goMessages(event:Event, intro:any): void {
    event.stopPropagation();
    this.app.getRootNav().push(ChatMessagesPage, { introId: intro.id });
  }

  public goReceivedMessages(): void {
    this.navCtrl.pop(ReceivedMessagesPage);
  }
}
