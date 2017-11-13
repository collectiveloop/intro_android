import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';

@Component({
  selector: 'list-intros',
  templateUrl: 'list_intros.html'
})
export class ListIntrosPage implements OnInit {
  listIntros: Array<object> = [];
  loadingMessage:string = '';
  route:string ='';

  constructor(public app: App, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService) {}

  public ngOnInit(): void {
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        /*
        this.messages.showMessage({
           content:this.loadingMessage
        });
        */
        this.route = this.configService.getDomainImages() + '/profiles/';
        this.getIntros();
      }
    );
  }

  private getIntros(): void {
  }

  public gotoDetail(id): void {
    //this.navCtrl.push(DetailAboutPage, { id: id });
  }

}
