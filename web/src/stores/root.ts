import { UserStore } from './user';
import { FormStore } from './form';

export class RootStore {
  userStore: UserStore;
  formStore: FormStore;

  constructor() {
    this.userStore = new UserStore();
    this.formStore = new FormStore();
  }
}
