import AModal from '@/components/AModal';
import SelectUser from '@/components/SelectUser';
import { getUserList } from '@/service/cust/agentManagement';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { levelStatus } from './enum';

const title = {
  user: '修改邀请人',
  sell: '修改经销等级',
};

export default () => {
  const {
    userDetail: { editModalVisible, editType },
  } = useSelector((state) => state);
  const form = useForm();
  const dispatch = useDispatch();
  const close = () => {
    dispatch({
      type: 'userDetail/update',
      payload: {
        editModalVisible: false,
        editType: '',
      },
    });
  };

  const onFinish = (values) => {
    console.log('values', values);
  };

  return (
    <AModal
      open={editModalVisible}
      width={500}
      onCancel={close}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="cancel" onClick={close}>
            取消
          </Button>
          <Button key="save" type="primary" onClick={form.submit}>
            确定
          </Button>
        </div>
      }
    >
      <ProCard title={title[editType]} headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <FormRender
          form={form}
          widgets={{
            selectUser: SelectUser,
          }}
          schema={{
            type: 'object',
            displayType: 'row',
            properties: {
              // 经销等级
              sellName: {
                span: 24,
                type: 'string',
                title: '当前等级',
                widget: 'html',
                hidden: editType !== 'sell',
              },
              type: {
                span: 24,
                title: '变更后',
                widget: 'select',
                type: 'number',
                required: true,
                props: {
                  options: Object.entries(levelStatus).map(([key, value]) => ({
                    label: value.text,
                    value: key,
                  })),
                },
                hidden: editType !== 'sell',
              },
              // 邀请人
              userName: {
                span: 24,
                type: 'string',
                title: '当前邀请人',
                widget: 'html',
                hidden: editType !== 'user',
              },
              legalPersonId: {
                title: '变更后',
                type: 'object',
                widget: 'selectUser',
                required: true,
                hidden: editType !== 'user',
                props: {
                  fetch: getUserList,
                  configCode: {
                    key: 'id',
                    value: 'id',
                    label: 'consumerName',
                    headUrl: 'headUrl',
                    phone: 'consumerPhone',
                    searchCode: 'search',
                  },
                  title: '代理人',
                },
              },
            },
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
