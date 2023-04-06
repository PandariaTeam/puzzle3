export enum IssueType {
  Single = 0,
  Multiple = 1
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
  examinations: [{ option: '111' }],
  answer: '111'
};
