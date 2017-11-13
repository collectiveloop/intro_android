import { Component, ViewChild, } from '@angular/core';
import { TabService } from './tabs.service';
import { HomePage } from '../dashboard/home';
import { ListContactsPage } from '../contacts/list_contacts';
import { ListMessagesPage } from '../messages/list_messages';
import { AddIntrosPage } from '../intros/add_intros';
import { LoginPage } from '../login/login';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../lib/session.service';


@Component({
  templateUrl: 'tabs.html'
})
  export class TabsPage {
  @ViewChild('introTabs') tabRef: TabsPage;
  tab1Root = HomePage;
  tab2Root = ListContactsPage;
  tab3Root = AddIntrosPage;
  tab4Root = ListMessagesPage;
  currentTab:any = 0;

  constructor(public tabService: TabService, public menuCtrl: MenuController, private sessionService: SessionService, public navCtrl: NavController, public navParams: NavParams) {//translateService si queremos cambia el idioma en esta pagina
    this.sessionService.getSessionStatus().then(function(result) {
      if (result === false)
        this.navCtrl.setRoot(LoginPage);
    }.bind(this));
  }

  public changeHome():void{
  }

  public openUserMenu(): void {
    this.menuCtrl.open();
  }
}
