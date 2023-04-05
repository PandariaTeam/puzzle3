import { makeAutoObservable, flow } from 'mobx';
import dayjs from 'dayjs';
import { getMetaDataById, createPuzzle } from '@/services/api';
import { IPuzzle3Metadata, Puzzle3Difficulty } from '@puzzle3/types';

export class UserStore {
  name: string;
  firstName: string;
  lastName: string;
  formData: IPuzzle3Metadata;

  constructor() {
    this.name = '张三';
    this.firstName = '张';
    this.lastName = '三';
    this.formData = {
      name: 'amen',
      author: 'yunbei',
      difficulty: Puzzle3Difficulty.Easy,
      created: dayjs().valueOf(),
      description: 'test',
      completedDescription: 'sss',
      contract: 'sasa',
      deployParams: [],
      formSchema: {}
    };
    makeAutoObservable(this);
  }
  get copName() {
    return this.firstName + this.lastName;
  }
  changeName() {
    this.name = `李四${Math.random()}`;
  }
  create = flow(function* (this: UserStore) {
    try {
      // yield instead of await.
      const res = yield createPuzzle({ metadata: this.formData });
      console.log('res', res);
    } catch (error) {
      console.log('err', error);
    }
  });
  getInfo = flow(function* (this: UserStore) {
    try {
      // yield instead of await.
      const res = yield getMetaDataById('ce580971-dfdc-4423-b108-7159a50dc194');
      console.log('res', res);
    } catch (error) {
      console.log('err', error);
    }
  });
}
