import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dashboard: Array<object> = [];
  loadingMessage:string = '';
  route:string ='';
  profileImages:string ='';

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService) {}

  public ngOnInit(): void {

    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.messages.showMessage({
           content:this.loadingMessage
        });
        this.route = this.configService.getDomainImages() + '/profiles/';
        this.getDashBoard();
      }
    );
  }

  private getDashBoard(): void {
    this.httpService.get({
      url: 'intros/dashboard',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      success: this.callBackDashBoard,
      context: this
    });
  }

  private callBackDashBoard(response): void {
    this.messages.closeMessage();
    this.dashboard = response.data.dashboard;
    //validamos imagenes
    if(this.dashboard['made']!==undefined && this.dashboard['made']['friend_1_image_profile']!==undefined && this.dashboard['made']['friend_1_image_profile']!==null && this.dashboard['made']['friend_1_image_profile']!==''){
      if(this.dashboard['made']['friend_1_image_profile'].indexOf('http') === -1)
        this.dashboard['made']['friend_1_image_profile'] = this.route+this.dashboard['made']['friend_1_image_profile'];
    }else{
      this.dashboard['made']['friend_1_image_profile'] = this.configService.getProfileImage();
    }

    if(this.dashboard['made']!==undefined && this.dashboard['made']['friend_2_image_profile']!==undefined && this.dashboard['made']['friend_2_image_profile']!==null && this.dashboard['made']['friend_2_image_profile']!==''){
      if(this.dashboard['made']['friend_2_image_profile'].indexOf('http') === -1)
        this.dashboard['made']['friend_2_image_profile'] = this.route+this.dashboard['made']['friend_2_image_profile'];
    }else{
      this.dashboard['made']['friend_2_image_profile'] = this.configService.getProfileImage();
    }

    if(this.dashboard['received']!==undefined && this.dashboard['received']['friend_image_profile']!==undefined && this.dashboard['received']['friend_image_profile']!==null && this.dashboard['received']['friend_image_profile']!==''){
      if(this.dashboard['received']['friend_image_profile'].indexOf('http') === -1)
        this.dashboard['received']['friend_image_profile'] = this.route+this.dashboard['received']['friend_image_profile'];
    }else{
      this.dashboard['made']['friend_image_profile'] = this.configService.getProfileImage();
    }

  }

  public gotoDetail(id): void {
    //this.navCtrl.push(DetailAboutPage, { id: id });
  }

}
