import { Component, ViewChild, } from '@angular/core';
import { TabService } from './tabs.service';
import { HomePage } from '../dashboard/home';
import { ListContactsPage } from '../contacts/list_contacts';
import { MadeMessagesPage } from '../messages/made_messages';
import { AddIntrosPage } from '../intros/add_intros';
import { LoginPage } from '../login/login';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../lib/session.service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('introTabs') tabRef: TabsPage;
  tabs: any = [
    HomePage,
    ListContactsPage,
    AddIntrosPage,
    MadeMessagesPage
  ];
  defaultTabs: any = [
    HomePage,
    ListContactsPage,
    AddIntrosPage,
    MadeMessagesPage
  ];
  currentTab: any = 0;

  constructor(public tabService: TabService, public menuCtrl: MenuController, private sessionService: SessionService, public navCtrl: NavController, public navParams: NavParams) {//translateService si queremos cambia el idioma en esta pagina
    this.sessionService.getSessionStatus().then(function(result) {
      if (result === false)
        this.navCtrl.setRoot(LoginPage);
    }.bind(this));
  }

  public tabChange(tab: any) {
    this.currentTab = tab.index;
    let max = this.tabs.length;
    for (let i = 0; i < max; i++) {
      if (i === tab.index) {
        this.tabs[i] = null;
        if (document.getElementById('tab-t0-' + i) !== undefined && document.getElementById('tab-t0-' + i) !== null)
          document.getElementById('tab-t0-' + i).setAttribute('disabled', 'disabled');
        if (document.getElementById('tab-t1-' + i) !== undefined && document.getElementById('tab-t1-' + i) !== null)
          document.getElementById('tab-t1-' + i).setAttribute('disabled', 'disabled');
      } else {
        this.tabs[i] = this.defaultTabs[i];
        if (document.getElementById('tab-t0-' + i) !== undefined && document.getElementById('tab-t0-' + i) !== null)
          document.getElementById('tab-t0-' + i).removeAttribute('disabled');
        if (document.getElementById('tab-t1-' + i) !== undefined && document.getElementById('tab-t1-' + i) !== null)
          document.getElementById('tab-t1-' + i).removeAttribute('disabled');
      }
    }
  }

  ionViewDidEnter():void{
    console.log('ionViewDidEnter');
    console.log(document.getElementById('tab-t0-0'));
  }

  ionViewDidLoad():void{
    console.log('ionViewDidLoad');
    console.log(document.getElementById('tab-t0-0'));
  }


  public openUserMenu(): void {
    this.menuCtrl.open();
  }
}
