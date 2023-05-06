import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditNoteService {

    public note = {
        title: '',
        body:'',
        important: false
      }


    currentUserSubscription: Subscription;
    constructor(private http: HttpClient  , public router: Router) {
   
     }
  editNote(title:any, body:any,important:any, dateCreated: any): any {
    this.note.title = title;
    this.note.body = body;
    this.note.important = important;
    console.log(dateCreated)
     let response = this.http.patch('http://localhost:3000/notes/note/'+dateCreated,this.note);
 
    return response;
  }
}