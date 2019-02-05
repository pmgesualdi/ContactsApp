import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {

  constructor(
    private _http: HttpClient
  ) { }

  getContacts(): Observable<any> {
    return this._http.get('https://s3.amazonaws.com/technical-challenge/v3/contacts.json');
  }
}