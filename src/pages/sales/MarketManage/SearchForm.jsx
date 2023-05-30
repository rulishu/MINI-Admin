import { ProForm, ProFormCascader } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Cascader, Input, Space } from 'antd';
const { SHOW_CHILD } = Cascader;

export default ({ cascaderList, setCascaderList }) => {
  const dispatch = useDispatch();

  const { groupManage } = useSelector((state) => state);
  const { categoryTree, categoryList } = groupManage;

  const getCategoryNameList = () => {
    (categoryList || []).map((item) => ({
      [item?.id]: item?.categoryName,
    }));
  };
  console.log('getCategoryNameList: ', getCategoryNameList());

  const handler = (data) => {
    return data.map((item) => {
      const obj = { label: item?.label || '', value: item?.id };
      if (item?.children && item?.children.length > 0) {
        obj.children = handler(item.children);
      }
      return obj;
    });
  };
  const options = () => {
    if (categoryTree.length > 0) {
      return [...handler(categoryTree)];
    } else {
      return [];
    }
  };

  return (
    <>
      <ProForm
        layout="inline"
        grid={true}
        rowProps={{
          gutter: [16, 16],
        }}
        submitter={false}
      >
        <ProFormCascader
          initialValue={cascaderList}
          fieldProps={{
            multiple: true,
            maxTagCount: 'responsive',
            showCheckedStrategy: SHOW_CHILD,
            onChange: (val) => {
              console.log('val: ', val);
              setCascaderList(val);
              dispatch({
                type: 'marketManage/updateState',
                payload: {},
              });
            },
            options: options(),
          }}
          width="md"
          name="areaList"
          label="关联后台类目"
        />
      </ProForm>
      <p style={{ color: 'rgba(0, 0, 0, 0.25)' }}>
        关联后台叶子类目后，所有该类目下的商品都会出现在前台类目中
      </p>
      <Space wrap>
        {cascaderList.map((item) => (
          <Space.Compact
            key={item?.id}
            style={{
              width: '100%',
            }}
          >
            <Input disabled defaultValue="一级/二级/三级" />
            <Button type="default">删除</Button>
          </Space.Compact>
        ))}
      </Space>
    </>
  );
};
