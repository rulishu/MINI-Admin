import { ProFormCascader, QueryFilter } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Cascader, Input, Space } from 'antd';
import { useEffect, useRef } from 'react';

const { SHOW_CHILD } = Cascader;

export default ({ proTableRef }) => {
  const { message } = App.useApp();
  const dispatch = useDispatch();
  const formRef = useRef();

  const { groupManage, marketManage } = useSelector((state) => state);
  const { categoryTree, categoryList } = groupManage;
  const { cascaderList, activeMarketId } = marketManage;

  useEffect(() => {
    if (cascaderList) {
      formRef?.current?.setFieldsValue({
        itemArray: cascaderList,
      });
    }
  }, [cascaderList]);

  const getCategoryNameList = () => {
    const newObj = {};
    categoryList.forEach((item) => {
      newObj[item?.id] = item?.categoryName;
    });
    return newObj;
  };

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

  const getName = (data) => {
    let arr = data.map((item) => getCategoryNameList()?.[item] || '') || [];
    return arr.join('/');
  };

  return (
    <>
      <QueryFilter
        style={{ padding: 0 }}
        formRef={formRef}
        // layout="inline"
        labelWidth="auto"
        defaultCollapsed={false}
        span={12}
        collapsed={false}
        onValuesChange={(changeValues) => {
          dispatch({
            type: 'marketManage/updateState',
            payload: {
              cascaderList: changeValues.itemArray,
            },
          });
        }}
        onFinish={async () => {
          if (activeMarketId) {
            dispatch({
              type: 'marketManage/updateMarket',
              payload: {
                proTableRef,
              },
            });
          } else {
            message.warning('请先选中营销类目');
          }
        }}
        submitter={{
          // 配置按钮文本
          searchConfig: {
            submitText: '提交绑定',
          },
          submitButtonProps: {
            disabled: !activeMarketId,
          },
          // 配置按钮的属性
          resetButtonProps: {
            style: {
              // 隐藏重置按钮
              display: 'none',
            },
          },
        }}
      >
        <ProFormCascader
          fieldProps={{
            disabled: !activeMarketId,
            multiple: true,
            maxTagCount: 'responsive',
            showCheckedStrategy: SHOW_CHILD,
            options: options(),
          }}
          width="md"
          name="itemArray"
          label="关联后台类目"
        />
      </QueryFilter>
      <p style={{ color: 'rgba(0, 0, 0, 0.25)' }}>
        关联后台叶子类目后，所有该类目下的商品都会出现在前台类目中
      </p>
      <Space wrap>
        {cascaderList.map((item, index) => (
          <Space.Compact
            key={item?.slice(-1)?.[0]}
            style={{
              width: '100%',
            }}
          >
            <Input disabled defaultValue={getName(item)} />
            <Button
              type="default"
              onClick={() => {
                // modal.warning({
                //   autoFocusButton: null,
                //   closable: true,
                //   title: '确认删除',
                //   content: '确认要删除吗？',
                //   onOk: () => {
                dispatch({
                  type: 'marketManage/updateState',
                  payload: {
                    cascaderList: cascaderList.toSpliced(index, 1),
                  },
                });
                //   },
                // });
              }}
            >
              删除
            </Button>
          </Space.Compact>
        ))}
      </Space>
    </>
  );
};
