import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }

  private baseUrl = "http://localhost:3000";
  private succesHandler(value) { return value; }
  private errorHandler(error) { return error; }


  public makeRequest(requestObject): any {
    let type = requestObject.type.toLowerCase();
    if(!type) { return console.log("No type sepcified in the request object.")}

    let body = requestObject.body || {};
    let location = requestObject.location;
    if(!location) { return console.log("No location specified in the request object. "); }

    let url = `${this.baseUrl}/${location}`;

    let httpOptions = {};

    if(requestObject.authorize) {
      httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer${this.storage.getToken()}`
        })
      }
    }

    if(type === "get") {
      return this.http.get(url, httpOptions).toPromise()
      .then(this.succesHandler)
      .catch(this.errorHandler);
    }
    if(type === "post") {
      return this.http.post(url, body, httpOptions).toPromise()
      .then(this.succesHandler)
      .catch(this.errorHandler);
    }

    console.log("Could not make the request. Make sure a type of GET or POST is supplied. ");

  }
}
