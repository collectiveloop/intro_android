import { Component } from '@angular/core';

import { HomePage } from '../dashboard/home';
import { TabService } from './tabs.service';

import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HomePage;
  tab3Root = HomePage;
  tab4Root = HomePage;

  constructor(public tabService: TabService, public menuCtrl: MenuController) {//translateService si queremos cambia el idioma en esta pagina
  }

  public openUserMenu(): void {
    console.log('zxfsdfsd');
    this.menuCtrl.open();
  }
}
