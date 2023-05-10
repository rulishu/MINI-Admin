import { selectPage } from '@/service/productManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    selectedRows: [],
  });

  const {
    store: { activeKey },
    update,
  } = useModel('productManage', (model) => ({ ...model }));

  return (
    <ProTable
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        const { code, result } = await selectPage({
          pageNum: current,
          pageSize,
          ...formData,
        });
        if (code === 200) {
          return {
            data: result.records || [],
            total: result.total,
            success: true,
          };
        }
      }}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey: activeKey,
          items: [
            {
              key: '1',
              label: `销售中`,
            },
            {
              key: '2',
              label: `已售空`,
            },
            {
              key: '3',
              label: `未上架`,
            },
          ],
          onChange: (key) => update({ activeKey: key }),
        },
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '发布商品',
                onClick: () => {},
              },
              {
                type: 'primary',
                label: '上架',
              },
              {
                type: 'primary',
                label: '下架',
              },
              {
                type: 'primary',
                label: '删除',
              },
              {
                type: 'primary',
                label: '改分组',
              },
            ]}
          />
        ),
      }}
      pagination={{
        showSizeChanger: true,
      }}
      cardBordered={true}
      columns={columns}
      rowKey="id"
      rowSelection={{
        selectedRowKeys: select.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => setSelect({ selectedRowKeys, selectedRows }),
      }}
      scroll={{ x: 1300 }}
    />
  );
}
