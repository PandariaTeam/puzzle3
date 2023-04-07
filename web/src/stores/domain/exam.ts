export enum IssueType {
  Single = 1,
  Multiple = 2
}
export interface Exam {
  option: string;
}
export interface EditSchema {
  name: string;
  type: IssueType;
  examinations: Exam[];
  answer: string;
}

export const initEditSchema: EditSchema = {
  name: '测试题目',
  type: IssueType.Single,
  examinations: [{ option: '111' }, { option: '222' }, { option: '333' }],
  answer: '111'
};

export const initViewSchema = [{ option: '' }];
