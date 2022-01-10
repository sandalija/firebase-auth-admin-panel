import { makeObservable, observable, computed, action, flow } from "mobx";

export class Google {
  google: any;

  constructor(value: any) {
    makeObservable(this, {
      google: observable,
      setUser: action,
    });
    this.google = value;
  }

  setUser(user: any) {
    this.google = user;
    console.log("Set user as ", user);
  }

  getUser() {
    return this.google;
  }
}
