import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Alert, Button, Row, Space } from 'antd';
import { useRef } from 'react';
import GiftEdit from './GiftEdit/GiftEdit';
import { columnsGift } from './columns';

export default function GiftTables() {
  const ref = useRef();

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'packManagement/update',
      payload: data,
    });
  };

  const text = (
    <div>
      <span style={{ color: '#31708F', fontWeight: 'bold' }}>温馨提示:</span>
      <span style={{ color: '#FF0000' }}>
        店长大礼包只能在下面商品修改，如果有多种商品，请在商品规格那里录入多种情况。
      </span>
    </div>
  );
  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Alert message={text} type="info" closable />
        </Space>
      </Row>
      <ProTable
        headerTitle="店长礼包列表"
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, data } = await selectPage({
            pageNum: current,
            pageSize,
            queryData: { ...formData },
          });
          if (code === 1) {
            return {
              data: data.rows || [],
              total: data.total,
              success: true,
            };
          }
        }}
        toolBarRender={() => [
          <Button key="save" onClick={() => update({ giftVisible: true })} type="primary">
            新建礼包
          </Button>,
        ]}
        search={false}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columnsGift}
        rowKey="id"
      />
      <GiftEdit />
    </div>
  );
}
