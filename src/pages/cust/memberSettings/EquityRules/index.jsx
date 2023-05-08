import { Space, Table, Button, Popconfirm } from 'antd';
import { data } from './util'
import { CardPro, ButtonGroupPro } from '@antdp/antdp-ui'
const EquityRules = () => {
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
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">编辑</Button>
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

  const onAdd = () => { }


  return (
    <div>
      <CardPro>
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '新建权益规则',
              onClick: () => { onAdd() },
            },
          ]}
        />
        <Table columns={columns} dataSource={data} />
      </CardPro>
    </div>

  )
}
export default EquityRules;