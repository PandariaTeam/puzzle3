import { UserStore } from './user';
import { FormStore } from './form';
import { FormHelperStore } from './form-helper';

export class RootStore {
  userStore: UserStore;
  formStore: FormStore;
  helperStore: FormHelperStore;

  constructor() {
    this.userStore = new UserStore();
    this.formStore = new FormStore();
    this.helperStore = new FormHelperStore();
  }
}
