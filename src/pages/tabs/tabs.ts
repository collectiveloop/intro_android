import { Component, ViewChild } from '@angular/core';
import { TabService } from './tabs.service';
import { HomePage } from '../dashboard/home';
import { ListContactsPage } from '../contacts/list_contacts';
import { ListMessagesPage } from '../messages/list_messages';
import { AddIntrosPage } from '../intros/add_intros';
import { MenuController, NavController } from 'ionic-angular';
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
  navParams:any={};

  constructor(public tabService: TabService, public menuCtrl: MenuController, private sessionService: SessionService, private navCtrl: NavController) {//translateService si queremos cambia el idioma en esta pagina
    console.log("sdfsdfsd");
    this.sessionService.getSessionStatus().then(function(result) {
      if (result === false){
        this.navCtrl.popToRoot();
      }else{
        //evaluamos a donde vamos a ir, si nos han pedido redireccion desde el app.component
        let destiny = this.sessionService.getDestinySession();
        console.log("aqui");
        console.log(destiny);
        if(destiny.params.section!==undefined && destiny.params.section!==null && destiny.params.index!==undefined && destiny.params.index!==null){
          console.log("dsfdsfsdfsfsdfsdfsdfsd");
          this.navParams['target'] = destiny.params.section;
          this.tabRef.select(destiny.params.index);

        }
      }
    }.bind(this));
  }

  public openUserMenu(): void {
    this.menuCtrl.open();
  }
}
