import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class MessageService {
  loading: any;
  isLoading: boolean = false;

  constructor(public loadingCtrl: LoadingController) { }

  public showMessage(params: any): void {
    let config = {
      content:''
    };

    console.log(params.spinner);
    if (params.spinner === undefined || params.spinner === null || params.spinner === true)
      config['spinner'] = 'crescent';
    else
      config['spinner'] = 'hide';

    if (params.content !== undefined)
      config['content'] = params.content;

    if (params.duration !== undefined)
      config['duration'] = params.duration;

    this.closeMessage();
    this.loading = this.loadingCtrl.create(config);

    if (params.onDisMiss !== undefined && typeof params.onDisMiss == 'function')
      this.loading.onDidDismiss = params.onDismiss;

    this.loading.present();
    this.isLoading = true;
  }

  public closeMessage(): void {
    if (this.isLoading) {
      this.loading.dismiss();
      this.isLoading = false;
    }
  }
}
