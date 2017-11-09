import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { PickContactsPage } from '../contacts/pick_contacts';
import { FormIntrosPage } from './form_intros';

@Component({
  selector: 'add-intros',
  templateUrl: 'add_intros.html'
})
export class AddIntrosPage implements OnInit {
  intros: any = {
    'friend_1': {},
    'friend_2': {}
  };

  loadingMessage:string = '';
  route:string ='';
  profileImages:string ='';

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService) {
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.route = this.configService.getDomainImages() + '/profiles/';
      }
    );

    this.intros['friend_1']= {
      'id_user':'',
      'email':'',
      'first_name':'',
      'last_name':'',
      'image_loaded' : true,
      'friend_loaded' : false,
      'image_profile': this.configService.getProfileImage()
    };
    this.intros['friend_2']= {
      'id_user':'',
      'email':'',
      'first_name':'',
      'last_name':'',
      'image_loaded' : true,
      'friend_loaded' : false,
      'image_profile': this.configService.getProfileImage()
    };
  }

  public ngOnInit(): void {}

  public addContact(friend:string):void{
    this.app.getRootNav().push(PickContactsPage,{target:friend, intros:this.intros });
  }

  private callBackDashBoard(response): void {
    this.messages.closeMessage();
    let board = response.data.dashboard;
    //validamos imagenes

    this.intros['count_made'] = board['count_made'];
    if(board['made']!==undefined){
      this.intros['made']['is'] = true;
      this.intros['made']['reason'] = board['made']['reason'];

      if(board['made']['friend_1_image_profile']!==undefined && board['made']['friend_1_image_profile']!==null && board['made']['friend_1_image_profile']!==''){
        this.intros['made']['friend_1_image_profile'] = board['made']['friend_1_image_profile'];
        if(board['made']['friend_1_image_profile'].indexOf('http') === -1)
          this.intros['made']['friend_1_image_profile'] = this.route+this.intros['made']['friend_1_image_profile'];

        this.intros['made']['friend_1']['url'] = this.intros['made']['friend_1_image_profile'];
      }else{
        this.intros['made']['friend_1']['image_loaded'] = true;
        this.intros['made']['friend_1_image_profile'] = this.configService.getProfileImage();
      }
      this.intros['made']['friend_1_first_name'] = board['made']['friend_1_first_name'];
      this.intros['made']['friend_1_last_name'] = board['made']['friend_1_last_name'];

      if(this.intros['made']['friend_1']['image_loaded'] ===false)
        this.loadImage(this.intros['made']['friend_1']);


      if(board['made']['friend_2_image_profile']!==undefined && board['made']['friend_2_image_profile']!==null && board['made']['friend_2_image_profile']!==''){
        this.intros['made']['friend_2_image_profile'] = board['made']['friend_2_image_profile'];
        if(this.intros['made']['friend_2_image_profile'].indexOf('http') === -1)
          this.intros['made']['friend_2_image_profile'] = this.route+this.intros['made']['friend_2_image_profile'];

        this.intros['made']['friend_2']['url'] = this.intros['made']['friend_2_image_profile'];
      }else{
        this.intros['made']['friend_2']['image_loaded'] = true;
        this.intros['made']['friend_2_image_profile'] = this.configService.getProfileImage();
      }
      this.intros['made']['friend_2_first_name'] = board['made']['friend_2_first_name'];
      this.intros['made']['friend_2_last_name'] = board['made']['friend_2_last_name'];

      if(this.intros['made']['friend_2']['image_loaded'] ===false)
        this.loadImage(this.intros['made']['friend_2']);
    }
  }

  private loadImage(image:any):void{
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({'image':image});
    img.src = image.url;
  }

  public nextStep():void{
    this.navCtrl.push(FormIntrosPage, {intros:this.intros });
  }

  private onloadHandler(data):void{
    if(this['image']!==undefined)
      this['image'].image_loaded = true;
  }
}
