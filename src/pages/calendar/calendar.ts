import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { EventPage } from '../event/event';
import * as moment from 'moment';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };
   admin_id:any;
    selectedDate:Date;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private http : Http,
  public alertCtrl: AlertController,
  public str: Storage) {
    
      }
      

  ionViewDidEnter() {
       
      this.loadData()
  }

  ionViewDidLoad() {
       this.str.get('token').then((val) => {
       if(val == null){
         this.navCtrl.setRoot(LoginPage)
       }
       })
    console.log('ionViewDidLoad CalendarPage');
}

loadData() {
this.str.get('token').then((val) => {
      this.admin_id = val;
    this.http.get("http://angsila.cs.buu.ac.th/~56160355/Project/getEvents.php?admin_id="  + this.admin_id)
      .map (res => res.json() )
      .subscribe(data => {
        if (data == null) {
          return
        }
        this.loadEvent(null, data)
    });
})}
addEvent(){
    this.navCtrl.push(EventPage, {
        selectedDate: this.selectedDate
    });
}
  loadEvent(event,data) {
        this.eventSource = this.createRandomEvents(data);
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        
        this.presentConfirm(event)
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    presentConfirm(event) {
        let alert = this.alertCtrl.create({
            title: 'แจ้งเตือน',
            message: 'คุณต้องการลบเหตุการณ์นี้ใช่หรือไม่?',
            buttons: [
            {
                text: 'ไม่',
                role: 'cancel',
                handler: () => {
                console.log('Cancel clicked');
                }
            },
            {
                text: 'ใช่',
                handler: () => {
                    var titie = event.title
                    var startdate = moment(event.startTime).format()
                    var enddate = moment(event.endTime).format()  
                    this.str.get('token').then((val) => {
                            this.admin_id = val;
                    let Params = "event_title=" + titie + "&event_startdate=" + startdate +"&event_enddate=" + enddate + "&admin_id=" + this.admin_id; 
                    let link = "http://angsila.cs.buu.ac.th/~56160355/Project/deleteEvent.php?" + Params;
                    console.log(link)
                    this.http.get(link)
                    .map (res => res.json() )
                    .subscribe(data => {
                        this.loadData()
                    });
                })}
            }
            ]
        });
        alert.present();
    }


    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        this.selectedDate = ev.selectedTime
       
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
     createRandomEvents(data) {
        var events = [];
       data.forEach(myEvent => {
            events.push({
                title: myEvent.event_title,
                startTime: new Date(myEvent.event_startdate),
                endTime: new Date(myEvent.event_enddate),
                allDay: false
            });
        });
        return events;
    }
    
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}



