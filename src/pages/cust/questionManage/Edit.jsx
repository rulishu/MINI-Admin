import { useDispatch, useSelector } from '@umijs/max';
import { Drawer } from 'antd';

export default function Edit() {
  const {
    questionManage: { visible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const update = (data) => {
    dispatch({
      type: 'supplier/update',
      payload: data,
    });
  };
  const close = () => update({ visible: false });
  return (
    <Drawer open={visible} onClose={close} destroyOnClose size="large">
      <span>编辑/新增</span>
    </Drawer>
  );
}
