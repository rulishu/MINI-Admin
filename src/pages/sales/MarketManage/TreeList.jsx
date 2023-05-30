import { CarryOutOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Form, Tree } from 'antd';
import { useEffect, useState } from 'react';

const TreeList = () => {
  const dispatch = useDispatch();
  const { marketManage } = useSelector((state) => state);
  const { marketTree } = marketManage;
  const [modalVisit, setModalVisit] = useState(false);
  const [modalData, setModalData] = useState({});

  const markets = (arr) => {
    return arr.map((item) => {
      const obj = {
        title: (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>{item?.marketingName}</span>
            <div>
              {item?.parentId === '0' && (
                <Button
                  type="link"
                  onClick={() => {
                    setModalData({ parentId: item?.id });
                    setModalVisit(true);
                  }}
                >
                  新增子类
                </Button>
              )}
              <Button type="link">删除</Button>
            </div>
          </div>
        ),
        key: item?.id,
        icon: <CarryOutOutlined />,
      };
      if (item?.child && item.child.length > 0) {
        obj.children = item.child.map((i) => ({
          title: (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{i?.marketingName}</span>
              <div>
                <Button
                  type="link"
                  onClick={() => {
                    dispatch({
                      type: 'marketManage/deleteMarket',
                      payload: {},
                    });
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          ),
          key: i?.id,
          switcherIcon: <FormOutlined />,
          isLeaf: true,
        }));
      }
      return obj;
    });
  };

  const [gData, setGData] = useState(markets(marketTree));

  useEffect(() => {
    if (marketTree && marketTree.length > 0) {
      setGData(markets(marketTree));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketTree]);

  const [form] = Form.useForm();

  const findItem = (data, node, parentItem) => {
    let findResult;
    data.find((item) => {
      if (item?.key === node?.key) {
        if (parentItem) {
          item.parent = parentItem;
          return (findResult = item);
        } else return (findResult = item);
      } else if (item?.children?.length) {
        return (findResult = findItem(item.children, node, item));
      }
    });
    return findResult;
  };
  // dropPosition -1是移动到和他平级在他上面    1是移动到和他平级在他下面  0是移动到他下面作为他子集
  const dealDrap = (dragNode, node, treeData, dropPosition) => {
    let dragNodeResult, nodeResult;
    dragNodeResult = findItem(treeData, dragNode);
    nodeResult = findItem(treeData, node);
    // 0是移动到他下面作为他子集
    if (dropPosition === 0) {
      if (dragNodeResult?.parent?.key === nodeResult?.key) return true;
      return false;
    }
    // -1是移动到和他平级在他上面    1是移动到和他平级在他下面
    if (dropPosition === 1 || dropPosition === -1) {
      // 都有父
      if (dragNodeResult?.parent && nodeResult?.parent) {
        // 父相等
        if (dragNodeResult?.parent?.key == nodeResult?.parent?.key) {
          return true;
        } else {
          return false;
        }
      }
      //有父无父
      if (dragNodeResult?.parent && !nodeResult?.parent) {
        return false;
      }
      // 无父有父
      if (!dragNodeResult?.parent && nodeResult?.parent) {
        return false;
      }
      if (!dragNodeResult?.parent && !nodeResult?.parent) {
        return true;
      }
    }
  };

  const onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    console.log('dropPosition: ', dropPosition);
    //
    const dealData = JSON.parse(JSON.stringify(gData));
    const result = dealDrap(info.dragNode, info.node, [...dealData], dropPosition);
    if (!result) return;
    //

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData].concat([]);

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
  };
  console.log('gData: ', gData);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setModalData({ parentId: 0 });
          setModalVisit(true);
        }}
      >
        <PlusOutlined />
        新建一级类目
      </Button>
      <Tree
        style={{ marginTop: 10 }}
        // showLine
        className="draggable-tree"
        draggable={{ icon: false }}
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
      />
      <ModalForm
        open={modalVisit}
        title={modalData?.parentId === 0 ? '新建一级类目' : '添加子类目'}
        layout="inline"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          dispatch({
            type: 'marketManage/addMarket',
            payload: {
              ...values,
              ...modalData,
            },
          });
          setModalVisit(false);
        }}
      >
        <ProFormText
          required
          placeholder="请输入类目名称"
          rules={[{ required: true, message: '这是必填项' }]}
          width="md"
          name="marketingName"
          label="类目名称"
        />
      </ModalForm>
    </>
  );
};
export default TreeList;
