import { useDispatch } from '@umijs/max';
import { Button } from 'antd';

export default () => {
  // const { visible,} = useSelector((state) => state.bannerManage);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'bannerManage/update',
      payload: data,
    });
  };

  return (
    <>
      配置页
      <Button onClick={() => update({ visible: false })}>返回</Button>
    </>
  );
};
