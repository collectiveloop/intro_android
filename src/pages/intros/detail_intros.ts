import { Component } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';
import { MessageService } from '../../lib/messages.service';
import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'detail-intros',
  templateUrl: 'detail_intros.html'
})
export class DetailIntrosPage {
  intro:any = {
    'friend_1_info':'',
    'friend_2_info':'',
    'reason':'',
    'gaining_intro':[]
  };
  errorIntro: string;
  ready:boolean = false;
  gainSelected: boolean = false;
  loadingMessage: string = '';
  introId: string = '';

  constructor(public navCtrl: NavController, public app: App, public httpService: HttpService, private translateService: TranslateService, public messages: MessageService, public navParams: NavParams) {
    if (this.navParams.get('introId') === undefined || this.navParams.get('introId') === null || this.navParams.get('introId') === '')
      this.navCtrl.pop();

    this.introId = this.navParams.get('introId');
    console.log(this.introId);
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.messages.showMessage({
          content: this.loadingMessage
        });
        this.getIntro();
      }
    );
  }

  public getIntro(): void {
    this.ready = false;
    let params = {
      url: 'intros',
      urlParams: [
        this.translateService.getDefaultLang(),
        this.introId
      ],
      app: this.app,
      success: this.callBackIntro,
      error: this.callBackError,
      context: this,
    };

    this.httpService.get(params);
  }

  private callBackIntro(response: any): void {
    this.ready = true;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorIntro = response.data.message;
    } else {
      if(response.data.intro!==null)
        this.intro = response.data.intro;
      this.intro.gaining_intro = [];
      if(response.data.gaining_intro!==null){
        let gaining_intro = response.data.gaining_intro;
        let gaining_intro_length = gaining_intro.length;
        for(let i=0;i<gaining_intro_length;i++){
          let row = gaining_intro[i];
          if(gaining_intro[i]['id']!==undefined && gaining_intro[i]['id']!==null)
          gaining_intro[i].value = true;
          else
          gaining_intro[i].value = false;

          this.intro.gaining_intro.push(row);
        }
      }
    }

    console.log(this.intro);
  }

  private callBackError(response: any): void {
    this.ready = true;
    this.messages.closeMessage();
  }

  public backAction(): void {
    this.navCtrl.pop();
  }
}
