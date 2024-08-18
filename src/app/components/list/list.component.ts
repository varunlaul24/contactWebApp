import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  groupedContacts: { [key: string]: any[] } = {};
  alphabets: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  searchTerm: string = '';
  contacts: any[] = [];
  filteredContacts: any[] = [];
  selectedContact: any = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((data: any[]) => {
      this.contacts = data;
      this.filteredContacts = this.contacts;
      const sortedContacts = this.sortContacts(this.contacts);
      this.groupedContacts = this.groupContactsByAlphabet(sortedContacts);
    });
  }

  sortContacts(contacts: any[]): any[] {
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

  groupContactsByAlphabet(contacts: any[]): { [key: string]: any[] } {
    const groupedContacts: { [key: string]: any[] } = {};

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

  selectContact(contact: any) {
    this.selectedContact = contact;
  }

  clearSelectedContact() {
    this.selectedContact = null;
  }

  outsideClick(event: MouseEvent){
    this.selectedContact = null;
  }
}