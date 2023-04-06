import { makeAutoObservable } from 'mobx';

export class FormStore {
  preview = false;
  drawerVisible = false;

  constructor() {
    makeAutoObservable(this);
  }
  changeVisible() {
    const { drawerVisible } = this;
    this.drawerVisible = !drawerVisible;
  }
}
