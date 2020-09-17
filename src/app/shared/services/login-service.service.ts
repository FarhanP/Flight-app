import { Injectable } from '@angular/core';
import data from '../../../app/data.json';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor() { }

  loggedIn(): boolean {
    if (data.admin.some((val) => val.email === localStorage.getItem('email') && val.isAdmin === true)) {
      return true;
    } else {
      return false;
    }
  }


  loggedInStaff(): boolean {
    if (data.admin.some((val) => val.email !== localStorage.getItem('email') && val.isAdmin === false)) {
      return true;
    } else {
      return false;
    }
  }
}
