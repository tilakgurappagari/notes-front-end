import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

    //currentUser: any;


    currentUserSubscription: Subscription;
    constructor(private http: HttpClient  , public router: Router, public authenticationService: AuthenticationService) {
    //   this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    //     this.currentUser = user;
    //     //console.log(this.currentUser)
      
    //        });
     }
  deleteNote(dateCreated: any): any {
    console.log(dateCreated)
     let response = this.http.delete('http://localhost:3000/notes/note/'+dateCreated);
 
    return response;
  }
}