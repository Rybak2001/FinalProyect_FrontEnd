import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http:HttpClient

  constructor(public https: HttpClient) {
    this.http=https
  }

  httpGet(object:any)
  {
    this.http.get<object>('/api/config', {observe: 'response'}).subscribe(res => {
      console.log('Response status:', res.status);
      console.log('Body:', res.body);
    });
  }
}
