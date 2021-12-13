import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  path: string;

  korisnici: User[] | undefined;

  constructor(private http: HttpClient) { 
    this.path = "http://localhost:4000/users/";
    this.korisnici = undefined;
  }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.path);
  }

  getFetchedUsers(): User[]{
    if(this.korisnici === undefined){
      return [];
    }
    return this.korisnici;
  }


}

