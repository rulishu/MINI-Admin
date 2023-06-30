import SKUModal from '@/pages/product/productManage/SKUModal';
// import { useDispatch } from '@umijs/max';
// import { Button } from 'antd';

const SKUButton = (props) => {
  const { value, onChange } = props;
  // const dispatch = useDispatch();

  return (
    <>
      {/* <Button
        onClick={() => {
          dispatch({
            type: 'productManage/update',
            payload: { showSKU: true },
          });
        }}
        type="primary"
      >
        添加规格
      </Button> */}
      <SKUModal value={value} onChange={onChange} />
    </>
  );
};
export default SKUButton;
