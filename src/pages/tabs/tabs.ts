import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { NewsPage } from '../news/news';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any =  NewsPage;
  tab2Root: any = SchedulePage;
  tab3Root: any = MapPage;
  
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
