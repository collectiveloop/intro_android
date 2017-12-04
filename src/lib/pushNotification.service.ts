import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { ConfigService } from './config.service';

@Injectable()
export class PushNotificationService {
  isDevice:boolean;
  constructor(public configService: ConfigService, public oneSignal:OneSignal, private platform: Platform) {
    if (this.platform.is('cordova'))
      this.isDevice = true;
    else
      this.isDevice = false;
  }

  public sendNotification(params: any): void {
    if (this.isDevice){
      let finalParams:any={
        include_player_ids:[],
        contents:params.contents,
        data:params.data,
        ios_badgeType:'Increase',
        ios_badgeCount:1
      };
      let idsLength = params.include_player_ids.length;
      for(let i=0;i < idsLength;i++){
        if(params.include_player_ids[i].trim()!=='')
          finalParams.include_player_ids.push(params.include_player_ids[i]);
      }

      this.oneSignal.postNotification(finalParams);
    }
  }

  public init(params:any):void{
    if (this.isDevice) {
      let oneSignal = this.configService.getOneSignal();
      this.oneSignal.startInit(oneSignal.APP_ID, oneSignal.GOOGLE_PROJECT_NUMBER);

      if(params['focusDisplaying']!==undefined && this.oneSignal.OSInFocusDisplayOption[params['focusDisplaying']]!==undefined)
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption[params['focusDisplaying']]);
      else
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      if(params.received!==undefined)
        this.oneSignal.handleNotificationReceived().subscribe(params.received);

      if(params.opened!==undefined)
        this.oneSignal.handleNotificationOpened().subscribe(params.opened);

      this.oneSignal.endInit();
    }
  }
}
