import { UserStore } from './user';
import { FormStore } from './form';
import { FormHelperStore } from './form-helper';
import { Web3Store } from './web3';

export class RootStore {
  userStore: UserStore;
  formStore: FormStore;
  helperStore: FormHelperStore;
  web3Store: Web3Store;

  constructor() {
    this.userStore = new UserStore();
    this.helperStore = new FormHelperStore();
    this.web3Store = new Web3Store();
    this.formStore = new FormStore({ web3Store: this.web3Store });
  }
}
