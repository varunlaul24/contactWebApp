import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/people.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  groupedContacts: { [key: string]: People[] } = {};
  alphabets: string[] = [];
  searchTerm: string = '';
  contacts: People[] = [];
  filteredContacts: People[] = [];
  selectedContact: People | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.alphabets = this.alphabetsAZ();
    this.contactService.getAllContacts().subscribe((data: People[]) => {
      this.contacts = data;
      this.filteredContacts = data;
      const sortedContacts = this.sortContacts(this.contacts);
      this.groupedContacts = this.groupContactsByAlphabet(sortedContacts);
    });
  }

  alphabetsAZ(): string[] {
    for (let i = 65; i <= 90; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
    return this.alphabets
  }

  sortContacts(contacts: People[]): People[] {
    return contacts.sort((x, y) => {
      const nameA = x.name.toLowerCase();
      const nameB = y.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  groupContactsByAlphabet(contacts: People[]): { [key: string]: People[] } {
    const groupedContacts: { [key: string]: People[] } = {};
    contacts.forEach((contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      } // if key corresponding to the first letter doesn't exist, initialise an empty array for that letter.
      groupedContacts[firstLetter].push(contact); // if key exists, push the contact into the array corresponding to the first letter key.
    });
    console.log(groupedContacts); // {A: Array(5), D: Array(1), H: Array(1), K: Array(1), M: Array(1), …}
    return groupedContacts;
  }

  filterContacts() {
    if (this.searchTerm) {
      this.filteredContacts = this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredContacts = this.contacts;
    }
  }

  selectContact(contact: People) {
    this.selectedContact = contact;
  }

  clearSelectedContact() {
    this.selectedContact = null;
  }

  outsideClick(event: MouseEvent){
    this.selectedContact = null;
  }
}