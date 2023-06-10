import { useSelector } from '@umijs/max';
import { Button, Cascader, Space } from 'antd';

const PriceInput = (props) => {
  const { onClick, ...others } = props;

  const { groupManage } = useSelector((state) => state);
  const { categoryTree } = groupManage;

  const handler = (data) => {
    const arr = [];
    data.forEach((item) => {
      if (item?.id !== '0') {
        const obj = { label: item?.label || '', value: item?.id };
        if (item?.children && item?.children.length > 0) {
          obj.children = handler(item.children);
        }
        arr.push(obj);
      }
    });
    return arr;
  };

  const options = () => {
    if (categoryTree && categoryTree.length > 0) {
      return [...handler(categoryTree)];
    } else {
      return [];
    }
  };

  return (
    <Space.Compact block>
      <Cascader options={options()} {...others} />
      <Button onClick={onClick}>修改</Button>
    </Space.Compact>
  );
};

export default PriceInput;
