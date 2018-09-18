import { Injectable } from '@angular/core';
import { RegisterUser } from '../components/models/RegisterUser';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from 'src/app/components/models/Token';
import { Router } from "@angular/router";
import { Observable, Subject } from 'rxjs';

// const Api_Url = "http://kcpelevennoteapie.azurewebsites.net";
// const Api_Url = "https://kcpelevennote.azurewebsites.net"
const Api_Url = "https://cashflowfinance.azurewebsites.net"


@Injectable()
export class AuthService {
  userInfo: Token;
  isLoggedIn = new Subject<boolean>();

  constructor( private _http: HttpClient, private _router: Router) { }

  register(regUserData: RegisterUser){
    console.log("string")
   return this._http.post( `${Api_Url}/api/Account/Register`,regUserData);
  }

  login(loginInfo) {
    const str = 
       `grant_type=password&username=${encodeURI(loginInfo.email)}&password=${encodeURI(loginInfo.password)}`;

       return this._http.post(`${Api_Url}/Token`,str).subscribe( (token: Token) => {
         this.userInfo = token;
         localStorage.setItem("id_token",token.access_token);
         localStorage.setHeader("Access-Control-Allow-Origin", "*");
         this.isLoggedIn.next(true);
         this._router.navigate(['/'])
       });
  }

  currentUser(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false));}

    const authHeader = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('id_token')}`);

    return this._http.get(`${Api_Url}/api/Account/UserInfo`,{ headers: authHeader });
  }

}