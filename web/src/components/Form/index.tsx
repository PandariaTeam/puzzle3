/* eslint-disable no-param-reassign */
import { EditOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  ProFormTextArea,
  FormListActionType
} from '@ant-design/pro-components';
import { Button, Modal, Image, message } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useStore } from '@/context';
import { Exam, IssueType } from '@/stores/domain';
import { frame } from '@/utils/show';
import PuzzleFormHelper from './helper';
import { PuzzleDrawer } from './draw';
import { titleCls, modalContentCls } from './style';
import { BaseProps } from './constant';

interface Props extends BaseProps {}
const PuzzleForm = (props: Props) => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const { instanceId } = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { preview } = props;
  const {
    rootStore: { formStore, helperStore, web3Store }
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
    let res;
    let tokenId;
    if (preview) {
      const examinations = form.getFieldsValue()?.examinations ?? [];
      const current = examinations.map((item: Exam) => item?.option);
      tokenId = await formStore.submitInstance({ instanceId, current });
    } else {
      res = await formStore.create();
    }
    setSubmitLoading(false);
    if (res && !preview) navigate('/');
    if (tokenId && preview) {
      frame();
      Modal.success({
        title: '恭喜您完成答题得到NFT奖励',
        content: (
          <div className={modalContentCls}>
            <Image
              width={200}
              src={`https://service.puzzle3.cc/puzzles/0xFde8805C5adBee30cf163c1482429B91132665fA/0/img.svg`}
            />
          </div>
        )
      });
    }
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
      </Button>
      // <Button key='read' onClick={() => frame()}>
      //   重置
      // </Button>
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
        initialValue={dataSorce.map(() => null)}
        creatorButtonProps={{
          position: 'bottom'
        }}
        {...helperStore.stateValue}
      />
    );
  };
  const renderMd = () => {
    if (!preview) return null;
    return (
      <ProCard style={{ marginBottom: 20 }}>
        <ReactMarkdown>{formStore?.formData?.description}</ReactMarkdown>
      </ProCard>
    );
  };
  const colSpan = preview ? 'calc(100%)' : 'calc(100% - 400px)';
  return (
    <>
      {renderMd()}
      <ProCard bordered split='vertical' headerBordered>
        <PuzzleFormHelper preview={preview} />
        <ProCard colSpan={colSpan} title='Puzzle表单'>
          <ProForm
            form={form}
            submitter={{ render: renderSubmitter }}
            onValuesChange={(val) => {
              if (val?.puzzleAddress)
                formStore.updateAddress(val?.puzzleAddress);
              if (val?.puzzleName)
                formStore.updateFormData({ name: val?.puzzleName ?? '' });
              if (val?.puzzleDesc)
                formStore.updateFormData({
                  description: val?.puzzleDesc ?? ''
                });
              console.log('ss', toJS(formStore.viewSchema));
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
            {!preview && (
              <ProFormText
                name='puzzleName'
                required
                label='请输入Puzzle标题'
                placeholder='请输入Puzzle标题'
              />
            )}
            {!preview && (
              <ProFormTextArea
                name='puzzleDesc'
                required
                label='请输入描述信息'
                placeholder='请输入描述信息'
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
