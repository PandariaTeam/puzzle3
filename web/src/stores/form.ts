import { makeAutoObservable } from 'mobx';
import { EditSchema, initEditSchema } from './domain';

export class FormStore {
  preview = false;
  drawerVisible = false;
  editSchema: EditSchema[] = [initEditSchema];
  viewSchema = [];
  currentIndex = 0;

  constructor() {
    makeAutoObservable(this);
  }
  changeVisible() {
    const { drawerVisible } = this;
    this.drawerVisible = !drawerVisible;
  }
  updateIndex(index: number) {
    this.currentIndex = index;
  }
  addItem() {
    this.editSchema = this.editSchema.concat(initEditSchema);
    // this.editSchema.push(initEditSchema);
    // console.log('this', this.editSchema);
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
}
