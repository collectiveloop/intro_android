import { Component } from '@angular/core';
import { NavController, App, LoadingController, Platform, ActionSheetController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { FileChooser } from '@ionic-native/file-chooser';
import { ImagePicker } from '@ionic-native/image-picker';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-user-update',
  templateUrl: 'user_update.html',
  providers:[ImagePicker]
})
export class UpdateUserPage {
  image: any;
  oldImage: string = '';
  imageTaken: boolean = false;
  updateForm: FormGroup;
  submitted: boolean;
  ready: boolean;
  errorUpdate: string;
  logo: string;
  facebookLogo: string;
  loader: any;
  loadingMessage:string = '';
  //menu
  optionsLabel: string='';
  cameraLabel: string='';
  galleryLabel: string='';
  cancelLabel: string='';


  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, private camera: Camera, private loadingCtrl: LoadingController, private platform: Platform, public actionSheetCtrl: ActionSheetController, private imagePicker: ImagePicker, public messages: MessageService) {
    this.buildValidations();
    this.logo = this.configService.getLogo('BIGGER');
    this.facebookLogo = this.configService.getLogo('FACEBOOK_BUTTON');
    this.image = this.configService.getProfileImage();
    this.ready = false;
  }

  ngAfterViewChecked() {
    //console.log("ngAfterViewChecked");
    let html = <HTMLElement>document.querySelector('page-user-update .background-1');
    html.style.backgroundSize=this.platform.width()+'px '+this.platform.height()+'px';
  }

  private buildValidations(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      last_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(15)])],
      confirm_password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(15)])],
      number_phones: ['', Validators.compose([Validators.minLength(7)])],
      facebookId: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }]
    });

    this.translateService.get('OPTIONS').subscribe(
      value=>{ this.optionsLabel = value; }
    );

    this.translateService.get('FROM_CAMERA').subscribe(
      value=>{ this.cameraLabel = value; }
    );

    this.translateService.get('FROM_GALLERY').subscribe(
      value=>{ this.galleryLabel = value; }
    );

    this.translateService.get('CANCEL').subscribe(
      value=>{ this.cancelLabel = value; }
    );

    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.messages.showMessage({
          content:this.loadingMessage
        });
        this.getUser();
      }
    );
  }

  private getUser():void{
    //consultamos los datos del usuario
    this.httpService.get({
      url: 'user',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      success: function(response: any): void {
        this.messages.closeMessage();
        console.log(response.data.user);
        let data = response.data.user;
        this.updateForm.controls['name'].patchValue(data.name);
        this.updateForm.controls['name'].setValue(data.name);
        this.updateForm.controls['last_name'].patchValue(data.last_name);
        this.updateForm.controls['last_name'].setValue(data.last_name);
        this.updateForm.controls['number_phones'].patchValue(data.number_phones);
        this.updateForm.controls['number_phones'].setValue(data.number_phones);
        this.updateForm.controls['email'].patchValue(data.email);
        this.updateForm.controls['email'].setValue(data.email);

        if (data.image_profile !== undefined && data.image_profile !== null && data.image_profile !== '') {
          this.image = this.configService.getDomainImages() + '/profiles/' + data.image_profile;
          this.oldImage = data.image_profile;
        }
        if (data.facebookId === '' || data.facebookId === undefined || data.facebookId === null) {
          this.translateService.get('NOT_FACEBOOK').subscribe(
            value => {
              this.updateForm.controls['facebookId'].patchValue(value);
              this.updateForm.controls['facebookId'].setValue(value);
            }
          );
        } else {
          this.updateForm.controls['facebookId'].patchValue(data.facebookId);
          this.updateForm.controls['facebookId'].setValue(data.facebookId);
        }
        this.ready = true;
      },
      context: this,
    });
  }

  public update(): void {
    this.errorUpdate = '';
    this.submitted = true;
    this.updateForm.value.password = this.updateForm.value.password.replace('"', '').replace('\'', '');
    if (this.updateForm.value.password !== this.updateForm.value.confirm_password) {
      this.translateService.get('PASSWORD_NOT_MATCH').subscribe(
        value => {
          this.errorUpdate = value;
        }
      );
      this.submitted = false;
      return;
    }

    this.messages.showMessage({
       content:this.loadingMessage
    });
    let data = {
      name: this.updateForm.value.name,
      last_name: this.updateForm.value.last_name,
      number_phones: this.updateForm.value.number_phones
    };

    if (this.imageTaken === true && this.oldImage !== undefined && this.oldImage != null && this.oldImage !== '')
      data['old_image_profile'] = this.oldImage;

    if (this.updateForm.value.password.trim() !== '')
      data['password'] = this.updateForm.value.password;

    //number_phones : this.updateForm.value.number_phones,
    let paramsPut = {
      url: 'user',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      inputs: data,
      success: this.callBackUpdate,
      error: this.callBackError,
      context: this,
    };
    if (this.imageTaken === true && this.image !== undefined && this.image != null && this.image !== '')
      paramsPut['files'] = { 'image_profile': this.image };

    this.httpService.put(paramsPut);
  }

  private callBackUpdate(response: any): void {
    this.messages.closeMessage();
    this.submitted = false;
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorUpdate = response.data.message;
    } else {
      this.navCtrl.pop();//hacemos pop ya que no debemo sadherirlo con puhs, ya esta en controller eso genera error de navegacion
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }

  public makeOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: this.optionsLabel,
      buttons: [
        {
          text: this.cameraLabel,
          handler: () => {
            console.log('Destructive clicked');
            this.takePicture();
          }
        },{
          text: this.galleryLabel,
          handler: () => {
            this.choosePicture();
          }
        },{
          text: this.cancelLabel,
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }

  public choosePicture(): void {

    this.imagePicker.getPictures({maximumImagesCount:1, outputType:0}).then((imageData) => {
      this.imageTaken = true;
      console.log(imageData);
      let canvas = document.createElement("canvas");
      let context = canvas.getContext('2d');
      let base_image = new Image();
      base_image.src = imageData[0].toString();
      base_image.onload = function(){
        let ratio = 0;
        if(base_image.naturalWidth>=base_image.naturalHeight)
          ratio = (this.platform.width()/base_image.naturalWidth);
        else
          ratio = (this.platform.height()/base_image.naturalHeight);
          console.log(ratio);
        var scaledImage = this.downScaleImage(base_image, ratio);
        canvas.width = scaledImage.width;
        canvas.height = scaledImage.height;
        context.drawImage(scaledImage,0,0,scaledImage.width,scaledImage.height);
        this.image = canvas.toDataURL();

      }.bind(this);

    }, (err) => { });

  }

  // scales the image by (float) scale < 1
  // returns a canvas containing the scaled image.
  public downScaleImage(img, scale) {
      var imgCV = document.createElement('canvas');
      imgCV.width = img.width;
      imgCV.height = img.height;
      var imgCtx = imgCV.getContext('2d');
      imgCtx.drawImage(img, 0, 0);
      return this.downScaleCanvas(imgCV, scale);
  }

  // scales the canvas by (float) scale < 1
  // returns a new canvas containing the scaled image.
  public downScaleCanvas(cv, scale) {
      if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
  scale = this.normaliseScale(scale);
      var sqScale = scale * scale; // square scale =  area of a source pixel within target
      var sw = cv.width; // source image width
      var sh = cv.height; // source image height
      var tw = Math.floor(sw * scale); // target image width
      var th = Math.floor(sh * scale); // target image height
      var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
      var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
      var tX = 0, tY = 0; // rounded tx, ty
      var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
      // weight is weight of current source point within target.
      // next weight is weight of current source point within next target's point.
      var crossX = false; // does scaled px cross its current px right border ?
      var crossY = false; // does scaled px cross its current px bottom border ?
      var sBuffer = cv.getContext('2d').
      getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
      var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
      var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b

      for (sy = 0; sy < sh; sy++) {
          ty = sy * scale; // y src position within target
          tY = 0 | ty;     // rounded : target pixel's y
          yIndex = 3 * tY * tw;  // line index within target array
          crossY = (tY !== (0 | ( ty + scale )));
          if (crossY) { // if pixel is crossing botton target pixel
              wy = (tY + 1 - ty); // weight of point within target pixel
              nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
          }
          for (sx = 0; sx < sw; sx++, sIndex += 4) {
              tx = sx * scale; // x src position within target
              tX = 0 |  tx;    // rounded : target pixel's x
              tIndex = yIndex + tX * 3; // target pixel index within target array
              crossX = (tX !== (0 | (tx + scale)));
              if (crossX) { // if pixel is crossing target pixel's right
                  wx = (tX + 1 - tx); // weight of point within target pixel
                  nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
              }
              sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
              sG = sBuffer[sIndex + 1];
              sB = sBuffer[sIndex + 2];
              if (!crossX && !crossY) { // pixel does not cross
                  // just add components weighted by squared scale.
                  tBuffer[tIndex    ] += sR * sqScale;
                  tBuffer[tIndex + 1] += sG * sqScale;
                  tBuffer[tIndex + 2] += sB * sqScale;
              } else if (crossX && !crossY) { // cross on X only
                  w = wx * scale;
                  // add weighted component for current px
                  tBuffer[tIndex    ] += sR * w;
                  tBuffer[tIndex + 1] += sG * w;
                  tBuffer[tIndex + 2] += sB * w;
                  // add weighted component for next (tX+1) px
                  nw = nwx * scale
                  tBuffer[tIndex + 3] += sR * nw;
                  tBuffer[tIndex + 4] += sG * nw;
                  tBuffer[tIndex + 5] += sB * nw;
              } else if (!crossX && crossY) { // cross on Y only
                  w = wy * scale;
                  // add weighted component for current px
                  tBuffer[tIndex    ] += sR * w;
                  tBuffer[tIndex + 1] += sG * w;
                  tBuffer[tIndex + 2] += sB * w;
                  // add weighted component for next (tY+1) px
                  nw = nwy * scale
                  tBuffer[tIndex + 3 * tw    ] += sR * nw;
                  tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                  tBuffer[tIndex + 3 * tw + 2] += sB * nw;
              } else { // crosses both x and y : four target points involved
                  // add weighted component for current px
                  w = wx * wy;
                  tBuffer[tIndex    ] += sR * w;
                  tBuffer[tIndex + 1] += sG * w;
                  tBuffer[tIndex + 2] += sB * w;
                  // for tX + 1; tY px
                  nw = nwx * wy;
                  tBuffer[tIndex + 3] += sR * nw;
                  tBuffer[tIndex + 4] += sG * nw;
                  tBuffer[tIndex + 5] += sB * nw;
                  // for tX ; tY + 1 px
                  nw = wx * nwy;
                  tBuffer[tIndex + 3 * tw    ] += sR * nw;
                  tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                  tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                  // for tX + 1 ; tY +1 px
                  nw = nwx * nwy;
                  tBuffer[tIndex + 3 * tw + 3] += sR * nw;
                  tBuffer[tIndex + 3 * tw + 4] += sG * nw;
                  tBuffer[tIndex + 3 * tw + 5] += sB * nw;
              }
          } // end for sx
      } // end for sy

      // create result canvas
      var resCV = document.createElement('canvas');
      resCV.width = tw;
      resCV.height = th;
      var resCtx = resCV.getContext('2d');
      var imgRes = resCtx.getImageData(0, 0, tw, th);
      var tByteBuffer = imgRes.data;
      // convert float32 array into a UInt8Clamped Array
      var pxIndex = 0; //
      for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
          tByteBuffer[tIndex] = 0 | ( tBuffer[sIndex]);
          tByteBuffer[tIndex + 1] = 0 | (tBuffer[sIndex + 1]);
          tByteBuffer[tIndex + 2] = 0 | (tBuffer[sIndex + 2]);
          tByteBuffer[tIndex + 3] = 255;
      }
      // writing result to canvas.
      resCtx.putImageData(imgRes, 0, 0);
      return resCV;
  }

  public log2(v) {
        // taken from http://graphics.stanford.edu/~seander/bithacks.html
var b =  [ 0x2, 0xC, 0xF0, 0xFF00, 0xFFFF0000 ];
var S =  [1, 2, 4, 8, 16];
var i=0, r=0;

for (i = 4; i >= 0; i--) {
  if (v & b[i])  {
    v >>= S[i];
    r |= S[i];
  }
}
    return r;
}
// normalize a scale <1 to avoid some rounding issue with js numbers
public normaliseScale(s) {
    if (s>1) throw('s must be <1');
    s = 0 | (1/s);
    var l = this.log2(s);
    var mask = 1 << l;
    var accuracy = 4;
    while(accuracy && l) { l--; mask |= 1<<l; accuracy--; }
    return 1 / ( s & mask );
}

  public takePicture(): void {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.BACK, //CAMARA FRONTAL
      targetWidth: 170,
      targetHeight: 170
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageTaken = true;
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
    }, (err) => {
      // Handle error
    });

  }
}
