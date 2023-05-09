import { ButtonGroupPro, CardPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { Button, Popconfirm, Space, Table } from 'antd';
import Modals from './Modals.jsx';
import { data } from './util';

const EquityRules = () => {
  const {
    store,
    store: { visible },
    setStore,
  } = useModel('equityRules', (model) => ({ ...model }));
  const columns = [
    {
      title: '权益规则名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '权益规则详情',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      // eslint-disable-next-line no-unused-vars
      render: () => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit()}>
            编辑
          </Button>
          <Popconfirm
            title="权益规则删除"
            description="删除后无法恢复规则，确认要删除该权益规则吗"
            okText="确定"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
          <Button type="link">复制</Button>
        </Space>
      ),
    },
  ];

  const onAdd = () => {
    setStore({ ...store, visible: true });
  };

  const onEdit = () => {
    setStore({ ...store, visible: true });
  };

  return (
    <div>
      {visible ? (
        <Modals />
      ) : (
        <CardPro>
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '新建权益规则',
                onClick: () => {
                  onAdd();
                },
              },
            ]}
          />
          <Table columns={columns} dataSource={data} />
        </CardPro>
      )}
    </div>
  );
};
export default EquityRules;
