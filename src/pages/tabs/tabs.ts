import { Component } from '@angular/core';

import { TabService } from './tabs.service';

import { HomePage } from '../dashboard/home';
import { SettingUserPage } from '../user/user_setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HomePage;
  tab3Root = HomePage;
  tab4Root = HomePage;
  tab5Root = SettingUserPage;

  constructor(public tabService: TabService) {//translateService si queremos cambia el idioma en esta pagina
  }
}
