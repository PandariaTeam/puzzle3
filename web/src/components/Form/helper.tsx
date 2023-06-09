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
  ProFormSelect,
  ProFormSwitch,
  ProFormText
} from '@ant-design/pro-components';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context';
import { initialValue } from '@/stores/domain';
import { BaseProps } from './constant';

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

const PuzzleFormHelper = (props: BaseProps) => {
  const {
    rootStore: { helperStore }
  } = useStore();
  const { preview } = props;
  if (preview) return null;

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

              helperStore.setJson(values);

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
              helperStore.setValue(values);
            }}
          >
            {/* <ProForm.Group title='Puzzle标题配置'>
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
            </ProForm.Group> */}
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
              text={helperStore.json}
              mode='read'
            />
          </ProForm>
        </ProCard>
      </ProCard>
    </>
  );
};

export default observer(PuzzleFormHelper);
