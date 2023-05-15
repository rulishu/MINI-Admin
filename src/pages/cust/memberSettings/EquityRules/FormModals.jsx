import { selectPage } from '@/service/cust/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Input, Modal, Select } from 'antd';
import { useRef } from 'react';
import { columnsFn } from './columns';
const { Search } = Input;

const FormModals = () => {
  const ref = useRef();
  const { visibleTable } = useSelector((state) => state.equityRules);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'equityRules/update',
      payload: data,
    });
  };

  const handleOk = () => {
    update({ visibleTable: false });
  };
  const handleCancel = () => {
    update({ visibleTable: false });
  };

  const onSearch = (value) => console.log(value);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal title="选择商品" open={visibleTable} onOk={handleOk} onCancel={handleCancel}>
      <ProTable
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, data } = await selectPage({
            current,
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
        toolbar={{
          actions: (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button style={{ marginRight: 10 }}>刷新</Button>
              <Select
                defaultValue="jack"
                style={{
                  width: 120,
                  marginRight: 10,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'jack',
                    label: '酱香白酒',
                  },
                  {
                    value: 'lucy',
                    label: '米面粮食',
                  },
                  {
                    value: 'Yiminghe',
                    label: '养生茶饮',
                  },
                  {
                    value: 'disabled',
                    label: '南北干货',
                  },
                ]}
              />
              <Search
                placeholder="请输入商品名称"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
            </div>
          ),
        }}
        search={false}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columnsFn}
        rowKey="id"
      />
    </Modal>
  );
};
export default FormModals;
