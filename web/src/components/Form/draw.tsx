import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormList,
  ProFormSelect
} from '@ant-design/pro-components';
import { Form, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const PuzzleDrawer = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      open
      title='编辑题目'
      form={form}
      width={400}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true
      }}
      onValuesChange={() => console.log('ff', form.getFieldsValue())}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
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
        width='md'
        name='company'
        label='题目名称'
        placeholder='请输入题目名称'
      />
      <ProFormRadio.Group
        name='radio'
        label='题目类型'
        rules={[
          {
            required: true
          }
        ]}
        options={[
          {
            label: '单选',
            value: 1
          },
          {
            label: '多选',
            value: 0
          }
        ]}
      />
      <ProFormList
        min={1}
        max={4}
        name='users'
        label='题目可选项'
        required
        initialValue={[
          {
            name: '1111'
          }
        ]}
      >
        <ProFormText key='useMode' name='name' />
      </ProFormList>
      <ProFormSelect
        name='answer'
        label='录入正确答案'
        required
        placeholder='请录入正确答案'
        // dependencies 的内容会注入 request 中
        dependencies={['users']}
        request={async (params) => {
          const { users } = params;
          return users
            .filter((item: any) => !!item.name)
            .map((item: any) => {
              return { label: item.name, value: item.name };
            });
        }}
      />
    </DrawerForm>
  );
};
