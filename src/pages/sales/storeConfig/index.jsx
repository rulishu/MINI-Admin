import { selectPage } from '@/service/cust/tagsManage';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Button } from 'antd';
import { useRef } from 'react';
import Edit from './Edit';
import { columns } from './columns';
import styles from './index.less';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'storeConfig/update',
      payload: data,
    });
  };

  return (
    <PageContainer className={styles.page_container}>
      <ProTable
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 'auto',
        }}
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
        toolBarRender={() => [
          <Button type="primary" onClick={() => update({ visible: true })}>
            导出
          </Button>,
        ]}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns()}
        rowKey="id"
      />
      <Edit />
    </PageContainer>
  );
};
