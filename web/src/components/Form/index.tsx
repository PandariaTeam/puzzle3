/* eslint-disable no-param-reassign */
import { EditOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  FormListActionType
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useStore } from '@/context';
import { Exam, IssueType } from '@/stores/domain';
import PuzzleFormHelper from './helper';
import { PuzzleDrawer } from './draw';
import { labelCls, titleCls } from './style';
import { BaseProps } from './constant';

interface Props extends BaseProps {}
const PuzzleForm = (props: Props) => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { preview } = props;
  const {
    rootStore: { formStore, helperStore }
  } = useStore();
  const openEditForm = (index: number) => {
    if (preview) return null;
    formStore.changeVisible();
    formStore.updateIndex(index);
  };
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  useEffect(() => {
    if (!preview) return;
    helperStore.hideOperateBtn();
  }, [preview]);
  const actionGuard = {
    beforeAddRow: async (defaultValue: any, insertIndex: number) => {
      // TODO: defaultValue 存在是add不存在是copy,没查到文档，先hack解决
      if (defaultValue) formStore.addItem();
      if (!defaultValue) formStore.copyItem(insertIndex);
      actionRef.current?.add();
    },
    beforeRemoveRow: async (index: number) => {
      actionRef.current?.remove(1);
      formStore.removeItem(index);
    }
  };
  const onSubmit = async () => {
    setSubmitLoading(true);
    const res = await formStore.create();
    setSubmitLoading(false);
    if (res) navigate('/');
  };
  const renderSubmitter = () => {
    return [
      <Button
        loading={submitLoading}
        onClick={() => onSubmit()}
        type='primary'
        key='edit'
      >
        提交
      </Button>,
      <Button key='read'>重置</Button>
    ];
  };
  const renderProList = () => {
    const dataSorce = preview ? formStore.viewSchema : formStore.editSchema;
    if (!dataSorce.length) return null;
    return (
      <ProFormList
        actionGuard={actionGuard as any}
        actionRef={actionRef}
        itemRender={({ action }, listMeta) => {
          const record = dataSorce[listMeta.index];
          const options = record.examinations.map((item: Exam) => {
            return { label: item.option, value: item.option };
          });
          return (
            <ProCard
              bordered
              style={{ marginBlockEnd: 8 }}
              title={
                <div
                  className={titleCls}
                  onClick={() => openEditForm(listMeta.index)}
                >
                  <span className={`${titleCls}-text`}>{`第${
                    listMeta.index + 1
                  }题`}</span>
                  {!preview && <EditOutlined />}
                </div>
              }
              extra={action}
              bodyStyle={{ paddingBlockEnd: 0 }}
            >
              {record.type === IssueType.Single ? (
                <ProFormRadio.Group
                  name='option'
                  layout='vertical'
                  label={record.name}
                  options={options}
                />
              ) : (
                <ProFormCheckbox.Group
                  name='option'
                  layout='vertical'
                  label={record.name}
                  options={options}
                />
              )}
            </ProCard>
          );
        }}
        name='examinations'
        label={
          <p className={labelCls}>
            {(helperStore.stateValue as any)?.label ?? 'Hello Web3'}
          </p>
        }
        initialValue={dataSorce.map(() => null)}
        creatorButtonProps={{
          position: 'bottom'
        }}
        {...helperStore.stateValue}
      />
    );
  };
  const colSpan = preview ? 'calc(100%)' : 'calc(100% - 400px)';
  return (
    <>
      <ProCard bordered split='vertical' headerBordered>
        <PuzzleFormHelper preview={preview} />
        <ProCard colSpan={colSpan} title='Puzzle表单'>
          <ProForm
            form={form}
            submitter={{ render: renderSubmitter }}
            onValuesChange={(val) => {
              if (val?.puzzleAddress)
                formStore.updateAddress(val?.puzzleAddress);
              console.log(
                'ss',
                form.getFieldsValue(),
                toJS(formStore.editSchema),
                toJS(formStore.viewSchema)
              );
            }}
          >
            {!preview && (
              <ProFormText
                name='puzzleAddress'
                required
                label='请输入合约地址'
                placeholder='请输入合约地址'
              />
            )}
            {renderProList()}
          </ProForm>
        </ProCard>
      </ProCard>
      <PuzzleDrawer preview={preview} />
    </>
  );
};

export default observer(PuzzleForm);
