import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent {

  public allNotes : any = [];
  currentUser: any;

  public enable: any = null;
  public isSeeDetails : boolean= false;
  public buttonValue: String="See Details";
  //..................................
  public titleDetail: any;
  public bodyDetail: any;
  public createdOn: any;
  


  currentUserSubscription: Subscription;
  constructor(public homeService: HomeService, public router: Router, public authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
     // console.log(this.currentUser.username)
    
         });
   }

   ngOnInit(): void {


    this.homeService.getNotesData().subscribe((data:any)=>{

      //console.log(data)
        for(let index=0; index<data.length; index++){
      

          this.allNotes.push(data[index]);
        
         }
          // console.log(this.impNotes)
    });

}

public seeDetails(indexValue, note){
  if(this.isSeeDetails==false){
    this.enable=indexValue;
    this.isSeeDetails=true;
    this.buttonValue = "Hide Details";
   this.titleDetail=note.title;
   this.bodyDetail = note.body;
   this.createdOn = note.dateCreated;
  }
  else{
   this.enable = null;
   this.isSeeDetails=false;
   this.buttonValue="See Details";
  }
}

}
