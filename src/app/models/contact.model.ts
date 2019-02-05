export class Contact {
  id:             number;
  name:           string;
  companyName:    string;
  isFavorite:     boolean;
  smallImageURL:  string;
  largeImageURL:  string;
  emailAddress:   string;
  birthdate:      string;
  phone: {
    work:   string;
    home:   string;
    mobile: string;
  }
  address: {
    street:   string;
    city:     string;
    state:    string;
    country:  string;
    zipCode:  string;
  }
}