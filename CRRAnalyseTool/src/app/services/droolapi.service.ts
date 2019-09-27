import { Injectable  } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../app/classes/Login';
import { JWT } from '../../app/classes/JWT';
import { CRR } from '../../app/classes/CRR';
import { Rating } from '../../app/classes/Rating';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class droolApiService
{

constructor(private httpClient : HttpClient){}

post(loginRequest:Login):Observable<any>
 {
  return this.httpClient.post("http://localhost:8085/login",loginRequest);
 }


validate(jwtRequest:JWT):Observable<any>
 {
  return this.httpClient.post("http://localhost:8085/validate",jwtRequest);
 }


calculateCRR(crr:CRR,jwtToken):Observable<any>
 {
const  headers = new  HttpHeaders().set("Authorization", jwtToken);

 return this.httpClient.post("http://localhost:8085/secure/checkCRR",crr,{
      headers
    });



 }

}
