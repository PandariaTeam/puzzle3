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
  name: 'Solidity是什么',
  type: IssueType.Single,
  examinations: [
    { option: '编写以太坊虚拟机（EVM）的语言' },
    { option: '编写智能合约的语言' },
    { option: '编写比特币的语言' }
  ],
  answer: '编写智能合约的语言'
};

export const initViewSchema = [{ option: '' }];
