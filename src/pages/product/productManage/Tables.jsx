import {
  added,
  deleteProduct,
  details,
  selectSellPage,
  takeDown,
} from '@/service/goods/productManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, DatePicker, Form, Modal, Radio, Space, message } from 'antd';
import { useEffect, useRef } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [form] = Form.useForm();
  const { productManage, groupManage, loading } = useSelector((state) => state);
  const { activeKey, select, reload } = productManage;
  const { categoryTree, categoryList } = groupManage;

  const dispatch = useDispatch();

  useEffect(() => {
    if (reload) {
      ref?.current?.reload();
    }
  }, [reload]);

  /** 上架/下架/删除  */
  const {
    mutateAsync: uploadAsync,
    // isLoading: uploadLoading
  } = useReactMutation({
    mutationFn: added,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 下架
  const {
    mutateAsync: downAsync,
    //  isLoading: downLoading
  } = useReactMutation({
    mutationFn: takeDown,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 上传
  const {
    mutateAsync: deleteAsync,
    //  isLoading: delteLoading
  } = useReactMutation({
    mutationFn: deleteProduct,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 详情
  const { mutateAsync: selectById } = useReactMutation({
    mutationFn: details,
    contentType: 'form',
    method: 'GET',
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        dispatch({
          type: 'productManage/update',
          payload: {
            showForm: true,
            queryInfo: result,
          },
        });
      }
    },
  });

  const handleEdit = (type, record) => {
    const { selectedRowKeys } = select;
    // 新增
    if (type === 'add') {
      dispatch({
        type: 'productManage/update',
        payload: {
          showForm: true,
          // queryInfo: { categoryId: String(tabs) },
        },
      });
    }
    // 编辑
    if (type === 'edit' || type == 'view') {
      selectById({ id: record.id });
    }
    // 上架/下架/删除
    if (type === 'upload' || type === 'down' || type == 'delete') {
      let srks = record;
      if (!srks) {
        srks = selectedRowKeys;
      }
      if (srks.length !== 0) {
        updateModal(type, srks);
      } else {
        message.warning('请勾选商品');
      }
    }
    dispatch({
      type: 'productManage/update',
      payload: {
        type: type,
      },
    });
  };

  // const handlerSKU = (record) => {
  //   dispatch({
  //     type: 'productManage/update',
  //     payload: {
  //       queryInfo: record,
  //     },
  //   });

  //   dispatch({
  //     type: 'productManage/selectSKU',
  //     payload: record?.id,
  //   });
  // };

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

  const updateModal = (type, srks) => {
    const modal = Modal.info();
    if (type === 'upload') {
      modal.update({
        title: (
          <span style={{ color: 'RGB(26,158,215)' }}>
            {srks.length > 1 ? `确定批量上架选中的${srks.length}个商品吗?` : `确定上架该商品吗?`}
          </span>
        ),
        icon: null,
        content: (
          <div>
            <Form
              form={form}
              labelAlign="left"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              colon={false}
              layout="horizontal"
              style={{}}
              initialValues={{
                groundType: 1,
              }}
              onValuesChange={(changedValues, allValues) => {
                if (allValues?.groundType === 2) {
                  form.setFields([{ name: 'openTime', hidden: true }]);
                } else {
                  form.setFields([{ name: 'openTime', hidden: false }]);
                }
              }}
            >
              <Form.Item label="上架时间" name="groundType">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value={1}>立即上架</Radio>
                    <Radio value={2}>定时上架</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item label=" " name="openTime">
                <DatePicker
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Form>
          </div>
        ),
        maskClosable: true,
        closable: true,
        onCancel: () => {},
        footer: (
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
              style={{ margin: '0px 10px', color: 'RGB(170,170,170)' }}
              onClick={() => {
                modal.destroy();
              }}
            >
              取消
            </Button>
            <Button
              ghost
              style={{ color: 'white', backgroundColor: 'RGB(44,240,152)' }}
              onClick={() => {
                uploadAsync(
                  srks.map((item) => ({
                    id: item,
                    ...form.getFieldsValue(),
                  })),
                );
              }}
            >
              上架
            </Button>
          </div>
        ),
      });
    }
    if (type === 'down') {
      modal.update({
        title: (
          <span style={{ color: 'RGB(26,158,215)' }}>
            {srks.length > 1 ? `确定批量下架选中的${srks.length}个商品吗?` : `确定下架该商品吗?`}
          </span>
        ),
        icon: null,
        content: '下架商品将迁移入[仓库]中',
        maskClosable: true,
        closable: true,
        onCancel: () => {},
        footer: (
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
              style={{ margin: '0px 10px', color: 'RGB(170,170,170)' }}
              onClick={() => {
                modal.destroy();
              }}
            >
              取消
            </Button>
            <Button
              ghost
              style={{ color: 'white', backgroundColor: 'RGB(44,240,152)' }}
              onClick={() => {
                downAsync({ ids: srks });
              }}
            >
              下架
            </Button>
          </div>
        ),
      });
    }
    if (type === 'delete') {
      modal.update({
        title: <span style={{ color: 'red' }}>删除有风险，操作需谨</span>,
        content: (
          <div>
            <p>确定要删除这些商品吗？</p>
            {/* <p style={{ color: 'RGB(25,158,215)' }}>是否依旧删除？</p> */}
          </div>
        ),
        maskClosable: true,
        closable: true,
        cancelText: '取消',
        // cancelButtonProps: {
        //   ghost: true,
        //   style: { backgroundColor: 'RGB(44,240,152)' },
        // },
        onCancel: () => {},
        autoFocusButton: null,
        okText: '确定删除',
        // okType: 'default',
        onOk: () => {
          deleteAsync(srks);
        },
      });
    }
  };

  return (
    <ProTable
      className="the-pro-table"
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        console.log('params: ', params);
        const { current, pageSize, price, timerange, ...formData } = params;
        let status = {};
        // 出售中=== 已上架&&开售时间>=当前时间
        if (activeKey === '1') {
          status = { onShelf: 2 };
        }
        // 仓库中=== 待上架&&开售时间===null
        if (activeKey === '2') {
          status = { stock: 0 };
        }
        // 待开售=== 已上架&&开售时间<当前时间
        if (activeKey === '3') {
          status = { onShelf: 0 };
        }
        // 全部
        if (activeKey === '4') {
          status = {};
        }
        let body = {
          pageNum: current,
          pageSize,
          ...status,
          ...formData,
          minPrice: price?.[0],
          maxPrice: price?.[1],
          startTime: timerange ? `${timerange?.[0]} 00:00:00` : undefined,
          endTime: timerange ? `${timerange?.[1]} 23:59:59` : undefined,
        };
        if (formData?.categoryId && formData?.categoryId.length > 0) {
          body.categoryId = formData?.categoryId[formData?.categoryId.length - 1];
        }
        console.log('body: ', body);
        const { code, result } = await selectSellPage(body);
        if (code && code === 200) {
          dispatch({
            type: 'productManage/update',
            payload: {
              select: { selectedRowKeys: [], selectedRows: [] },
              reload: false,
            },
          });
          return {
            data: result.records || [],
            total: result.total,
            success: true,
          };
        }
      }}
      toolbar={{
        menu: {
          type: 'inline',
          activeKey: '__',
          items: [
            // {
            //   key: '3',
            //   label: `已选中${select?.selectedRowKeys?.length || 0}条数据`,
            // },
            {
              key: '1',
              label: (
                <Button
                  type="primary"
                  loading={loading.global}
                  disabled={!(select?.selectedRowKeys?.length > 0)}
                  onClick={() => handleEdit('delete')}
                >
                  批量删除
                </Button>
              ),
            },
            {
              key: '2',
              label: (
                <Button
                  type="primary"
                  disabled={!(select?.selectedRowKeys?.length > 0)}
                  loading={loading.global}
                  onClick={() => handleEdit('upload')}
                >
                  批量上架
                </Button>
              ),
            },
          ],
          // onChange: (key) => {
          //   dispatch({
          //     type: 'productManage/update',
          //     payload: {
          //       activeKey: key,
          //     },
          //   });
          //   ref?.current?.reload();
          // },
        },
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '新建商品',
                onClick: () => handleEdit('add'),
              },
              // {
              //   type: 'primary',
              //   label: '上架',
              //   loading: loading.global,
              //   onClick: () => handleEdit('upload'),
              //   disabled: activeKey !== '3',
              //   // loading: uploadLoading,
              // },
              // {
              //   type: 'primary',
              //   label: '下架',
              //   loading: loading.global,
              //   disabled: activeKey === '3' || activeKey === '2',
              //   onClick: () => handleEdit('down'),
              //   // loading: downLoading,
              // },
              // {
              //   type: 'primary',
              //   label: '删除',
              //   loading: loading.global,
              //   onClick: () => handleEdit('delete'),
              //   // loading: delteLoading,
              // },
              // // {
              // //   type: 'primary',
              // //   label: '改类目',
              // // },
            ]}
          />
        ),
      }}
      pagination={{
        showSizeChanger: true,
      }}
      cardBordered={true}
      columns={columns({ handleEdit, options, categoryList })}
      rowKey="id"
      rowSelection={{
        selectedRowKeys: select.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          dispatch({
            type: 'productManage/update',
            payload: {
              select: { selectedRowKeys: selectedRowKeys, selectedRows: selectedRows },
            },
          });
        },
      }}
      scroll={{ x: 1300 }}
    />
  );
}
