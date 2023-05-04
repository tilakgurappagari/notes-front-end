// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home-nav',
//   templateUrl: './home-nav.component.html',
//   styleUrls: ['./home-nav.component.css']
// })
// export class HomeNavComponent {

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit {
  userName: any;
  currentUser: any;
  currentUserSubscription: Subscription;
  constructor( public router: Router, public authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.userName=this.currentUser.username
      //console.log(this.currentUser.user.firstName);
    
         });
  }

  ngOnInit(): void {

  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}