import { Component } from '@angular/core';
import { App,NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../lib/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from '../../lib/messages.service';
import { ConfigService } from '../../lib/config.service';
import { DetailIntrosPage } from '../intros/detail_intros';
import { MadeMessagesPage } from '../messages/made_messages';

@Component({
  selector: 'received-intros',
  templateUrl: 'received_intros.html'
})
export class ReceivedIntrosPage {
  page: number = 1;
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
      if(id_user!=intros[i]['id_user_1']){
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
      }else{
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

      intros[i]['created_at']=intros[i]['created_at'].replace(' ',' / ');
      intros[i]['style']='crop';

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

  private refreshScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.complete();
  }

  private disableScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(false);
  }

  public gotoDetail(intro:any): void {
    this.navCtrl.push(DetailIntrosPage, { introId: intro.id });
  }

  public goMadeMessages(): void {
    this.navCtrl.pop(MadeMessagesPage);
  }
  public backAction(): void {
    this.navCtrl.pop();
  }
}
