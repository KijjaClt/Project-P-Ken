import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/*
  Generated class for the Simisum page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-simisum',
  templateUrl: 'simisum.html'
})
export class SimisumPage {
  item:any
  typeEx = ["อ่านหนังสือ", "ทำแบบฝึกหัด","ติวเตอร์"];
  sums = [];
  maxHour = [];
  numHour = 0;
  selectType:any;
  selectEx:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http : Http , public alertCtrl:AlertController) {
    console.log(this.selectType)
  }
  ionViewDidLoad() {
    this.item = this.navParams.get("item")
    this.sums = this.item.sum
    console.log(this.sums)
    
    this.item.sum.forEach(s => {
      this.numHour += Number(s.sum_hour)
    });
    this.numHour = this.item.event_out - this.numHour
    this.calulateHourSelect()
  }

  calulateHourSelect(){
    for (var i = 0 ; i < this.numHour ; i++) {
      this.maxHour.push((1+i))
    }
  }
  add(){
    var sum_type = this.selectType
    var sum_hour = this.selectEx
    var event_id = this.item.event_id   
    if (!sum_type || !sum_hour || !event_id || this.numHour == 0) {
      let alert = this.alertCtrl.create({
            title: 'แจ้งเตือน',
            subTitle: 'ข้อมูลไม่ถูกต้องหรือทำรายการครบแล้ว',
            buttons: ['ตกลง']
          });
          alert.present();
      return
    }
    let Params = "sum_type=" + sum_type + "&sum_hour=" + sum_hour +"&event_id=" + event_id; 
    let link = "http://angsila.cs.buu.ac.th/~56160355/Project/add_sum.php?" + Params;
    this.http.get(link)
      .map (res => res.json() )
      .subscribe(data => {
        this.navCtrl.pop()
        
    })
} 
}
