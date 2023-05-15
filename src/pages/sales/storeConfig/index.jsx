import { selectPage } from '@/service/tagsManage';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch } from '@umijs/max';
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

  const content = (
    <div>
      <div>视频号小店：</div>
      <div>
        应腾讯官方通知，原视频号交易组件3.0接口将收回，且不再提供给非品牌商家使用（品牌商家可继续使用）。为此平台已接入视频号小店，接入后，可通过视频号小店实现与视频号的关联及视频号直播带货。视频号小店开店指引：
        <a>点击查看 </a>
      </div>
    </div>
  );
  return (
    <PageContainer className={styles.page_container} content={content}>
      <ProTable
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 120,
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
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '添加视频小号',
                  onClick: () => update({ visible: true }),
                },
              ]}
            />
          ),
        }}
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
