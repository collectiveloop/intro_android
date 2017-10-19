import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { TabService } from '../tabs/tabs.service';
import { ConfigService }   from '../../lib/config.service';


@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() options: object = { showTab: null, backEnabled: null, showHeader: null , logoEnabled: null, sectionEnabled: null, menuEnabled:null };
  menuIcon:string='';

  constructor(private tabService: TabService, private configService: ConfigService, private app: App, public platform: Platform) {
    this.initElementsByVersion();
  }

  ngOnInit(): void {}

  public initElementsByVersion(){
    if (this.platform.is('ios')) {
      this.menuIcon = 'ios-information-circle-outline';
    }else{
      this.menuIcon = 'md-more';
    }
  }

  private setTab(){
    if(this.tabService.getShowTab()!==this.options['showTab']){
      if (this.options!==undefined && this.options['showTab'] !== undefined )
        this.tabService.setShowTab(this.options['showTab']);
      else
        this.tabService.setShowTab(true);//cada vez que se cambie de pagina y no se indico showtab, conviene poerlo true para que lo ponga visible
    }
  }

  ngDoCheck() {
    this.setTab();
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }


}
