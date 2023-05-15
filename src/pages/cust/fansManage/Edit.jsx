import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import { basicItem } from './columns';

export default function SearchTable() {
  const { visible, queryData } = useSelector((state) => state.memberManage);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'fansManage/update',
      payload: data,
    });
  };

  const handleCancel = () => update({ visible: false });

  return (
    <Modal open={visible} onCancel={handleCancel} footer={false}>
      <ProDescriptions column={2} title="基本信息" dataSource={queryData} columns={basicItem} />
    </Modal>
  );
}
