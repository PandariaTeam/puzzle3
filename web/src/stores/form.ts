import { makeAutoObservable } from 'mobx';
import { EditSchema } from './domain';

export class FormStore {
  preview = false;
  drawerVisible = false;
  editSchema: EditSchema[] = [];
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
  updateEditSchema(schema: EditSchema) {
    const { editSchema, currentIndex } = this;
    this.editSchema = [
      ...editSchema.slice(0, currentIndex),
      schema,
      ...editSchema.slice(currentIndex + 1)
    ];
  }
}
