import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { HttpService } from '../../lib/http.service';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { UtilService } from '../../lib/utils.service';
import { TabService } from '../tabs/tabs.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  introductions: Array<object> = [];
  maxIntroductions: number;
  quantity: number;
  page: number;
  infiniteScroll: any;
  loadingMessage:string = '';

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private configService: ConfigService, private utilService: UtilService, private tabService: TabService, private translateService: TranslateService, private loadingCtrl: LoadingController, public messages: MessageService) {
    this.translateService.get('HOME').subscribe(
      value => {
        console.log(value);
        this.configService.setSection(value);
      }
    );
  }

  public ngOnInit(): void {
    /*
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.messages.showMessage({
           content:this.loadingMessage
        });
        this.quantity = this.configService.getQuantity();
        this.page = 1;
      //  this.getCountIntroductions();
      }
    );
    */
  }

  private getCountIntroductions(): void {
    /*
    this.httpService.get({
      url: 'introductions',
      urlParams: [
        this.translateService.getDefaultLang(),
        'count'
      ],
      app: this.app,
      success: this.callBackCountIntroductions,
      context: this
    });
    */
  }

  private callBackCountIntroductions(response): void {
    this.maxIntroductions = response.data.Introductions_count;
    //si los Introductionos son mayores a 1, cambiamos el nombre del tab
    if (this.maxIntroductions != 0)
      this.getIntroductions();
  }


  public getMoreIntroductions(infiniteScroll): void {
    if (this.maxIntroductions > this.introductions.length) {
      this.infiniteScroll = infiniteScroll;
      this.messages.showMessage({
         content:this.loadingMessage
      });
      this.getIntroductions();
    } else {
      this.disableScroll();
    }
  }

  private getIntroductions(): void {
    /*
    this.httpService.get({
      url: 'introductions',
      app: this.app,
      urlParams: [
        this.translateService.getDefaultLang(),
        { page: this.page },
        { quantity: this.quantity },
      ],
      success: this.callBackIntroductions,
      context: this
    });
    */
  }

  private callBackIntroductions(response): void {
    this.messages.closeMessage();
    this.page++;
  }



  private refreshScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.complete();
  }

  private disableScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(false);
  }

  public gotoDetail(id): void {
    //this.navCtrl.push(DetailAboutPage, { id: id });
  }

}
