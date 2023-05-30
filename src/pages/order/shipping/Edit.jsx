import { useDispatch, useSelector } from '@umijs/max';
import { Drawer } from 'antd';

export default function Edit() {
  const dispatch = useDispatch();
  const { visible } = useSelector((state) => state.shipping);

  const update = (data) => {
    dispatch({
      type: 'shipping/update',
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
