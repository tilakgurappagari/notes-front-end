import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DeleteService } from 'src/app/services/delete.service';
import { EditNoteService } from 'src/app/services/editNote.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent {

  public allNotes : any = [];
  currentUser: any;
  editFlag : any = false

  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  important: Boolean = false

  public enable: any = null;
  public isSeeDetails : boolean= false;
  public buttonValue: String="See Details";
 
  //..................................
  public titleDetail: any;
  public bodyDetail: any;
  public createdOn: any;
  


  currentUserSubscription: Subscription;
  constructor(public homeService: HomeService, 
    private formBuilder: FormBuilder,
    public router: Router, 
    public authenticationService: AuthenticationService,
    public deleteService: DeleteService,
    private route: ActivatedRoute,
    public editNoteService: EditNoteService
    ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
     // console.log(this.currentUser.username)
    
         });
   }

   ngOnInit(): void {




    this.homeService.getNotesData().subscribe((data:any)=>{

      //console.log(data)
        for(let index=0; index<data.length; index++){
      

          { this.allNotes.push(data[index]);}
        
         }
          // console.log(this.impNotes)
    });



    //form validations
    this.editForm = this.formBuilder.group({
      title: [this.titleDetail, Validators.required],
      body: [this.bodyDetail, Validators.required]
      //important: false
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

}

public seeDetails(indexValue, note){
  if(this.isSeeDetails==false){
    this.enable=indexValue;
    this.isSeeDetails=true;
    this.buttonValue = "Hide Details";
   this.titleDetail=note.title;
   this.bodyDetail = note.body;
   this.createdOn = note.dateCreated;
   this.important = note.important
  }
  else{
   this.enable = null;
   this.isSeeDetails=false;
   this.buttonValue="See Details";
  }
}

 public deleteNoteHandler(){
  this.deleteService.deleteNote(this.createdOn).subscribe((data:any)=>{
    //this.router.navigate(['/home']);
    window.location.reload();
   console.log(data);
  },
  (error:any)=>{
    alert(error);
  });

}

//edit note 
get f() { return this.editForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.editForm.invalid) {
   
    
    return alert("Something was left out");
  }
 
  this.loading = true;
  console.log(this.f['title'].value, this.f['body'].value,this.important)
  this.editNoteService.editNote(this.f['title'].value, this.f['body'].value,this.important,this.createdOn)
          //.pipe(first())
          .subscribe(
              data => {
                  alert("Note saves successfully")
                  window.location.reload();
                    //this.router.navigate(['/home']);
                  

              },
              error => {
                  //console.log("hello")
                  alert("there was an error in saving your note. Try again");
                  //this.alertService.error(error);
                  this.loading = false;
              });
 
 }

public fav(){
  if(this.important===false){
    this.important = true
    
    
   // this.buttonValue = "Not important";
  }
  else{
  
   this.important=false;
   //this.buttonValue="Mark As Favorite";
  }
}


public editNoteHandler(){
  this.isSeeDetails = false;
  this.editFlag = true;

   //form validations
   this.editForm = this.formBuilder.group({
    title: [this.titleDetail, Validators.required],
    body: [this.bodyDetail, Validators.required]
    //important: false
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

}
