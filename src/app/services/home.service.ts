import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    currentUser: any;


    currentUserSubscription: Subscription;
    constructor(private http: HttpClient  , public router: Router, public authenticationService: AuthenticationService) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        //console.log(this.currentUser)
      
           });
     }
  getNotesData (): any {
    let response = this.http.get('http://localhost:3000/notes/'+this.currentUser.id);
   // console.log(response)
    return response;
  }
}