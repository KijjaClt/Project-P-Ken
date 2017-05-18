import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheet, ActionSheetController, Config,  } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ConferenceData } from '../../providers/conference-data';
import { Http } from '@angular/http';

/*
  Generated class for the News page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
   news : Object;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser,
    private http : Http
  ) { 
    this.Getnews().subscribe((data) =>{
      this.news = data;
      console.log(this.news);
      
    });
   }

  ionViewDidLoad() {
   console.log('ionViewDidLoad TeacherPage');
    }
    Getnews(){
       return this.http.get('http://angsila.cs.buu.ac.th/~56160355/Project/Get_news.php').map((res)=> res.json());
    }
  }


