import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import { Contact } from '../../models';
import { ContactsService } from '../../services';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.html',
  styleUrls: ['./contacts-list.scss'],
  providers: [ContactsService]
})
export class ContactsListComponent implements OnInit {
  @ViewChild('modalContactDetail') modalContactDetail: ContactDetailComponent;

  contacts: Contact[];
  favorites: Contact[];
  gotData: boolean = false;

  constructor(
    private _service: ContactsService
  ) { }

  ngOnInit() {
    if (!this.gotData) this.getContacts();
  }

  getContacts(): void {
    this._service.getContacts().subscribe(
      data => {
        this.contacts = data.filter(contact => {
          return !contact.isFavorite;
        });
        this.favorites = data.filter(contact => {
          return contact.isFavorite;
        });
        this.gotData = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateFavorite(event): void {
    let changedContact = event.data;
    changedContact.isFavorite = !changedContact.isFavorite;

    if (changedContact.isFavorite) {
      this.contacts = this.contacts.filter(contact => {
        return contact.id != changedContact.id; 
      })

      this.favorites.push(changedContact);
    } else {
      this.favorites = this.favorites.filter(favorite => {
        return favorite.id != changedContact.id;
      })

      this.contacts.push(changedContact);
    }

  }

  showContactDetail(contact: Contact) {
    this.modalContactDetail.showModal(contact);
  }
}