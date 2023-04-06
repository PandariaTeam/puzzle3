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
import { IssueType, EditSchema, Exam, initEditSchema } from '@/stores/domain';
import { Form, message } from 'antd';

type schemaKey = keyof EditSchema;
const validateForm = (values: EditSchema): boolean => {
  return Object.keys(initEditSchema).every((key) => {
    if (key === 'examinations') return values[key].length > 0;
    return values[key as schemaKey] ?? false;
  });
};

export const PuzzleDrawer = observer(() => {
  const [form] = Form.useForm<EditSchema>();
  const [examType, setType] = useState<IssueType>(IssueType.Single);
  const {
    rootStore: { formStore }
  } = useStore();
  const handleValueChange = (val: Partial<EditSchema>) => {
    if (val?.type) {
      setType(val?.type);
      form.setFieldValue('answer', undefined);
    }
    if (val?.examinations) form.setFieldValue('answer', undefined);
  };
  return (
    <DrawerForm<EditSchema>
      open={formStore.drawerVisible}
      title='编辑题目'
      form={form}
      width={400}
      initialValues={formStore.editSchema[formStore.currentIndex]}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        onClose: () => formStore.changeVisible()
      }}
      onValuesChange={handleValueChange}
      submitTimeout={2000}
      onFinish={async (values) => {
        if (!validateForm(values)) {
          message.error('请填写完整配置项');
          return;
        }
        formStore.updateEditSchema({
          ...values,
          answer:
            values.type === IssueType.Single
              ? values.answer
              : (values.answer as any).join(',')
        });
        message.success('提交成功');
        formStore.changeVisible();
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
            value: IssueType.Single
          },
          {
            label: '多选',
            value: IssueType.Multiple
          }
        ]}
      />
      <ProFormList min={3} name='examinations' label='题目可选项' required>
        <ProFormText key='useMode' name='option' />
      </ProFormList>
      <ProFormSelect
        name='answer'
        label='录入正确答案'
        mode={examType === IssueType.Multiple ? 'multiple' : 'single'}
        required
        placeholder='请录入正确答案'
        // dependencies 的内容会注入 request 中
        dependencies={['examinations']}
        request={async (params) => {
          const { examinations } = params;
          return examinations
            .filter((item: Exam) => !!item.option)
            .map((item: Exam) => {
              return { label: item.option, value: item.option };
            });
        }}
      />
    </DrawerForm>
  );
});
