import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { AddIntrosPage } from '../intros/add_intros';


@Component({
  selector: 'final-intros',
  templateUrl: 'final_intros.html'
})
export class FinalIntrosPage{
  final: any;
  loadingMessage:string = '';
  route:string ='';

  constructor(public app: App, private navCtrl: NavController, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public navParams: NavParams, public sanitizer: DomSanitizer) {
      if(this.navParams.get('final')===undefined || this.navParams.get('final')===null)
        this.navCtrl.pop();
       this.final = this.navParams.get('final');
       this.translateService.get('LOADING').subscribe(
         value=>{
            this.loadingMessage = value;
            this.route = this.configService.getDomainImages() + '/profiles/';
         }
    );
    this.loadImages();
  }

  private loadImages(): void {
    this.messages.closeMessage();
    console.log(this.final);
    this.final['user']['image_loaded'] = false;
    this.final['friend_1']['image_loaded'] = false;
    this.final['friend_2']['image_loaded'] = false;
    if(this.final['user']!==undefined){
      if(this.final['user']['image_profile']!==undefined && this.final['user']['image_profile']!==null && this.final['user']['image_profile']!==''){
        if(this.final['user']['image_profile'].indexOf('http') === -1)
          this.final['user']['image_profile'] = this.route+this.final['user']['image_profile'];

        this.final['user']['url'] = this.final['user']['image_profile'];
        this.final['user']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url('+this.final['user']['image_profile']+')');
      }else{
        this.final['user']['image_loaded'] = true;
        this.final['user']['image_profile'] = this.sanitizer.bypassSecurityTrustStyle('url('+this.configService.getProfileImage()+')');
      }
      if(this.final['user']['image_loaded'] ===false){
          this.loadImage(this.final['user']);
      }
    }
  }

  private loadImage(image:any):void{
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({'image':image});
    img.onerror = this.onErrorHandler.bind({ 'image': image, 'config':this.configService, 'sanitizer':this.sanitizer });
    img.src = image.url;
  }

  private onErrorHandler(data): void {
      this['image'].image_loaded = true;
      this['image'].image_profile = this.sanitizer.bypassSecurityTrustStyle('url('+this['config'].getProfileImage()+')');
  }


  private onloadHandler(data):void{
    if(this['image']!==undefined)
      this['image'].image_loaded = true;
  }

  public nextStep():void{
      this.final['user']= {
        'id_user':'',
        'email':'',
        'first_name':'',
        'last_name':'',
        'image_loaded' : true,
        'friend_loaded' : false,
        'image_profile': this.configService.getProfileImage()
      };
      this.final['friend_2']= {
        'id_user':'',
        'email':'',
        'first_name':'',
        'last_name':'',
        'image_loaded' : true,
        'friend_loaded' : false,
        'image_profile': this.configService.getProfileImage()
      };
      this.final['friend_2']= {
        'id_user':'',
        'email':'',
        'first_name':'',
        'last_name':'',
        'image_loaded' : true,
        'friend_loaded' : false,
        'image_profile': this.configService.getProfileImage()
      };
      this.navCtrl.parent.select(0);
      //this.navCtrl.push(FinalIntrosPage,{final:this.intros});
      this.navCtrl.push(AddIntrosPage);

  }
}
