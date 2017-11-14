import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';

@Component({
  selector: 'received-messages',
  templateUrl: 'received_messages.html'
})
export class ReceivedMessagesPage implements OnInit {
  listMessages: Array<object> = [];
  loadingMessage:string = '';
  route:string ='';

  constructor(public app: App, private translateService: TranslateService, private configService: ConfigService) {}

  public ngOnInit(): void {

    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.route = this.configService.getDomainImages() + '/profiles/';
        this.getMessages();
      }
    );

    //ME ESTA TRAYENDO OTROS INTROS NO DEL USUARIO
  }

  private getMessages(): void {

  }

  public gotoDetail(id): void {
    //this.navCtrl.push(DetailAboutPage, { id: id });
  }

}
