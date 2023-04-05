import { makeAutoObservable } from 'mobx';

export class UserStore {
  name: string;
  firstName: string;
  lastName: string;

  constructor() {
    this.name = '张三';
    this.firstName = '张';
    this.lastName = '三';
    makeAutoObservable(this);
  }
  get copName() {
    return this.firstName + this.lastName;
  }
  changeName() {
    this.name = `李四${Math.random()}`;
  }
}
