import { makeAutoObservable, flow } from 'mobx';
import dayjs from 'dayjs';
import { message } from 'antd';
import { createPuzzle, getMetaDataById } from '@/services/api';
import { IPuzzle3Metadata, Puzzle3Difficulty } from '@puzzle3/types';
import { EditSchema, initEditSchema } from './domain';
import { Web3Store } from './web3';
// const puzzleAddress = '0x3CA869f65e32279D5e827b156320537C3e8c894c';
export class FormStore {
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
  validate(current: string[]) {
    const { viewSchema } = this;
    const answers = viewSchema.map((item) => {
      return { answer: item.answer, type: item.type };
    });
    const wrongList: number[] = [];
    answers.forEach((item, index) => {
      if (item.type === 1 && item.answer !== current[index])
        wrongList.push(index + 1);
      if (item.type === 2 && item.answer !== (current[index] as any).join(','))
        wrongList.push(index + 1);
    });
    if (wrongList.length) message.error(`第${wrongList.join(',')}道题有误`);
    return wrongList.length;
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
        author: window?.ethereum?.selectedAddress ?? '',
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
  submitInstance = flow(function* (this: FormStore, payload: any) {
    const { current, instanceId } = payload;
    if (this.validate(current)) return;
    const tx = yield this.web3Store.submitInstance(instanceId);
    const res = yield tx.wait();
    const tokenId = res?.events?.[0]?.topics?.[3];
    return tokenId;
  });
  getInfo = flow(function* (this: FormStore, id: string) {
    try {
      const res = yield getMetaDataById(id);
      this.viewSchema = JSON.parse(res?.metadata?.formSchema);
      this.formData = {
        ...res?.metadata
      };
    } catch (error) {
      console.log('err', error);
    }
  });
}
