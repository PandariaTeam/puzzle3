/* eslint-disable no-param-reassign */
import { EditOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormRadio,
  ProFormCheckbox,
  FormListActionType
} from '@ant-design/pro-components';
import { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useStore } from '@/context';
import { Exam, IssueType } from '@/stores/domain';
import PuzzleFormHelper from './helper';
import { PuzzleDrawer } from './draw';
import { labelCls, titleCls } from './style';

const PuzzleForm = () => {
  const [form] = ProForm.useForm();
  const {
    rootStore: { formStore, helperStore }
  } = useStore();
  const openEditForm = (index: number) => {
    if (formStore.preview) return null;
    formStore.changeVisible();
    formStore.updateIndex(index);
  };
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  useEffect(() => {
    if (!formStore.preview) return;
    helperStore.hideOperateBtn();
  }, [formStore.preview]);
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
  const colSpan = formStore.preview ? 'calc(100%)' : 'calc(100% - 400px)';
  return (
    <>
      <ProCard bordered split='vertical' headerBordered>
        <PuzzleFormHelper />
        <ProCard colSpan={colSpan} title='Puzzle表单'>
          <ProForm
            form={form}
            onValuesChange={() =>
              console.log(
                'ss',
                form.getFieldsValue(),
                toJS(formStore.editSchema)
              )
            }
          >
            <ProFormList
              actionGuard={actionGuard as any}
              actionRef={actionRef}
              itemRender={({ action }, listMeta) => {
                const record = formStore.editSchema[listMeta.index];
                // console.log('listMeta', listMeta);
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
                        {!formStore.preview && <EditOutlined />}
                      </div>
                    }
                    extra={action}
                    bodyStyle={{ paddingBlockEnd: 0 }}
                  >
                    {record.type === IssueType.Single ? (
                      <ProFormRadio.Group
                        name='option'
                        label={record.name}
                        options={options}
                      />
                    ) : (
                      <ProFormCheckbox.Group
                        name='option'
                        layout='horizontal'
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
              initialValue={formStore.editSchema.map(() => null)}
              creatorButtonProps={{
                position: 'bottom'
              }}
              {...helperStore.stateValue}
            />
          </ProForm>
        </ProCard>
      </ProCard>
      <PuzzleDrawer />
    </>
  );
};

export default observer(PuzzleForm);
