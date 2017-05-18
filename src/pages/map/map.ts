import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Storage } from '@ionic/storage';
import { Platform ,AlertController,NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {    @ViewChild('doughnutCanvas') doughnutCanvas;
 
    barChart: any;
    doughnutChart: any;
  constructor(
      public confData: ConferenceData,
      public platform: Platform,
      public http : Http,
      public alertCtrl:AlertController,
      public str : Storage,
      public navCtrl : NavController) {

  }

  ionViewDidEnter() {
       this.str.get('token').then((val) => {
           if(val == null){
         this.navCtrl.setRoot(LoginPage)
       }
    })
     this.str.get('token').then((val) => {
      let admin_id = val;
      let param = "admin_id=" + admin_id ; 
      let link = "http://angsila.cs.buu.ac.th/~56160355/Project/get_out_time.php?" + param;

      this.http.get(link)
      .map (res => res.json() )
      .subscribe(data => {
        if (data == null) {
          return
        }
        console.log(data)
        var lables = ["อ่านหนังสือ", "ทำแบบฝึกหัด", "ติวเตอร์"]
        var countSum = {}
        lables.forEach(eachLable => {
            countSum[eachLable] = 0
        });
        
        data.forEach(eachEvent => {
            eachEvent.sum.forEach(eachSum => {
                countSum[eachSum.sum_type] = Number((countSum[eachSum.sum_type] || 0) + Number(eachSum.sum_hour));
            });
        });
        console.log(countSum)
        var dataNum = []
        lables.forEach(eachLable => {
            dataNum.push(countSum[eachLable])
        });
        this.setChart(lables,dataNum)
      }
    )})
  }   

  ionViewDidLoad() {}
   
            
  setChart(labels, hours){
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: hours,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        // 'rgba(75, 192, 192, 0.8)',
                        // 'rgba(153, 102, 255, 0.8)',
                        // 'rgba(255, 159, 64, 0.8)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        // "#FF6384",
                        // "#36A2EB",
                        // "#FFCE56"
                    ]
                }]
            }
 
        });
  }

}
