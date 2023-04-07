import { makeAutoObservable, flow } from 'mobx';
import dayjs from 'dayjs';
import { message } from 'antd';
import { createPuzzle, getMetaDataById } from '@/services/api';
import { IPuzzle3Metadata, Puzzle3Difficulty } from '@puzzle3/types';
import { EditSchema, initEditSchema } from './domain';
import { Web3Store } from './web3';
// const puzzleAddress = '0x3CA869f65e32279D5e827b156320537C3e8c894c';
export class FormStore {
  preview = true;
  drawerVisible = false;
  editSchema: EditSchema[] = [initEditSchema];
  viewSchema: EditSchema[] = [];
  currentIndex = 0;
  puzzleAddress = '';
  web3Store: Web3Store;
  formData: IPuzzle3Metadata = {
    name: '',
    author: '',
    description: '',
    difficulty: Puzzle3Difficulty.Easy,
    created: dayjs().valueOf(),
    completedDescription: '',
    contract: '',
    deployParams: [],
    formSchema: {}
  };

  constructor(root: { web3Store: Web3Store }) {
    makeAutoObservable(this);
    this.web3Store = root.web3Store;
  }
  changeVisible() {
    const { drawerVisible } = this;
    this.drawerVisible = !drawerVisible;
  }
  updateIndex(index: number) {
    this.currentIndex = index;
  }
  updateFormData(payload: Partial<IPuzzle3Metadata>) {
    this.formData = { ...this.formData, ...payload };
  }
  updateAddress(address: string) {
    this.puzzleAddress = address;
  }
  addItem() {
    this.editSchema = this.editSchema.concat(initEditSchema);
  }
  copyItem(index: number) {
    if (index < 1) return;
    const { editSchema } = this;
    const current = editSchema[index - 1];
    this.editSchema = this.editSchema.concat(current);
  }
  removeItem(index: number) {
    this.editSchema = this.editSchema.splice(index, 1);
  }
  updateEditSchema(schema: EditSchema) {
    const { editSchema, currentIndex } = this;
    this.editSchema = [
      ...editSchema.slice(0, currentIndex),
      schema,
      ...editSchema.slice(currentIndex + 1)
    ];
  }
  create = flow(function* (this: FormStore) {
    try {
      const metadata = {
        ...this.formData,
        autor: window?.ethereum?.selectedAddress ?? '',
        formSchema: JSON.stringify(this.editSchema)
      };
      if (!this.puzzleAddress) return;
      const res = yield Promise.all([
        createPuzzle({
          metadata,
          puzzleAddress: this.puzzleAddress
        }),
        this.web3Store.register(this.puzzleAddress)
      ]);
      return res;
    } catch (error) {
      message.warning('该合约不符合Puzzle3的要求');
      return false;
    }
  });
  getInfo = flow(function* (this: FormStore, id: string) {
    try {
      const res = yield getMetaDataById(id);
      this.viewSchema = JSON.parse(res?.metadata?.formSchema);
    } catch (error) {
      console.log('err', error);
    }
  });
}
