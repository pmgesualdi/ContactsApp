import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import { Contact } from '../../../models';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.html',
  styleUrls: ['./contact-detail.scss']
})

export class ContactDetailComponent implements OnInit {
  @ViewChild('modalContactDetail') modalContactDetail: ModalDirective;
  @Output() updateFavorite = new EventEmitter();

  contact: Contact;
  favorite: any = {
    state: false,
    oldValue: false,
    dirty: false,
    set: function(value: boolean) {
      this.state = value;
      this.oldValue = value;
    },
    setNewValue: function(value: boolean) {
      this.state = value;
      this.dirty = true;
    },
    hasChanged: function() {
      return this.state != this.oldValue;
    }
  };
  address: string;

  constructor() { }

  ngOnInit() {
  }

  showModal(contact: Contact): void {
    this.contact = contact;
    this.address = this.buildAddress();
    this.favorite.set(contact.isFavorite);

    this.modalContactDetail.show();
  }

  @HostListener('keydown.esc', ['$event'])
  eventEscModal(event: any) {
    if (event.keyCode === 27) { this.hideModal(); }
  }

  hideModal(): void {
    if (this.favorite.dirty && this.favorite.hasChanged()) {
      this.updateFavorite.emit({ data: this.contact });
    }
    this.modalContactDetail.hide();
  }

  buildAddress(): string {
    let contactAddress = this.contact.address;
    let address: string = "";

    address += contactAddress.street + " ";
    address += contactAddress.state + ", ";
    address += contactAddress.city + " ";
    address += contactAddress.zipCode + ", ";
    address += contactAddress.country;

    return address;
  }

  changeFavorite(): void {
    this.favorite.setNewValue(!this.favorite.state);
  }

}
