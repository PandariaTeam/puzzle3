import { useState } from 'react';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormList,
  ProFormSelect
} from '@ant-design/pro-components';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context';
import { Form, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

enum PuzzleType {
  Single = 0,
  Multiple = 1
}
interface Exam {
  exam: string;
}
interface FormData {
  name: string;
  type: PuzzleType;
  examinations: Exam[];
  answer: string | string[];
}
const initForm: FormData = {
  name: '测试题目',
  type: PuzzleType.Single,
  examinations: [{ exam: '111' }],
  answer: '111'
};
export const PuzzleDrawer = observer(() => {
  const [form] = Form.useForm<FormData>();
  const [examType, setType] = useState<PuzzleType>(PuzzleType.Single);
  const {
    rootStore: { formStore }
  } = useStore();
  const handleValueChange = (val: Partial<FormData>) => {
    if (val?.type) {
      setType(val?.type);
      form.setFieldValue('answer', undefined);
    }
    if (val?.examinations) form.setFieldValue('answer', undefined);
  };
  return (
    <DrawerForm<FormData>
      open={formStore.drawerVisible}
      title='编辑题目'
      form={form}
      width={400}
      initialValues={initForm}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        onClose: () => formStore.changeVisible()
      }}
      onValuesChange={handleValueChange}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(200);
        console.log(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProFormTextArea
        rules={[
          {
            required: true
          }
        ]}
        name='name'
        label='题目名称'
        placeholder='请输入题目名称'
      />
      <ProFormRadio.Group
        name='type'
        label='题目类型'
        rules={[
          {
            required: true
          }
        ]}
        options={[
          {
            label: '单选',
            value: PuzzleType.Single
          },
          {
            label: '多选',
            value: PuzzleType.Multiple
          }
        ]}
      />
      <ProFormList min={1} name='examinations' label='题目可选项' required>
        <ProFormText key='useMode' name='exam' />
      </ProFormList>
      <ProFormSelect
        name='answer'
        label='录入正确答案'
        mode={examType === PuzzleType.Multiple ? 'multiple' : 'single'}
        required
        placeholder='请录入正确答案'
        // dependencies 的内容会注入 request 中
        dependencies={['examinations']}
        request={async (params) => {
          const { examinations } = params;
          return examinations
            .filter((item: Exam) => !!item.exam)
            .map((item: Exam) => {
              return { label: item.exam, value: item.exam };
            });
        }}
      />
    </DrawerForm>
  );
});
