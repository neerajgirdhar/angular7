import { Component, OnInit } from '@angular/core';
import { droolApiService } from '../services/droolapi.service';
import { Login } from '../../app/classes/Login';
import { JWT } from '../../app/classes/JWT';
import { CRR } from '../../app/classes/CRR';
import { Rating } from '../../app/classes/Rating';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {

  loginResponse: Login;
  loginResponse1: Login;
  rating:Rating;
  crr : CRR;
  jwtRequest :JWT;
  loggedIn: boolean = true;
  notLoggedIn: boolean = true;
  crrIssued: boolean = false;

  constructor(private _droolApiService : droolApiService,private cookieService: CookieService){}

  ngOnInit()
   {
    const value: string = this.cookieService.get('CRRCookie');

    if(value==='')
    {
      this.loggedIn=false;
      this.notLoggedIn=true;
     alert('You are Not Logged in.Please Fill the information below and login.');
    }
    else
    {
      this.loggedIn=true;
      this.notLoggedIn=false;

      var jwtRequest = new JWT();
    jwtRequest.jwttoken = value;
    alert('You are alreay Logged in with the below JWT Token --> '+jwtRequest.jwttoken );
    this._droolApiService.validate(jwtRequest).subscribe
    (
      data=>{
      this.loginResponse1 = data;
      });
    }
}
  calculateCRR(form)
  {

    var token = 'Token '+this.loginResponse1.jwttoken;
    var crr = new CRR();
    crr.empID=form.value.empId;
    crr.empName=form.value.empName;
    crr.unit=form.value.unit;
    crr.jobLevel=form.value.joblevel;
    crr.escalation =form.value.escalation;
if(crr.jobLevel === 4)
{
    crr.countClientAppreciation=form.value.countClientAppreciationL4;
    crr.descriptionClientAppreciation=form.value.descriptionClientAppreciationL4;
    crr.countTrainingCertification=form.value.countTrainingCertificationL4;
    crr.descriptionTrainingCertification=form.value.descriptionTrainingCertificationL4;

}
if(crr.jobLevel === 5)
{
    crr.countClientAppreciation=form.value.countClientAppreciationL5;
    crr.descriptionClientAppreciation=form.value.descriptionClientAppreciationL5;
    crr.countTrainingCertification=form.value.countTrainingCertificationL5;
    crr.descriptionTrainingCertification=form.value.descriptionTrainingCertificationL5;
    crr.countPOC=form.value.countPocL5;
    crr.descriptionPOC=form.value.descriptionPocL5;
    crr.countInterviewDrives=form.value.countInterviewDrivesL5;
    crr.descriptionInterviewDrives=form.value.descriptionInterviewDrivesL5;

}

if(crr.jobLevel === 6)
{
    crr.countClientAppreciation=form.value.countClientAppreciationL6;
    crr.descriptionClientAppreciation=form.value.descriptionClientAppreciationL6;
    crr.countTrainingCertification=form.value.countTrainingCertificationL6;
    crr.descriptionTrainingCertification=form.value.descriptionTrainingCertificationL6;
    crr.countPOC=form.value.countPocL6;
    crr.descriptionPOC=form.value.descriptionPocL6;
    crr.countInterviewDrives=form.value.countInterviewDrivesL6;
    crr.descriptionInterviewDrives=form.value.descriptionInterviewDrivesL6;

    crr.countRFP=form.value.countRFPL6;
    crr.descriptionRFP=form.value.descriptionRFPL6;
    crr.countSessionTaken=form.value.countSessionTakenL6;
    crr.descriptionSessionTaken=form.value.descriptionSessionTakenL6;
    crr.countBlogs=form.value.countBlogsL6;
    crr.descriptionBlogs=form.value.descriptionBlogsL6;
}

if(crr.jobLevel === 7)
{
    crr.countClientAppreciation=form.value.countClientAppreciationL7;
    crr.descriptionClientAppreciation=form.value.descriptionClientAppreciationL7;
    crr.countTrainingCertification=form.value.countTrainingCertificationL7;
    crr.descriptionTrainingCertification=form.value.descriptionTrainingCertificationL7;
    crr.countPOC=form.value.countPocL7;
    crr.descriptionPOC=form.value.descriptionPocL7;
    crr.countInterviewDrives=form.value.countInterviewDrivesL7;
    crr.descriptionInterviewDrives=form.value.descriptionInterviewDrivesL7;

    crr.countRFP=form.value.countRFPL7;
    crr.descriptionRFP=form.value.descriptionRFPL7;
    crr.countSessionTaken=form.value.countSessionTakenL7;
    crr.descriptionSessionTaken=form.value.descriptionSessionTakenL7;
    crr.countBlogs=form.value.countBlogsL7;
    crr.descriptionBlogs=form.value.descriptionBlogsL7;
    crr.countDealsWon=form.value.countDealsWonL7;
    crr.descriptionDealsWon=form.value.descriptionDealsWonL7;

   if(form.value.dealsWonWorthInMillionL7 === 1){
    crr.dealsWonWorthInMillion=5;
  }
 if(form.value.dealsWonWorthInMillionL7 === 2){
    crr.dealsWonWorthInMillion=12;
  }
 if(form.value.dealsWonWorthInMillionL7 === 3){
    crr.dealsWonWorthInMillion=20;
  }
}
   this._droolApiService.calculateCRR(crr,token).subscribe
    (
      data=> {
      this.rating = data;
      this.loggedIn=false;
      this.notLoggedIn=false;
      this.crrIssued=true;

      });
    }



  login(form)
  {
    var loginRequest = new Login();
    loginRequest.userName=form.value.userName;
    loginRequest.userId=form.value.userId;
    loginRequest.role=form.value.role;
    this._droolApiService.post(loginRequest).subscribe
    (
      data=>{
      this.loginResponse1 = data;
      });
    if(this.loginResponse1.loggedIn==='true')
    {
      this.cookieService.set('CRRCookie', this.loginResponse1.jwttoken);
      this.loggedIn=true;
      this.notLoggedIn=false;
    }
  }
}
