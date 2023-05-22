import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal, Table, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { createGoods, deleteGoods, listGoods, updateGoods } from './api/goods'; // 假设有一个 API 文件夹，其中包含 CRUD 操作的函数

const Goods = () => {
  const [form] = Form.useForm();
  const [goodsList, setGoodsList] = useState([]);
  const [selectedGoods, setSelectedGoods] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchGroup, setSearchGroup] = useState('');
  const [searchOrderNumber, setSearchOrderNumber] = useState('');

  const filteredGoods = goodsList.filter(
    (goods) =>
      goods.name.includes(searchName) &&
      goods.group.includes(searchGroup) &&
      goods.order_number.includes(searchOrderNumber),
  );

  const columns = [
    {
      title: '商品 ID',
      fixed: 'left',
      width: 150,
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      width: 150,
      dataIndex: 'name',
    },
    {
      title: '商品分组',
      width: 150,
      dataIndex: 'group',
    },
    {
      title: '订单编号',
      width: 150,
      dataIndex: 'order_number',
    },
    {
      title: '已支付金额',
      width: 150,
      dataIndex: 'paid_amount',
    },
    {
      title: '封坛数量',
      width: 150,
      dataIndex: 'sealed_number',
    },
    {
      title: '封坛期限(月/坛)',
      width: 200,
      dataIndex: 'sealed_term',
    },
    {
      title: '创建时间',
      width: 150,
      dataIndex: 'created_time',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '客户名称',
      width: 150,
      dataIndex: 'customer_name',
    },
    {
      title: '手机号码',
      width: 150,
      dataIndex: 'phone_number',
    },
    {
      title: '操作',
      width: 150,
      fixed: 'right',

      dataIndex: 'operation',
      render: (_, record) => (
        <React.Fragment>
          <a
            onClick={() => {
              setSelectedGoods(record);
              setVisible(true);
              form.setFieldsValue(record);
            }}
          >
            详情
          </a>
          <Divider type="vertical" />
          <a
            type="link"
            onClick={() => {
              setSelectedGoods(record);
              setVisible(true);
              form.setFieldsValue(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              deleteGoods(record.id)
                .then(() => {
                  message.success('删除成功');
                  setGoodsList((prev) => prev.filter((item) => item.id !== record.id));
                })
                .catch((error) => {
                  message.error(`删除失败：${error.message}`);
                });
            }}
          >
            删除
          </a>
        </React.Fragment>
      ),
    },
  ];

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        const { ...data } = values;
        if (selectedGoods) {
          updateGoods(selectedGoods.id, data)
            .then(() => {
              message.success('更新成功');
              setVisible(false);
              setGoodsList((prev) => {
                const index = prev.findIndex((item) => item.id === selectedGoods.id);
                const newList = [...prev];
                newList[index] = { ...selectedGoods, ...data };
                return newList;
              });

              setSelectedGoods(null);
            })
            .catch((error) => {
              message.error(`更新失败：${error.message}`);
              setConfirmLoading(false);
            });
        } else {
          createGoods(data)
            .then((newGoods) => {
              message.success('添加成功');
              setVisible(false);
              setGoodsList((prev) => [...prev, newGoods]);
            })
            .catch((error) => {
              message.error(`添加失败：${error.message}`);
              setConfirmLoading(false);
            });
        }
      })
      .catch((error) => {
        message.error(`表单验证失败：${error.message}`);
      });
  };

  const handleSearch = () => {
    listGoods({
      name: searchName,
      group: searchGroup,
      order_number: searchOrderNumber,
    })
      .then((data) => {
        setGoodsList(data);
      })
      .catch((error) => {
        message.error(`搜索失败：${error.message}`);
      });
  };

  const resetSearch = () => {
    setSearchName('');
    setSearchGroup('');
    setSearchOrderNumber('');
    listGoods()
      .then((data) => {
        setGoodsList(data);
      })
      .catch((error) => {
        message.error(`获取商品列表失败：${error.message}`);
      });
  };

  useEffect(() => {
    listGoods()
      .then((data) => {
        setGoodsList(data);
      })
      .catch((error) => {
        message.error(`获取商品列表失败：${error.message}`);
      });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="请输入商品名称"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Input
          placeholder="请输入商品分组"
          value={searchGroup}
          onChange={(e) => setSearchGroup(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Input
          placeholder="请输入订单编号"
          value={searchOrderNumber}
          onChange={(e) => setSearchOrderNumber(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          查询
        </Button>
        <Button style={{ marginLeft: 16 }} onClick={resetSearch}>
          重置
        </Button>
      </div>
      <Table dataSource={filteredGoods} scroll={{ x: 1300 }} columns={columns} rowKey="id" />
      <Modal
        title={selectedGoods ? '编辑商品' : '添加商品'}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setSelectedGoods(null);
          form.resetFields();
        }}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical" initialValues={selectedGoods}>
          <Form.Item name="id" label="商品 ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="商品分组"
            rules={[{ required: true, message: '请输入商品分组' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="order_number"
            label="订单编号"
            rules={[{ required: true, message: '请输入订单编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="paid_amount"
            label="已支付金额"
            rules={[{ required: true, message: '请输入已支付金额' }]}
          >
            <Input type="number" min={0} step={0.01} />
          </Form.Item>
          <Form.Item
            name="sealed_number"
            label="封坛数量"
            rules={[{ required: true, message: '请输入封坛数量' }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="sealed_term"
            label="封坛期限(月/坛)"
            rules={[{ required: true, message: '请输入封坛期限' }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="customer_name"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="手机号码"
            rules={[{ required: true, message: '请输入手机号码' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Goods;
