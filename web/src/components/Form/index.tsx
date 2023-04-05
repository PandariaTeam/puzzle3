/* eslint-disable no-param-reassign */
import {
  CopyOutlined,
  DeleteOutlined,
  HeartOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined
} from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText
} from '@ant-design/pro-components';
import { useState } from 'react';

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
  }
};
const PuzzleForm = () => {
  const [stateValue, setStateValue] = useState({});
  const [json, setJson] = useState(() => JSON.stringify(initialValue));
  return (
    <ProCard bordered split='vertical' headerBordered>
      <ProCard colSpan='400px' title='配置菜单'>
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
              values.copyIconProps.Icon = IconMap[values?.copyIconProps?.Icon];
            }

            if (values?.deleteIconProps?.Icon) {
              values.deleteIconProps.Icon =
                IconMap[values?.deleteIconProps?.Icon];
            }
            if (values?.creatorButtonProps?.icon) {
              const Icon = IconMap[values?.creatorButtonProps?.icon];
              values.creatorButtonProps.icon = <Icon />;
            }
            setStateValue(values);
          }}
        >
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
                if (!creatorButtonProps.show) {
                  return null;
                }
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
      <ProCard colSpan='calc(100% - 400px)' title='Puzzle 表单'>
        <ProForm>
          <ProFormList
            name='users'
            label='用户信息'
            initialValue={[
              {
                name: '1111'
              }
            ]}
            creatorButtonProps={{
              position: 'bottom'
            }}
            {...stateValue}
          >
            <ProForm.Group key='group' size={8}>
              <ProFormText name='name' label='姓名' />
              <ProFormText name='nickName' label='姓名' />
            </ProForm.Group>
          </ProFormList>
        </ProForm>
      </ProCard>
    </ProCard>
  );
};

export default PuzzleForm;