import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Form, Tree } from 'antd';
import { useEffect, useState } from 'react';
const { DirectoryTree } = Tree;

const TreeList = () => {
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const { marketManage } = useSelector((state) => state);
  const { marketTree, activeMarketId } = marketManage;
  const [modalVisit, setModalVisit] = useState(false);
  const [modalData, setModalData] = useState({});

  const markets = (arr) => {
    return arr.map((item) => {
      const obj = {
        title: item?.marketingName,
        key: item?.id,
        parentId: item?.parentId,
        sort: item?.sort,
        disabled: true,
      };
      if (item?.child && item.child.length > 0) {
        obj.children = item.child.map((i) => ({
          title: i?.marketingName,
          key: i?.id,
          parentId: i?.parentId,
          sort: i?.sort,
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
    console.log('GDatadata: ', data);
    setGData(data);

    dispatch({
      type: 'marketManage/moveMarket',
      payload: { gData: data },
    });
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 10 }}
        onClick={() => {
          setModalData({ parentId: 0 });
          setModalVisit(true);
        }}
      >
        <PlusOutlined />
        新建一级类目
      </Button>
      <DirectoryTree
        // showLine
        defaultExpandAll
        defaultSelectedKeys={[activeMarketId]}
        className="draggable-tree"
        draggable={{ icon: false }}
        blockNode
        icon={null}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
        filterTreeNode={(node) => node?.key === activeMarketId}
        onSelect={(selectedKeys, e) => {
          const { selectedNodes } = e;
          if (selectedNodes?.[0]?.parentId !== '0') {
            dispatch({
              type: 'marketManage/updateState',
              payload: { activeMarketId: selectedKeys?.[0] },
            });
          }
        }}
        titleRender={(nodeData) => (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>{nodeData?.title}</span>
            <span
              style={{
                marginLeft: 10,
                whiteSpace: 'nowrap',
              }}
            >
              {nodeData?.parentId === '0' && (
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalData({ parentId: nodeData?.key });
                    setModalVisit(true);
                  }}
                >
                  新增子类
                </a>
              )}
              <a
                style={{ marginLeft: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  modal.warning({
                    title: '删除',
                    maskClosable: true,
                    autoFocusButton: false,
                    content: '确认要删除吗？',
                    okText: '删除',
                    onOk: () => {
                      dispatch({
                        type: 'marketManage/deleteMarket',
                        payload: {
                          id: nodeData?.key,
                        },
                      });
                    },
                  });
                }}
              >
                删除
              </a>
            </span>
          </div>
        )}
      />
      <ModalForm
        open={modalVisit}
        title={modalData?.parentId === 0 ? '新建一级类目' : '添加子类目'}
        layout="Horizontal"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setModalVisit(false),
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
