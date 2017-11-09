import { Component } from '@angular/core';
import { TabService } from './tabs.service';
import { HomePage } from '../dashboard/home';
import { ListContactsPage } from '../contacts/list_contacts';
import { ListMessagesPage } from '../messages/list_messages';
import { AddIntrosPage } from '../intros/add_intros';
import { MenuController } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListContactsPage;
  tab3Root = AddIntrosPage;
  tab4Root = ListMessagesPage;

  constructor(public tabService: TabService, public menuCtrl: MenuController) {//translateService si queremos cambia el idioma en esta pagina
  }

  public openUserMenu(): void {
    this.menuCtrl.open();
  }
}
