import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { People, RandomUser, RandomUserApiResponse } from '../models/people.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // private contactsUrl = 'assets/contacts.json';
  private apiUrl = 'https://randomuser.me/api/?results=25&seed=consistent-seed';

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<People[]> {
    return this.http
      .get<RandomUserApiResponse>(this.apiUrl)
      .pipe(map((response) => response.results.map(this.mapToPeople)));
  }

  mapToPeople(people: RandomUser): People{
    return {
      name: `${people.name.first} ${people.name.last}`,
      email: people.email,
      phone: people.phone,
      avatar: people.picture.thumbnail
    }
  }
}
