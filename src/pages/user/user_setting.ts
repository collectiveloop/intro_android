import { Component } from '@angular/core';
import { NavController, NavParams, App, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { SessionService } from '../../lib/session.service';

import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-user-setting',
  templateUrl: 'user_setting.html'
})
export class SettingUserPage {
  registerSetting: FormGroup;
  submitted: boolean;
  errorSetting: string;
  logo: string;
  loader: any;
  loadingMessage: string = '';
  imageProfile: any;
  params: any;
  imageTaken:boolean = false;
  ios:boolean = false;

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, private sessionService: SessionService, public navParams: NavParams, private platform: Platform, public messages: MessageService, private camera: Camera) {
    this.params = { 'email': this.navParams.get('email'), 'password': this.navParams.get('password'), 'user_id': this.navParams.get('user_id') };
    this.buildValidations();
    this.configService.setSection('');
    this.translateService.get('SETTINGS').subscribe(
      value => {
        this.configService.setSection(value);
      }
    );
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER');
      }
    );
    if (this.params !== undefined && typeof this.params !== 'object') {
      this.submitted = true;
    }

    if (this.platform.is('ios')) {
      this.ios = true;
    }else{
      this.ios = false;
    }
  }

  ngAfterViewChecked() { }

  private buildValidations() {
    this.registerSetting = this.formBuilder.group({
      full_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      job_title: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      company_name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      job_description: ['', Validators.compose([Validators.minLength(3)])],
      //email: [  this.params['email'], Validators.compose([Validators.minLength(5), Validators.email,
      email: [  '', Validators.compose([Validators.minLength(5), Validators.email, Validators.required])]
    });
  }

  public makeImage(): void{
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.BACK, //CAMARA FRONTAL
      targetWidth: 200,
      targetHeight: 200
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageTaken = true;
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageProfile = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  public back(): void {
    this.app.getRootNav().pop();
  }

  public register(): void {
    this.errorSetting = '';
    this.submitted = true;
    let data = {
      full_name: this.registerSetting.value.full_name,
      job_title: this.registerSetting.value.job_title,
      company_name: this.registerSetting.value.commpany_name,
      job_description: this.registerSetting.value.job_description,
      email: this.registerSetting.value.email
    };
    let paramsPut = {
      url: 'user/setting',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      inputs: data,
      success: this.callBackRegister,
      error: this.callBackError,
      context: this,
    };
    if (this.imageTaken === true && this.imageProfile !== undefined && this.imageProfile != null && this.imageProfile !== '')
      paramsPut['files'] = { 'image_profile': this.imageProfile };

    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.httpService.put(paramsPut);
  }

  private callBackRegister(response: any): void {
    this.submitted = false;
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.messages.closeMessage();
      this.errorSetting = response.data.message;
    } else {
      //aqui deberia ir un toast
      let data = {
        email: this.registerSetting.value.email,
        password: this.params['password']
      };
      this.httpService.post({
        url: 'login/authenticate',
        urlParams: [
          this.translateService.getDefaultLang()
        ],
        app: this.app,
        inputs: data,
        success: this.callBackLogin,
        context: this,
      });
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }

  private callBackLogin(response: any): void {
    this.messages.closeMessage();
    this.submitted = false;
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorSetting = response.data.message;
    } else {
      this.navCtrl.push(TabsPage);
    }
  }
}
