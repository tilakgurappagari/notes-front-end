import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { AllNotesComponent } from './components/all-notes/all-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {path: 'home', component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'allnotes', component: AllNotesComponent,canActivate: [AuthGuard]},
  {path: 'newnote', component: NewNoteComponent,canActivate: [AuthGuard]},
  //{ path: 'profile', component: HomeComponent ,canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
