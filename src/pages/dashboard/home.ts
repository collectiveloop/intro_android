import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { LoginPage } from '../../pages/login/login';
import { SessionService } from '../../lib/session.service';
import { MadeIntrosPage } from '../../pages/intros/made_intros';
import { ReceivedIntrosPage } from '../../pages/intros/received_intros';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dashboard: any = {
    'made': {
      'friend_1': {
        'image_loaded': false
      },
      'friend_2': {
        'image_loaded': false
      },
      'reason': '',
      'is': false
    },
    'received': {
      'friend': {
        'image_loaded': false
      },
      'reason': '',
      'is': false
    }
  };

  loadingMessage: string = '';
  ready: boolean = false;
  route: string = '';
  profileImages: string = '';

  constructor(public app: App, public navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, private sessionService: SessionService, public sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.route = this.configService.getDomainImages() + '/profiles/';
      }
    );
  }

  public dashBoardInit(): void {
    this.dashboard['made']['friend_1']['image_loaded'] = false;
    this.dashboard['made']['friend_2']['image_loaded'] = false;
    this.dashboard['made']['reason'] = '';
    this.dashboard['made']['is'] = false;
    this.dashboard['received']['friend']['image_loaded'] = false;
    this.dashboard['received']['reason'] = '';
    this.dashboard['received']['is'] = false;
  }

  ionViewWillEnter(): void {
    this.ready = false;
    console.log("ionViewWillEnter");
    this.sessionService.getSessionStatus().then(function(result) {
      if (result !== false) {
        //evaluamos a donde vamos a ir, si nos han pedido redireccion desde el app.component
        let destiny = this.sessionService.getDestinySession();
        if (destiny.params !== undefined && destiny.params.section !== undefined && destiny.params.section !== null && destiny.params.index !== undefined && destiny.params.index !== null) {
          if(ReceivedIntrosPage===destiny.params.section){
            this.gotoReceivedIntroDetail({id:''});
          }else{
            this.navCtrl.parent.select(destiny.params.index);
          }
          return;
        } else {
          this.sessionService.cleanDestinySession();
          this.getDashBoard();
        }
      } else {
        this.app.getRootNav().setRoot(LoginPage);
      }
    }.bind(this));
  }

  public getDashBoard(): void {
    this.dashBoardInit();
    this.messages.showMessage({
      content: this.loadingMessage
    });
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
    this.ready = true;
    this.messages.closeMessage();
    let board = response.data.dashboard;
    //validamos imagenes

    this.dashboard['count_made'] = board['count_made'];
    if (board['made'] !== undefined) {
      this.dashboard['made']['is'] = true;
      this.dashboard['made']['reason'] = board['made']['reason'];

      if (board['made']['friend_1_image_profile'] !== undefined && board['made']['friend_1_image_profile'] !== null && board['made']['friend_1_image_profile'] !== '') {
        this.dashboard['made']['friend_1']['image_profile'] = board['made']['friend_1_image_profile'];
        if (board['made']['friend_1_image_profile'].indexOf('http') === -1)
          this.dashboard['made']['friend_1']['image_profile'] = this.route + this.dashboard['made']['friend_1']['image_profile'];

        this.dashboard['made']['friend_1']['url'] = this.dashboard['made']['friend_1']['image_profile']; this.dashboard['made']['friend_1']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.dashboard['made']['friend_1']['image_profile'] + ')');
      } else {
        this.dashboard['made']['friend_1']['image_loaded'] = true;
        this.dashboard['made']['friend_1']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
      }
      this.dashboard['made']['friend_1']['first_name'] = board['made']['friend_1_first_name'];
      this.dashboard['made']['friend_1']['last_name'] = board['made']['friend_1_last_name'];

      if (this.dashboard['made']['friend_1']['image_loaded'] === false)
        this.loadImage(this.dashboard['made']['friend_1']);

      if (board['made']['friend_2_image_profile'] !== undefined && board['made']['friend_2_image_profile'] !== null && board['made']['friend_2_image_profile'] !== '') {
        this.dashboard['made']['friend_2']['image_profile'] = board['made']['friend_2_image_profile'];
        if (this.dashboard['made']['friend_2']['image_profile'].indexOf('http') === -1)
          this.dashboard['made']['friend_2']['image_profile'] = this.route + this.dashboard['made']['friend_2']['image_profile'];

        this.dashboard['made']['friend_2']['url'] = this.dashboard['made']['friend_2']['image_profile'];
        this.dashboard['made']['friend_2']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.dashboard['made']['friend_2']['image_profile'] + ')');
      } else {
        this.dashboard['made']['friend_2']['image_loaded'] = true;
        this.dashboard['made']['friend_2']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
      }
      this.dashboard['made']['friend_2']['first_name'] = board['made']['friend_2_first_name'];
      this.dashboard['made']['friend_2']['last_name'] = board['made']['friend_2_last_name'];

      if (this.dashboard['made']['friend_2']['image_loaded'] === false)
        this.loadImage(this.dashboard['made']['friend_2']);
    }

    this.dashboard['count_received'] = board['count_received'];
    if (board['received'] !== undefined) {
      this.dashboard['received']['is'] = true;
      this.dashboard['received']['reason'] = board['received']['reason'];
      if (board['received']['friend_image_profile'] !== undefined && board['received']['friend_image_profile'] !== null && board['received']['friend_image_profile'] !== '') {
        this.dashboard['received']['friend']['image_profile'] = board['received']['friend_image_profile'];
        if (this.dashboard['received']['friend']['image_profile'].indexOf('http') === -1)
          this.dashboard['received']['friend']['image_profile'] = this.route + this.dashboard['received']['friend']['image_profile'];

        this.dashboard['received']['friend']['url'] = this.dashboard['received']['friend']['image_profile'];
        this.dashboard['received']['friend']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.dashboard['received']['friend']['image_profile'] + ')');
      } else {
        this.dashboard['received']['friend']['image_loaded'] = true;
        this.dashboard['received']['friend']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
      }
      this.dashboard['received']['friend']['first_name'] = board['received']['friend_first_name'];
      this.dashboard['received']['friend']['last_name'] = board['received']['friend_last_name'];

      if (this.dashboard['received']['friend']['image_loaded'] === false)
        this.loadImage(this.dashboard['received']['friend']);
    }

  }

  private loadImage(image: any): void {
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({ 'image': image });
    img.onerror = this.onErrorHandler.bind({ 'image': image, 'config': this.configService, 'sanitizer': this.sanitizer });
    img.src = image.url;
  }

  private onloadHandler(data): void {
    console.log(this['image']);
    this['image']['image_loaded'] = true;
  }

  private onErrorHandler(data:any): void {
    console.log("error");
    console.log(data);
    this['image']['image_loaded'] = true;
    this['image']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this['config'].getProfileImage() + ')');
  }

  public gotoMadeIntroDetail(intro: any): void {
    this.app.getRootNav().push(MadeIntrosPage, { id: intro.id });
  }

  public gotoReceivedIntroDetail(intro: any): void {
    this.app.getRootNav().push(ReceivedIntrosPage, { id: intro.id });
  }

}
