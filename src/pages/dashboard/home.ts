import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { LoginPage } from '../../pages/login/login';
import { SessionService } from '../../lib/session.service';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dashboard: any = {
    'made' : {
      'friend_1': {
        'imageLoaded' : false
      },
      'friend_2': {
        'imageLoaded' : false
      },
      'reason':'',
      'is':false
    },
    'received' :{
      'friend': {
        'imageLoaded' : false
      },
      'reason':'',
      'is':false
    }
  };

  loadingMessage:string = '';
  route:string ='';
  profileImages:string ='';

  constructor(public app: App, public navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, private sessionService: SessionService) {
  }

  public ngOnInit(): void {
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.route = this.configService.getDomainImages() + '/profiles/';
      }
    );
  }

  public dashBoardInit():void{
      this.dashboard['made']['friend_1']['imageLoaded'] = false;
      this.dashboard['made']['friend_2']['imageLoaded'] = false;
      this.dashboard['made']['reason'] = '';
      this.dashboard['made']['is'] = false;
      this.dashboard['received']['friend']['imageLoaded'] = false;
      this.dashboard['received']['reason'] = '';
      this.dashboard['received']['is'] = false;
  }

    ionViewWillEnter():void{
        console.log("ionViewWillEnter");
        this.sessionService.getSessionStatus().then(function(result) {
          if (result !== false){
            //evaluamos a donde vamos a ir, si nos han pedido redireccion desde el app.component
            let destiny = this.sessionService.getDestinySession();
            if(destiny.params!==undefined && destiny.params.section!==undefined && destiny.params.section!==null && destiny.params.index!==undefined && destiny.params.index!==null){
              this.navCtrl.parent.select(destiny.params.index);
              return;
          }else{
              this.sessionService.cleanDestinySession();
              this.getDashBoard();
          }
         }else{
             this.navCtrl.setRoot(LoginPage);
         }
        }.bind(this));
    }

  public getDashBoard(): void {
    this.dashBoardInit();
    this.messages.showMessage({
       content:this.loadingMessage
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
    this.messages.closeMessage();
    let board = response.data.dashboard;
    //validamos imagenes

    this.dashboard['count_made'] = board['count_made'];
    if(board['made']!==undefined){
      this.dashboard['made']['is'] = true;
      this.dashboard['made']['reason'] = board['made']['reason'];

      if(board['made']['friend_1_image_profile']!==undefined && board['made']['friend_1_image_profile']!==null && board['made']['friend_1_image_profile']!==''){
        this.dashboard['made']['friend_1_image_profile'] = board['made']['friend_1_image_profile'];
        if(board['made']['friend_1_image_profile'].indexOf('http') === -1)
          this.dashboard['made']['friend_1_image_profile'] = this.route+this.dashboard['made']['friend_1_image_profile'];

        this.dashboard['made']['friend_1']['url'] = this.dashboard['made']['friend_1_image_profile'];
      }else{
        this.dashboard['made']['friend_1']['imageLoaded'] = true;
        this.dashboard['made']['friend_1_image_profile'] = this.configService.getProfileImage();
      }
      this.dashboard['made']['friend_1_first_name'] = board['made']['friend_1_first_name'];
      this.dashboard['made']['friend_1_last_name'] = board['made']['friend_1_last_name'];

      if(this.dashboard['made']['friend_1']['imageLoaded'] ===false)
        this.loadImage(this.dashboard['made']['friend_1']);


      if(board['made']['friend_2_image_profile']!==undefined && board['made']['friend_2_image_profile']!==null && board['made']['friend_2_image_profile']!==''){
        this.dashboard['made']['friend_2_image_profile'] = board['made']['friend_2_image_profile'];
        if(this.dashboard['made']['friend_2_image_profile'].indexOf('http') === -1)
          this.dashboard['made']['friend_2_image_profile'] = this.route+this.dashboard['made']['friend_2_image_profile'];

        this.dashboard['made']['friend_2']['url'] = this.dashboard['made']['friend_2_image_profile'];
      }else{
        this.dashboard['made']['friend_2']['imageLoaded'] = true;
        this.dashboard['made']['friend_2_image_profile'] = this.configService.getProfileImage();
      }
      this.dashboard['made']['friend_2_first_name'] = board['made']['friend_2_first_name'];
      this.dashboard['made']['friend_2_last_name'] = board['made']['friend_2_last_name'];

      if(this.dashboard['made']['friend_2']['imageLoaded'] ===false)
        this.loadImage(this.dashboard['made']['friend_2']);
    }


    this.dashboard['count_received'] = board['count_received'];
    if(board['received']!==undefined){
      this.dashboard['received']['is'] = true;
      this.dashboard['received']['reason'] = board['received']['reason'];
      if(board['received']['friend_image_profile']!==undefined && board['received']['friend_image_profile']!==null && board['received']['friend_image_profile']!==''){
        this.dashboard['received']['friend_image_profile'] = board['received']['friend_image_profile'];
        if(board['received']['friend_image_profile'].indexOf('http') === -1)
        this.dashboard['received']['friend_image_profile'] = this.route+this.dashboard['received']['friend_image_profile'];

        this.dashboard['received']['friend']['url'] = this.dashboard['received']['friend_image_profile'];
      }else{
        this.dashboard['received']['friend']['imageLoaded'] = true;
        this.dashboard['received']['friend_image_profile'] = this.configService.getProfileImage();
      }
      this.dashboard['received']['friend_first_name'] = board['received']['friend_first_name'];
      this.dashboard['received']['friend_last_name'] = board['received']['friend_last_name'];

      if(this.dashboard['received']['friend']['imageLoaded'] ===false)
      this.loadImage(this.dashboard['received']['friend']);
    }

  }

  private loadImage(image:any):void{
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({'image':image});
    img.src = image.url;
  }

  private onloadHandler(data):void{
    if(this['image']!==undefined)
      this['image'].imageLoaded = true;
  }

  public gotoDetail(id): void {
    //this.navCtrl.push(DetailAboutPage, { id: id });
  }

}
