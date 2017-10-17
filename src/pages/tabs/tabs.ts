import { Component } from '@angular/core';

import { HomePage } from '../dashboard/home';
import { TabService } from './tabs.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HomePage;
  tab3Root = HomePage;
  tab4Root = HomePage;
  tab5Root = HomePage;

  constructor(public tabService: TabService) {//translateService si queremos cambia el idioma en esta pagina
  }
}
