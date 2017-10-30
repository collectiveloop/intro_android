import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Platform, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ImagePicker } from '@ionic-native/image-picker';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';

import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user_profile.html',
  providers: [
    Camera,
    File,
    FilePath,
    ImagePicker
  ]
})
export class ProfileUserPage {
  @ViewChild('firstName') firstName;
  @ViewChild('lastName') lastName;
  @ViewChild('userName') userName;
  @ViewChild('email') email;
  @ViewChild('fullName') fullName;
  @ViewChild('jobTitle') jobTitle;
  @ViewChild('companyName') companyName;
  @ViewChild('jobDescription') jobDescription;
  updateProfile: FormGroup;
  submitted: boolean;
  ready: boolean;
  errorProfile: string = '';
  successProfile: string = '';
  logo: string;
  loader: any;
  loadingMessage: string = '';
  requiredMessage: string = '';
  imageProfile: any;
  oldImageProfile: string = '';
  params: any;
  imageTaken: boolean = false;
  ios: boolean = false;
  actionSheet: any;
  imageDefault:any;
  optionsImage: any = [];
  optionsCamera: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    sourceType: this.camera.PictureSourceType.CAMERA,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection: this.camera.Direction.BACK, //CAMARA FRONTAL
    targetWidth: 350,
    targetHeight: 350
  };

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public navParams: NavParams, private platform: Platform, public messages: MessageService, private camera: Camera, public actionSheetCtrl: ActionSheetController, private imagePicker: ImagePicker, private file: File, private filePath: FilePath) {
    this.params = { 'show_signup': this.navParams.get('show_signup'), 'user_id': this.navParams.get('user_id') };
    this.ready = false;
    this.buildValidations();
    this.imageDefault = this.configService.getProfileSize();
    //SI NO HAY VALORS POR DEFECTO PONEMOS ALGO
    if(this.imageDefault===false){
       this.imageDefault.WIDTH = 100;
       this.imageDefault.HEIGHT = 100;
    }

    this.optionsCamera.targetWidth = this.imageDefault.WIDTH;
    this.optionsCamera.targetHeight = this.imageDefault.HEIGHT;
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER');
        this.messages.showMessage({
          content: this.loadingMessage
        });
      }
    );

    this.translateService.get('INVALID_FORM').subscribe(
      value => {
        this.requiredMessage = value;
      }
    );

    this.translateService.get('OPTIONS').subscribe(
      value => {
        this.optionsImage['OPTIONS'] = value;
      }
    );

    this.translateService.get('FROM_CAMERA').subscribe(
      value => {
        this.optionsImage['FROM_CAMERA'] = value;
      }
    );

    this.translateService.get('FROM_GALLERY').subscribe(
      value => {
        this.optionsImage['FROM_GALLERY'] = value;
      }
    );

    this.translateService.get('CANCEL').subscribe(
      value => {
        this.optionsImage['CANCEL'] = value;
      }
    );

    if (this.params !== undefined && typeof this.params !== 'object') {
      this.submitted = true;
    }

    if (this.platform.is('ios')) {
      this.ios = true;
    } else {
      this.ios = false;
    }

    let paramsPut = {
      url: 'user',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      success: this.callBackProfiles,
      error: this.callBackError,
      context: this,
    };

    this.httpService.get(paramsPut);
  }

  private buildValidations() {
    this.updateProfile = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      last_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      user_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      job_title: ['', Validators.compose([Validators.minLength(2)])],
      company_name: ['', Validators.compose([Validators.minLength(3)])],
      job_description: ['', Validators.compose([Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.minLength(5), Validators.email, Validators.required])]
    });
  }

  private callBackProfiles(response: any): void {
    this.submitted = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorProfile = response.data.message;
    } else {
      let data = response.data.user;
      this.updateProfile.controls['first_name'].patchValue(data.first_name);
      this.updateProfile.controls['first_name'].setValue(data.first_name);
      this.updateProfile.controls['last_name'].patchValue(data.last_name);
      this.updateProfile.controls['last_name'].setValue(data.last_name);
      this.updateProfile.controls['user_name'].patchValue(data.user_name);
      this.updateProfile.controls['user_name'].setValue(data.user_name);
      this.updateProfile.controls['email'].patchValue(data.email);
      this.updateProfile.controls['email'].setValue(data.email);
      this.updateProfile.controls['job_title'].patchValue(data.job_title);
      this.updateProfile.controls['job_title'].setValue(data.job_title);
      this.updateProfile.controls['company_name'].patchValue(data.company_name);
      this.updateProfile.controls['company_name'].setValue(data.company_name);
      this.updateProfile.controls['job_description'].patchValue(data.job_description);
      this.updateProfile.controls['job_description'].setValue(data.job_description);
      this.ready = true;
      if (data.image_profile !== undefined && data.image_profile !== null && data.image_profile !== '') {
        if (data.image_profile.indexOf('http') !== -1){
          this.imageProfile = data.image_profile;
        }else{
          this.imageProfile = this.configService.getDomainImages() + '/profiles/' + data.image_profile;
          this.oldImageProfile = data.image_profile;
        }
      }
    }
  }

  public makeImage(): void {
    this.actionSheet = this.actionSheetCtrl.create({
      title: this.optionsImage['OPTIONS'],
      buttons: [
        {
          text: this.optionsImage['FROM_CAMERA'],
          handler: () => {
            this.takeCamera();
          }
        },
        {
          text: this.optionsImage['FROM_GALLERY'],
          handler: () => {
            this.takeGallery();
          }
        },
        {
          text: this.optionsImage['CANCEL'],
          role: 'cancel',
          handler: () => { }
        }
      ]
    });

    this.actionSheet.present();
  }

  public takeCamera(): void {
    const options = this.optionsCamera;
    this.camera.getPicture(options).then((imageData) => {
      this.imageTaken = true;
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageProfile = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  public takeGallery(): void {
    this.imagePicker.hasReadPermission().then((result) => {
      // if this is 'false' you probably want to call 'requestReadPermission' now
      if (!result) {
        this.imagePicker.requestReadPermission().then((permission) => {
          this.getImage();
        });
      } else {
        this.getImage();
      }
    }
    );
  }

  public getImage(): void {
    this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0, width: this.imageDefault.WIDTH,
	height: this.imageDefault.HEIGHT }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        let split = results[i].split('/');
        let path = results[i].substr(0, results[i].lastIndexOf('/'));
        let image = split[split.length - 1];

        this.file.readAsDataURL(path, image).then((result) => {
          this.imageTaken = true;
          this.imageProfile = result;
        });
      }
    }, (err) => { });
  }

  public handleLogin(action: any): void {
    this[action].setFocus();
  }

  public submitForm() {
    if (this.updateProfile.valid)
      this.update();
  }

  public update(): void {
    this.errorProfile = '';
    this.submitted = true;

    let data = {
      first_name: this.updateProfile.value.first_name,
      last_name: this.updateProfile.value.last_name,
      user_name: this.updateProfile.value.user_name.toLowerCase(),
      job_title: this.updateProfile.value.job_title,
      company_name: this.updateProfile.value.company_name,
      job_description: this.updateProfile.value.job_description,
      email: this.updateProfile.value.email.toLowerCase()
    };

    if (this.imageTaken === true && this.oldImageProfile !== undefined && this.oldImageProfile != null && this.oldImageProfile !== '')
      data['old_image_profile'] = this.oldImageProfile;

    let paramsPut = {
      url: 'user',
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
    this.ready = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorProfile = response.data.message;
    } else {
      this.backHome();
    }
  }

  public backAction(): void {
    if (this.updateProfile.valid && !this.submitted){
      this.update();
    }else{
      if(!this.updateProfile.valid && !this.submitted){
        this.messages.showMessage({
          content: this.requiredMessage,
          spinner:false,
          duration:2000
        });
      }
    }
  }

  public backHome(): void {
    if (this.navCtrl.parent !== undefined && this.navCtrl.parent !== null)
      this.navCtrl.parent.select(0);
    else
      this.navCtrl.push(TabsPage);
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
