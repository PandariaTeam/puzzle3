import { makeAutoObservable } from 'mobx';
import { initialValue } from './domain';

type Value = Record<string, any>;
export class FormHelperStore {
  stateValue = {};
  json = JSON.stringify(initialValue);

  constructor() {
    makeAutoObservable(this);
  }
  setJson = (val: Value) => {
    this.json = JSON.stringify(val);
  };
  setValue = (val: Value) => {
    this.stateValue = { ...val };
  };
}
