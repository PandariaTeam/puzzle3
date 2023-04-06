/* eslint-disable no-param-reassign */
import {
  CopyOutlined,
  DeleteOutlined,
  HeartOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  EditOutlined
} from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  FormListActionType
} from '@ant-design/pro-components';
import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useStore } from '@/context';
import { Exam } from '@/stores/domain';
import { PuzzleDrawer } from './draw';
import { labelCls, titleCls } from './style';

const IconMap: any = {
  PlusOutlined,
  HeartOutlined,
  DeleteOutlined,
  CopyOutlined,
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined
};
const initialValue = {
  copyIconProps: {
    show: true,
    Icon: 'CopyOutlined',
    tooltipText: '复制此行'
  },
  deleteIconProps: {
    show: true,
    Icon: 'DeleteOutlined',
    tooltipText: '删除此行'
  },
  creatorButtonProps: {
    show: true,
    creatorButtonText: '新建一行',
    position: 'button',
    type: 'dashed',
    icon: 'PlusOutlined'
  },
  label: 'Hello Web3'
};
const PuzzleForm = () => {
  const [stateValue, setStateValue] = useState({});
  const [json, setJson] = useState(() => JSON.stringify(initialValue));
  const [form] = ProForm.useForm();
  const {
    rootStore: { formStore }
  } = useStore();
  const openEditForm = (index: number) => {
    formStore.changeVisible();
    formStore.updateIndex(index);
  };
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const actionGuard = {
    beforeAddRow: async (
      defaultValue: string,
      insertIndex: number,
      count: number
    ) => {
      console.log('amen', defaultValue, insertIndex, count);
      formStore.addItem();
      actionRef.current?.add();
    },
    beforeRemoveRow: async (index: number) => {
      actionRef.current?.remove(1);
      formStore.removeItem(index);
    }
  };
  return (
    <>
      <ProCard bordered split='vertical' headerBordered>
        <ProCard colSpan='400px' title='工具栏'>
          <ProForm
            submitter={false}
            initialValues={initialValue}
            onValuesChange={(_, values) => {
              if (values?.creatorButtonProps?.show === false) {
                values.creatorButtonProps = false;
              }

              if (values?.copyIconProps?.show === false) {
                values.copyIconProps = false;
              }
              if (values?.deleteIconProps?.show === false) {
                values.deleteIconProps = false;
              }

              delete values.creatorButtonProps.show;
              delete values.deleteIconProps.show;
              delete values.creatorButtonProps.show;

              setJson(JSON.stringify(values));

              if (values?.copyIconProps?.Icon) {
                values.copyIconProps.Icon =
                  IconMap[values?.copyIconProps?.Icon];
              }

              if (values?.deleteIconProps?.Icon) {
                values.deleteIconProps.Icon =
                  IconMap[values?.deleteIconProps?.Icon];
              }
              if (values?.creatorButtonProps?.icon) {
                const Icon = IconMap[values?.creatorButtonProps?.icon];
                values.creatorButtonProps.icon = <Icon />;
              }
              console.log('values', values);
              setStateValue(values);
            }}
          >
            <ProForm.Group title='Puzzle标题配置'>
              <ProFormDependency name={['label']}>
                {() => {
                  // if (!label.text) return null;
                  return (
                    <ProForm.Group size={8}>
                      <ProFormText width='sm' name={['label']} />
                    </ProForm.Group>
                  );
                }}
              </ProFormDependency>
            </ProForm.Group>
            <ProForm.Group
              title='新建按钮配置'
              extra={
                <ProFormSwitch
                  fieldProps={{
                    size: 'small'
                  }}
                  noStyle
                  name={['creatorButtonProps', 'show']}
                />
              }
            >
              <ProFormDependency name={['creatorButtonProps']}>
                {({ creatorButtonProps }) => {
                  if (!creatorButtonProps.show) return null;
                  return (
                    <ProForm.Group size={8}>
                      <ProFormText
                        width='sm'
                        name={['creatorButtonProps', 'creatorButtonText']}
                        label='按钮文字'
                      />
                      <ProFormSelect
                        width='xs'
                        name={['creatorButtonProps', 'icon']}
                        label='图标'
                        request={async () => {
                          return Object.keys(IconMap).map((value) => {
                            const Icon = IconMap[value];
                            return {
                              label: <Icon />,
                              value
                            };
                          });
                        }}
                      />
                      <ProFormSelect
                        width='xs'
                        name={['creatorButtonProps', 'position']}
                        label='按钮位置'
                        request={async () => {
                          return ['bottom', 'top'].map((value) => {
                            return {
                              label: value,
                              value
                            };
                          });
                        }}
                      />
                      <ProFormSelect
                        width='xs'
                        name={['creatorButtonProps', 'type']}
                        label='按钮类型'
                        request={async () => {
                          return [
                            'default',
                            'primary',
                            'ghost',
                            'dashed',
                            'link',
                            'text'
                          ].map((value) => {
                            return {
                              label: value,
                              value
                            };
                          });
                        }}
                      />
                    </ProForm.Group>
                  );
                }}
              </ProFormDependency>
            </ProForm.Group>
            <ProForm.Group
              title='复制按钮配置'
              extra={
                <ProFormSwitch
                  fieldProps={{
                    size: 'small'
                  }}
                  noStyle
                  name={['copyIconProps', 'show']}
                />
              }
            >
              <ProFormDependency name={['copyIconProps']}>
                {({ copyIconProps }) => {
                  if (!copyIconProps.show) {
                    return null;
                  }
                  return (
                    <ProForm.Group size={8}>
                      <ProFormText
                        width='sm'
                        name={['copyIconProps', 'tooltipText']}
                        label=' tooltip 提示文字'
                      />
                      <ProFormSelect
                        width='xs'
                        name={['copyIconProps', 'Icon']}
                        label='图标'
                        request={async () => {
                          return Object.keys(IconMap).map((value) => {
                            const Icon = IconMap[value];
                            return {
                              label: <Icon />,
                              value
                            };
                          });
                        }}
                      />
                    </ProForm.Group>
                  );
                }}
              </ProFormDependency>
            </ProForm.Group>
            <ProForm.Group
              title='删除按钮配置'
              extra={
                <ProFormSwitch
                  fieldProps={{
                    size: 'small'
                  }}
                  noStyle
                  name={['deleteIconProps', 'show']}
                />
              }
            >
              <ProFormDependency name={['deleteIconProps']}>
                {({ deleteIconProps }) => {
                  if (!deleteIconProps.show) {
                    return null;
                  }
                  return (
                    <ProForm.Group size={8}>
                      <ProFormText
                        width='sm'
                        name={['deleteIconProps', 'tooltipText']}
                        label=' tooltip 提示文字'
                      />
                      <ProFormSelect
                        width='xs'
                        name={['deleteIconProps', 'Icon']}
                        label='图标'
                        request={async () => {
                          return Object.keys(IconMap).map((value) => {
                            const Icon = IconMap[value];
                            return {
                              label: <Icon />,
                              value
                            };
                          });
                        }}
                      />
                    </ProForm.Group>
                  );
                }}
              </ProFormDependency>
            </ProForm.Group>
            <ProFormField
              ignoreFormItem
              valueType='jsonCode'
              text={json}
              mode='read'
            />
          </ProForm>
        </ProCard>
        <ProCard colSpan='calc(100% - 400px)' title='Puzzle表单'>
          <ProForm
            form={form}
            onValuesChange={(val) =>
              console.log(
                'ss',
                val,
                form.getFieldsValue(),
                toJS(formStore.editSchema)
              )
            }
          >
            <ProFormList
              actionGuard={actionGuard as any}
              actionRef={actionRef}
              itemRender={({ action }, listMeta) => {
                // const { record } = listMeta;
                const record = formStore.editSchema[listMeta.index];
                console.log('listMeta', listMeta, record);
                // console.log('s', toJS(formStore.editSchema));
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
                        <EditOutlined />
                      </div>
                    }
                    extra={action}
                    bodyStyle={{ paddingBlockEnd: 0 }}
                  >
                    {record.type === 0 ? (
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
                  {(stateValue as any)?.label ?? 'Hello Web3'}
                </p>
              }
              initialValue={formStore.editSchema}
              creatorButtonProps={{
                position: 'bottom'
              }}
              {...stateValue}
            />
          </ProForm>
        </ProCard>
      </ProCard>
      <PuzzleDrawer />
    </>
  );
};

export default observer(PuzzleForm);
