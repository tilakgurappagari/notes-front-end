import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public responseData;
  constructor(   
      public http: HttpClient 
    ) { }
  public setData(userFormData : any){
    console.log(userFormData)
    return   this.http.post('http://localhost:3000/register', userFormData);
  }

}