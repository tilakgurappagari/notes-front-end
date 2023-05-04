import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNoteService } from 'src/app/services/addNote.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {

  noteForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  important: Boolean = false

  
  public buttonValue: String="Mark As Favorite";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postNoteService: AddNoteService,
    private alertService: AlertService
  ) {
    
    
  }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
      //important: false
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.noteForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.noteForm.invalid) {
      console.log("invalid form")
      // this.noteForm.reset()
      return alert("Something was left out");
    }
   
    this.loading = true;
    this.postNoteService.addNote(this.f['title'].value, this.f['body'].value,this.important)
            //.pipe(first())
            .subscribe(
                data => {
                    alert(data)
                   
                      this.router.navigate(['/home']);
                    

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
      
      
      this.buttonValue = "Not important";
    }
    else{
    
     this.important=false;
     this.buttonValue="Mark As Favorite";
    }
  }

}
