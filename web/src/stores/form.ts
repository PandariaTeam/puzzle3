import { makeAutoObservable } from 'mobx';
import { EditSchema } from './domain';

export class FormStore {
  preview = false;
  drawerVisible = false;
  editSchema: EditSchema[] = [];
  viewSchema = [];

  constructor() {
    makeAutoObservable(this);
  }
  changeVisible() {
    const { drawerVisible } = this;
    this.drawerVisible = !drawerVisible;
  }
}
