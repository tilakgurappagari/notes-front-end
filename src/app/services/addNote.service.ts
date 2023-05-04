import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AddNoteService {
  public responseData;
  public note = {
    title: '',
    body:'',
    important: false
  }
 public currentUser: any;


  currentUserSubscription: Subscription;
  constructor(private http: HttpClient  , public router: Router, public authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      //console.log(this.currentUser)
    
         });
   }
  public addNote(title : any, body: any, important: any){

    this.note.title = title;
    this.note.body = body;
    this.note.important = important;
    //console.log(userFormData)
    return   this.http.post('http://localhost:3000/notes/'+this.currentUser.id, this.note);
  }

}