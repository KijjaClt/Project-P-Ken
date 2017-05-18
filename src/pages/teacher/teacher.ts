import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
/*
  Generated class for the Teacher page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
 
})
export class TeacherPage {
      personal : Object;
      txt_search : any;

  constructor(public navCtrl: NavController, public navParams: NavParams  , private http: Http) {
    this.callTeacherHttp().subscribe((data) =>{
    this.personal = data;
    console.log(this.personal);
 
  });}
callTeacherHttp(){
  return this.http.get('http://angsila.cs.buu.ac.th/~56160355/Project/Get_Teacher.php').map((res)=> res.json());
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherPage');
    
     
    };


    }