import AModal from '@/components/AModal';
import SelectUser from '@/components/SelectUser';
import { create, getUserList, updateInfo } from '@/service/cust/agentManagement';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

export default () => {
  const form = useForm();
  const {
    dealerManage: { visible, queryInfo, type },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'dealerManage/update',
      payload: data,
    });
  };

  const fn = {
    add: create,
    edit: updateInfo,
  };

  // eslint-disable-next-line no-unused-vars
  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: fn[type],
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: false,
          reload: true,
          type: '',
          queryInfo: {},
        });
      }
    },
  });

  useEffect(() => {
    if (visible) {
      form.setValues({
        form1: {
          companyName: queryInfo.companyName,
          shopName: queryInfo.shopName,
          desc: queryInfo.desc,
        },
        form2: {
          legalPersonId: queryInfo.consumerName
            ? {
                label: queryInfo.consumerName,
                value: queryInfo.conId,
                phone: queryInfo.consumerPhone,
                headUrl: queryInfo.headUrl,
              }
            : undefined,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, queryInfo]);

  // eslint-disable-next-line
  const onFinish = (values) => {
    const { form1, form2 } = values;
    const params = {
      companyName: form1.companyName,
      shopName: form1.shopName,
      desc: form1.desc,
      legalPersonId: form2.legalPersonId && form2.legalPersonId.value,
      id: queryInfo.id,
    };
    mutateAsync(params);
  };

  return (
    <AModal
      open={visible}
      width={600}
      onCancel={() => update({ visible: false })}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" loading={isLoading} onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard
        title={type === 'add' ? '新增' : '修改'}
        headerBordered
        bodyStyle={{ paddingBottom: 0 }}
      >
        <FormRender
          form={form}
          widgets={{
            selectUser: SelectUser,
          }}
          schema={{
            type: 'object',
            properties: {
              form1: {
                type: 'object',
                widget: 'lineTitle',
                title: '经销',
                properties: {
                  companyName: {
                    title: '经销商名称',
                    type: 'string',
                    required: true,
                    span: 12,
                    props: {
                      allowClear: true,
                    },
                    placeholder: '请输入经销商',
                  },
                  shopName: {
                    title: '镖局名称',
                    type: 'string',
                    required: true,
                    span: 12,
                    props: {
                      allowClear: true,
                    },
                    placeholder: '请输入代理商',
                  },
                  desc: {
                    title: '备注',
                    type: 'string',
                    widget: 'textArea',
                    span: 24,
                    props: {
                      allowClear: true,
                      rows: 4,
                    },
                    placeholder: '请输入代理商',
                  },
                },
              },
              form2: {
                type: 'object',
                widget: 'lineTitle',
                title: '代理人账号',
                properties: {
                  legalPersonId: {
                    title: '代理人账号',
                    tooltip: '代理人账号可以查看代理公司归属地盘的地盘分润',
                    type: 'object',
                    widget: 'selectUser',
                    required: true,
                    props: {
                      fetch: getUserList,
                      configCode: {
                        key: 'id',
                        value: 'id',
                        label: 'consumerName',
                        headUrl: 'headUrl',
                        phone: 'consumerPhone',
                        searchCode: 'phone',
                      },
                      title: '代理人',
                    },
                  },
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
