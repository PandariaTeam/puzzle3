import { makeAutoObservable, flow } from 'mobx';
import dayjs from 'dayjs';
import { getMetaDataById, createPuzzle, fetchPuzzleList } from '@/services/api';
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
  getInfo = flow(function* (this: UserStore, id: string) {
    try {
      const res = yield getMetaDataById(id);
      console.log('res', res);
    } catch (error) {
      console.log('err', error);
    }
  });
  getPuzzleList = flow(function* (this: UserStore) {
    try {
      const res = yield fetchPuzzleList({
        puzzleAddressList: ['0x4D485A160594B056A9B0a7F54F84dCb5aD089fE2']
      });
      console.log('res', res);
    } catch (error) {
      console.log('err', error);
    }
  });
}
