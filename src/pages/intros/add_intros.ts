import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(public app: App, private navCtrl: NavController, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public sanitizer: DomSanitizer) {
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.route = this.configService.getDomainImages() + '/profiles/';
      }
    );

    this.intros['friend_1']= {
      'id_user':'',
      'email':'',
      'push_id':'',
      'first_name':'',
      'last_name':'',
      'image_loaded' : true,
      'friend_loaded' : false,
      'image_profile': this.sanitizer.bypassSecurityTrustStyle('url('+this.configService.getProfileImage()+')')
    };
    this.intros['friend_2']= {
      'id_user':'',
      'email':'',
      'push_id':'',
      'first_name':'',
      'last_name':'',
      'image_loaded' : true,
      'friend_loaded' : false,
      'image_profile': this.sanitizer.bypassSecurityTrustStyle('url('+this.configService.getProfileImage()+')')
    };
  }

  public ngOnInit(): void {}

  public addContact(friend:string):void{
    this.app.getRootNav().push(PickContactsPage,{target:friend, intros:this.intros });
  }

  public nextStep():void{
    this.navCtrl.push(FormIntrosPage, {intros:this.intros });
  }
}
