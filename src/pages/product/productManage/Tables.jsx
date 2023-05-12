import { selectSellPage } from '@/service/productManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { useRef } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();

  const {
    store: { activeKey, tabs, select },
    update,
    deletePro,
    upload,
    down,
  } = useModel('productManage', (model) => ({ ...model }));

  const edit = () => {
    console.log(select);
  };

  return (
    <ProTable
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        let body = {
          pageNum: current,
          pageSize,
          ...formData,
        };
        if (tabs === '1') {
          body.categoryId = 2;
        }
        if (tabs === '2') {
          body.categoryId = 3;
        }

        if (activeKey === '2') {
          body.stock = 0;
        }
        if (activeKey === '3') {
          body.onShelf = 0;
        }
        const { code, result } = await selectSellPage(body);
        if (code === 200) {
          update({ select: { selectedRowKeys: [], selectedRows: [] } });
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
          onChange: (key) => {
            update({ activeKey: key });
            ref?.current?.reload();
          },
        },
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '发布商品',
                onClick: () => update({ showForm: true }),
              },
              {
                type: 'primary',
                label: '上架',
                onClick: () => upload(select.selectedRowKeys, () => ref?.current?.reload()),
              },
              {
                type: 'primary',
                label: '下架',
                onClick: () => down(select.selectedRowKeys, () => ref?.current?.reload()),
              },

              {
                type: 'primary',
                label: '删除',
                onClick: () => deletePro(select, () => ref?.current?.reload()),
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
      columns={columns(edit)}
      rowKey="id"
      rowSelection={{
        selectedRowKeys: select.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) =>
          update({ select: { selectedRowKeys: selectedRowKeys, selectedRows: selectedRows } }),
      }}
      scroll={{ x: 1300 }}
    />
  );
}
