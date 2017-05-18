import { Component } from '@angular/core';
import { NavController, NavParams , AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import { CalendarPage } from '../calendar/calendar';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
calendarEvent:any=[];
selectedDate:Date;
startDateString:String;
endDateString:String;
admin_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http : Http,public alertCtrl:AlertController,public str: Storage) {
   this.selectedDate = this.navParams.get('selectedDate');
   this.startDateString = moment(this.selectedDate).format()
   this.endDateString = moment(this.selectedDate).format()
   console.log(moment(this.selectedDate).format())
  }

  ionViewDidLoad() {
    console.log(this.selectedDate + 'From evnt');

  }
  add(){
    var titie = this.calendarEvent.event_title
    var startdate = this.startDateString
    var enddate = this.endDateString   
    this.str.get('token').then((val) => {
      this.admin_id = val;
    let Params = "event_title=" + titie + "&event_startdate=" + startdate +"&event_enddate=" + enddate + "&admin_id=" + this.admin_id; 
    let link = "http://angsila.cs.buu.ac.th/~56160355/Project/addEvent.php?" + Params;
    this.http.get(link)
      .map (res => res.json() )
      .subscribe(data => {

        this.navCtrl.pop()
      });
  })
} 
}


