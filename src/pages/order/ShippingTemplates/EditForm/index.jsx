import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card, Divider, Form, InputNumber, Modal, Table, message } from 'antd';
import { useForm } from 'form-render';
import { useEffect, useMemo, useState } from 'react';
import { MultiCascader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const EditForm = () => {
  const dispatch = useDispatch();
  const { shippingtemplates, commonInterface } = useSelector((state) => state);
  const { addOpen, drawerParams, drawerType } = shippingtemplates;
  const { treeList } = commonInterface;

  const [isModalOpen, setIsModalOpen] = useState(false); // 选区弹窗
  const [disabledList, setDisabledList] = useState([]); // 禁用列表
  const [theAreaList, setIsList] = useState([]); // 选中区域列表
  const [assignedAreaTableList, setAssignedAreaList] = useState([]); // 指定地区运费列表
  const [editDataId, setEditDataId] = useState(''); // 编辑中的数据ID
  const [selectLabel, setSelectLabel] = useState(''); // 编辑中的数据ID

  const form = useForm();

  useEffect(() => {
    console.log('drawerParams, drawerType: ', drawerParams, drawerType);
    if (drawerType === 'edit' || drawerType === 'copy') {
      let parr = (drawerParams?.parentArray?.split(',') || []).concat([]);
      let level = drawerParams?.level;
      let leafOrder = drawerParams?.leafOrder || 1;
      if (drawerType === 'copy') {
        if (level === 1) {
          parr = [drawerParams?.id];
        }
        if (level === 2) {
          parr.push(drawerParams?.id);
          leafOrder = 1;
        }
        level = level + 1;
        form.setValues({ ...drawerParams, parr, level, categoryName: '', leafOrder });

        return;
      }
      form.setValues({ leafOrder: 1, ...drawerParams, parr, level });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerParams, drawerType]);

  const update = (data) => {
    dispatch({
      type: 'shippingtemplates/updateState',
      payload: data,
    });
  };

  const handlerCity = (data) => {
    const arr = [];
    data.forEach((item) => {
      const obj = { label: item?.areaName, value: item?.areaId };
      if (item?.children && item?.children.length > 0) {
        obj.children = handlerCity(item.children);
      }
      arr.push(obj);
    });

    return arr;
  };
  const cityTreeList = () => {
    if (treeList && treeList.length > 0) {
      return [...handlerCity(treeList)];
    } else {
      return [];
    }
  };

  const testingData = useMemo(() => [...cityTreeList()], [treeList]);

  const onFinish = (data) => {
    const { parr, ...others } = data;
    let searchParams = {
      ...others,
    };
    if (drawerType === 'edit') {
      dispatch({
        type: 'shippingtemplates/updateCategory',
        payload: { searchParams },
      });
    }
    if (drawerType === 'add') {
      const arr = parr.concat([]);
      searchParams.parentArray = parr.join();
      searchParams.parentId = parr.join() === '0' ? '0' : arr?.splice(-1)?.[0];
      searchParams.status = 1;
      dispatch({
        type: 'shippingtemplates/addCategory',
        payload: { searchParams },
      });
    }
    if (drawerType === 'copy') {
      const { level, categoryName, leafOrder } = searchParams;
      dispatch({
        type: 'shippingtemplates/addCategory',
        payload: {
          searchParams: {
            level,
            categoryName,
            leafOrder,
            parentArray: parr.join(),
            parentId: drawerParams?.id,
            status: 1,
          },
        },
      });
    }
  };

  return (
    <>
      <ModalForm
        title="新建模板"
        open={addOpen}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          width: 1000,
        }}
        onFinish={async () => {
          message.success('提交成功');
          update({ addOpen: false, drawerParams: {}, drawerType: '' });
          onFinish();
          return true;
        }}
        onOpenChange={(open) => {
          dispatch({
            type: 'shippingtemplates/updateState',
            payload: {
              addOpen: open,
            },
          });
        }}
        submitter={{
          searchConfig: {
            submitText: '保存',
            resetText: '取消',
          },
        }}
      >
        <ProFormText
          name="name"
          label="模板名称"
          required
          rules={[{ required: true, message: '模板名称不能为空' }]}
          // tooltip="最长为 24 位"
          placeholder="最多输入20个汉字（40字符）"
          fieldProps={{
            maxLength: 40,
          }}
        />
        <ProFormRadio.Group
          name="radio-group"
          label="计价方式"
          required
          rules={[{ required: true, message: '计价方式不能为空' }]}
          options={[
            {
              label: '按件数',
              value: 'a',
            },
            {
              label: '按重量',
              value: 'b',
              disabled: true,
            },
          ]}
        />
        <Form.Item
          className="form-item-freight"
          name="switch"
          label="运费计算"
          required
          rules={[{ required: true, message: '运费不能为空' }]}
        >
          <Freight showTooltip />
        </Form.Item>
        <Form.Item name="table" label=" " colon={false}>
          <Card size="small" bodyStyle={{ backgroundColor: 'rgb(242,242,242)', borderRadius: 8 }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>指定地区运费（可选）</span>
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                添加地区
              </Button>
            </div>
            {true && (
              <Table
                style={{ marginTop: 12 }}
                pagination={false}
                dataSource={assignedAreaTableList}
                columns={columns(setEditDataId)}
              />
            )}
          </Card>
        </Form.Item>
        <Form.Item name="switch" label="限售地区">
          <Card size="small" bodyStyle={{ backgroundColor: 'rgb(242,242,242)', borderRadius: 8 }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>收货地址在限售区域内的买家将无法完成下单</span>
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                添加地区
              </Button>
            </div>
            {true && (
              <Table
                style={{ marginTop: 12 }}
                pagination={false}
                dataSource={dataSource}
                columns={columns2(setEditDataId)}
              />
            )}
          </Card>
        </Form.Item>
      </ModalForm>
      {/* 选择区域 */}
      <Modal
        destroyOnClose
        title="运费地区设置"
        width={800}
        open={isModalOpen}
        onOk={() => {
          // 增加选中禁用
          const disArr = [];
          assignedAreaTableList.forEach((item) => {
            if (item?.selectList && item?.selectList.length > 0) {
              disArr.push(item?.selectList);
            }
          });
          disArr.push(theAreaList);
          setDisabledList(disArr);
          // 给表格数据赋值
          if (editDataId) {
            const theIndex = assignedAreaTableList.findIndex((item) => item?.id === editDataId);
            if (theIndex > -1) {
              const arr = assignedAreaTableList.concat([]);
              arr[theIndex]['selectList'] = theAreaList;
              arr[theIndex]['selectLabel'] = selectLabel;
              setAssignedAreaList(arr);
            } else {
              const arr = assignedAreaTableList.concat([]);
              arr.push({
                id: editDataId,
                selectList: theAreaList,
                selectLabel: selectLabel,
              });
              setAssignedAreaList(arr);
            }
          } else {
            const arr = assignedAreaTableList.concat([]);
            const now = new Date();
            const id = `${now.getTime()}_${assignedAreaTableList.length + 1}`;
            arr.push({
              id: id,
              selectList: theAreaList,
              selectLabel: selectLabel,
            });
            setAssignedAreaList(arr);
          }

          // 关闭后清空选中数据
          setIsModalOpen(false);
          setIsList([]);
          setSelectLabel('');
          setEditDataId('');
        }}
        onCancel={() => {
          setIsList([]);
          setIsModalOpen(false);
        }}
      >
        <div style={{ marginBottom: 12 }}>选择区域</div>
        <Card size="small" bodyStyle={{ borderRadius: 8 }}>
          <MultiCascader
            inline
            value={theAreaList}
            disabledItemValues={disabledList}
            data={testingData}
            searchable={false}
            menuHeight={300}
            menuWidth={240}
            onChange={(value) => {
              console.log('value: ', value);
              setIsList(value);
            }}
            // onCheck={(value, item, checked, event) => {
            //   console.log('value, item, checked, event: ', value, item, checked, event);
            // }}
          />
        </Card>
        <div style={{ marginTop: 12, marginBottom: 12 }}>已选择</div>
        <Card size="small">
          <MultiCascader
            value={theAreaList}
            plaintext
            block
            placeholder=""
            data={testingData}
            renderValue={(value, selectedItems) => {
              if (selectedItems?.length > 0) {
                setSelectLabel(selectedItems.map((item) => item.label).join(' , '));
              }
              return <span>{selectedItems.map((item) => item.label).join(' , ')}</span>;
            }}
          />
        </Card>
      </Modal>
    </>
  );
};

const Freight = ({ value, onChange, showTooltip = false }) => {
  const [allData, setAllData] = useState(value);

  return (
    <div>
      {showTooltip && (
        <div style={{ color: 'rgb(170,170,170)', marginBottom: 6 }}>
          除指定地区外，其余地区运费采用：“默认运费”
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showTooltip ? '默认运费：' : null}
        <InputNumber
          value={allData?.inPieces}
          onChange={(value) => {
            setAllData({ ...allData, inPieces: value });
            onChange({ ...allData, inPieces: value });
          }}
          precision={0}
          controls={false}
          min={1}
          max={999}
          style={{ width: 65 }}
          size="small"
        />
        件以内，
        <InputNumber
          value={allData?.inMoney}
          onChange={(value) => {
            setAllData({ ...allData, inMoney: value });
            onChange({ ...allData, inMoney: value });
          }}
          min={0.01}
          max={999.99}
          precision={2}
          controls={false}
          style={{ width: 65 }}
          size="small"
        />
        元， 每增加
        <InputNumber
          value={allData?.outPieces}
          onChange={(value) => {
            setAllData({ ...allData, outPieces: value });
            onChange({ ...allData, outPieces: value });
          }}
          precision={0}
          min={1}
          max={999}
          controls={false}
          style={{ width: 65 }}
          size="small"
        />
        件， 增加运费
        <InputNumber
          value={allData?.outMoney}
          onChange={(value) => {
            setAllData({ ...allData, outMoney: value });
            onChange({ ...allData, outMoney: value });
          }}
          min={0.01}
          max={999.99}
          precision={2}
          controls={false}
          style={{ width: 65 }}
          size="small"
        />
        元
      </div>
    </div>
  );
};

export default EditForm;

const columns = (setEditDataId) => [
  {
    title: '运送地区',
    dataIndex: 'selectLabel',
    key: 'selectLabel',
  },
  {
    title: '计费规则',
    dataIndex: 'age',
    key: 'age',
    render: () => (
      <Freight
        value={{}}
        onChange={(val) => {
          console.log('val: ', val);
        }}
      />
    ),
  },
  {
    title: '操作',
    dataIndex: 'address',
    key: 'address',
    render: () => {
      <div>
        <a
          type="link"
          size="small"
          onClick={(_, records) => {
            setEditDataId(records?.id);
          }}
        >
          修改地区
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => {}}>
          删除
        </a>
      </div>;
    },
  },
];
const columns2 = (setEditDataId) => [
  {
    title: '运送地区',
    dataIndex: 'selectLabel',
    key: 'selectLabel',
  },
  {
    title: '操作',
    dataIndex: 'address',
    key: 'address',
    render: (_, records) => {
      <div>
        <a
          type="link"
          size="small"
          onClick={() => {
            setEditDataId(records?.id);
          }}
        >
          修改地区
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => {}}>
          删除
        </a>
      </div>;
    },
  },
];

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];
