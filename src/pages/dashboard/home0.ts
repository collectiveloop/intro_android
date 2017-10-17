import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { HttpService } from '../../lib/http.service';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { UtilService } from '../../lib/utils.service';
import { TabService } from '../tabs/tabs.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  products: Array<object> = [];
  maxProducts: number;
  typePage: string;
  quantity: number;
  page: number;
  infiniteScroll: any;
  loader: any;
  loadingMessage:string = '';

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private configService: ConfigService, private utilService: UtilService, private tabService: TabService, private translateService: TranslateService, private loadingCtrl: LoadingController, public messages: MessageService) {}

  public ngOnInit(): void {
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.messages.showMessage({
           content:this.loadingMessage
        });
        this.quantity = this.configService.getQuantity();
        this.page = 1;
        this.getCountProducts();
      }
    );
  }

  private getCountProducts(): void {
    this.httpService.get({
      url: 'products',
      urlParams: [
        this.translateService.getDefaultLang(),
        'count'
      ],
      app: this.app,
      success: this.callBackCountProducts,
      context: this
    });
  }

  private callBackCountProducts(response): void {
    this.maxProducts = response.data.products_count;
    //si los productos son mayores a 1, cambiamos el nombre del tab
    if (this.maxProducts != 0)
      this.getProducts();
  }


  public getMoreProducts(infiniteScroll): void {
    if (this.maxProducts > this.products.length) {
      this.infiniteScroll = infiniteScroll;
      this.messages.showMessage({
         content:this.loadingMessage
      });
      this.getProducts();
    } else {
      this.disableScroll();
    }
  }

  private getProducts(): void {
    this.httpService.get({
      url: 'products',
      app: this.app,
      urlParams: [
        this.translateService.getDefaultLang(),
        { page: this.page },
        { quantity: this.quantity },
      ],
      success: this.callBackProducts,
      context: this
    });
  }

  private callBackProducts(response): void {
    this.messages.closeMessage();
    this.page++;
    //si los productos son mayores a 1, cambiamos el nombre del tab
    if (response.data.products.length > 1 || (response.data.products.length === 1 && this.products.length > 0)) {
      this.products = this.products.concat(response.data.products);
    //  this.tabService.setAbout('PRODUCTS');
      this.buildMultipleProducts(this.products.length);
    } else {
      if (response.data.products.length === 1) {
        this.products = response.data.products[0];
        //this.tabService.setAbout('ABOUT');
        this.buildOneProduct();
      }
    }
  }

  private buildMultipleProducts(productsLength: number): void {
    this.typePage = "multiple";
    let init = ((this.page - 2) * this.quantity);//recordemos que en la funcion que llama a esta, incrementa page por eso hay que restar por 2
    for (let i = init; i < productsLength; i++) {
      if (this.products[i]['title_image'] !== null && this.products[i]['title_image'] !== undefined && this.products[i]['title_image'] !== '') {
        this.products[i]['type_title'] = 'image';
        this.products[i]['title_image'] = this.configService.getDomainImages() + '/products/' + this.utilService.getCropName(this.products[i]['name'].trim()) + '/' + this.products[i]['title_image'].trim();
      } else {
        this.products[i]['type_title'] = 'text';
      }

      //tratamos las imagenes
      if (this.products[i]['images'] !== '') {
        this.products[i]['images'] = this.configService.getDomainImages() + '/products/' + this.utilService.getCropName(this.products[i]['name'].trim()) + '/' + this.products[i]['images'].split(';')[0].trim();
      } else {
        this.products[i]['images'] = [];
      }
    }
    this.refreshScroll();
  }

  private buildOneProduct(): void {
    this.typePage = "individual";
    if (this.products['title_image'] !== null && this.products['title_image'] !== undefined && this.products['title_image'] !== '') {
      this.products['type_title'] = 'image';
      this.products['title_image'] = this.configService.getDomainImages() + '/products/' + this.utilService.getCropName(this.products['name'].trim()) + '/' + this.products['title_image'].trim();
    } else {
      this.products['type_title'] = 'text';
    }

    //tratamos las imagenes
    if (this.products['images'] !== '') {
      this.products['images'] = this.products['images'].split(';');
      let imagesLength = this.products['images'].length;
      for (let b = 0; b < imagesLength; b++) {
        let image = this.products['images'][b];
        this.products['images'][b] = {};
        this.products['images'][b]['src'] = this.configService.getDomainImages() + '/products/' + this.utilService.getCropName(this.products['name'].trim()) + '/' + image.trim();
        if (b % 2 == 0)
          this.products['images'][b]['style'] = 'images-collage-small';
        else
          this.products['images'][b]['style'] = 'images-collage';

      }
    } else {
      this.products['images'] = [];
    }

    this.refreshScroll();
  }

  private refreshScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.complete();
  }

  private disableScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(false);
  }

  public gotoDetail(id): void {
    //this.navCtrl.push(DetailAboutPage, { id: id });
  }

}
