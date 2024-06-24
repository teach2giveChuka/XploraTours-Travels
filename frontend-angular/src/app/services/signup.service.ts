import { Injectable } from '@angular/core';
import { Signup } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signupUser(signup: Signup){
    return this.http.post('http://localhost:4115/user/register', signup);
  }
  
}
