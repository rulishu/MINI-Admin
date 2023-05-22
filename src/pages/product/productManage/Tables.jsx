import {
  added,
  deleteProduct,
  details,
  selectSellPage,
  takeDown,
} from '@/service/goods/productManage';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, DatePicker, Form, Modal, Radio, Space, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [form] = Form.useForm();
  const { productManage, groupManage, loading } = useSelector((state) => state);
  const { activeKey, select, reload, modalData, type, isModalOpen } = productManage;
  const { categoryTree, categoryList } = groupManage;

  const dispatch = useDispatch();

  const [srks, setSrks] = useState([]);
  console.log('dayjs: ', dayjs().format('YYYY-MM-DD HH:mm'), form.getFieldsValue());

  useEffect(() => {
    if (reload) {
      ref?.current?.reload();
    }
  }, [reload]);

  const onSuccess = ({ code }) => {
    if (code && code === 200) {
      setSrks([]);
      dispatch({
        type: 'productManage/update',
        payload: {
          isModalOpen: false,
        },
      });
      ref?.current?.reload();
    }
  };
  /** 上架/下架/删除  */
  const {
    mutateAsync: uploadAsync,
    // isLoading: uploadLoading
  } = useReactMutation({
    mutationFn: added,
    onSuccess: onSuccess,
  });

  // 下架
  const {
    mutateAsync: downAsync,
    //  isLoading: downLoading
  } = useReactMutation({
    mutationFn: takeDown,
    onSuccess: onSuccess,
  });

  // 删除
  const {
    mutateAsync: deleteAsync,
    //  isLoading: delteLoading
  } = useReactMutation({
    mutationFn: deleteProduct,
    onSuccess: onSuccess,
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
    dispatch({
      type: 'productManage/update',
      payload: {
        type: type,
      },
    });
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
      let newsrks = record;
      if (!newsrks && newsrks.length !== 1) {
        newsrks = selectedRowKeys;
      }
      if (newsrks.length !== 0) {
        setSrks(newsrks);
        dispatch({
          type: 'productManage/update',
          payload: {
            isModalOpen: true,
          },
        });
      } else {
        message.warning('请选择商品进行操作');
      }
    }
  };

  const handlerSKU = (record) => {
    dispatch({
      type: 'productManage/update',
      payload: {
        queryInfo: record,
      },
    });

    dispatch({
      type: 'productManage/selectSKU',
      payload: record?.id,
    });
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

  const handlerItem = () => {
    const delObj = {
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
    };
    const upObj = {
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
    };
    const downObj = {
      key: '3',
      label: (
        <Button
          type="primary"
          disabled={!(select?.selectedRowKeys?.length > 0)}
          loading={loading.global}
          onClick={() => handleEdit('down')}
        >
          批量下架
        </Button>
      ),
    };
    let arr = [];
    if (activeKey === '3' || activeKey === '1') {
      arr = [downObj, delObj];
    }
    if (activeKey === '2') {
      arr = [upObj, delObj];
    }
    return arr;
  };
  return (
    <>
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
            status = { onShelf: 2, groundType: 2 };
          }
          // 仓库中=== 待上架&&开售时间===null
          if (activeKey === '2') {
            status = { onShelf: 0 };
          }
          // 待开售=== 已上架&&开售时间<当前时间
          if (activeKey === '3') {
            status = { onShelf: 2, groundType: 1 };
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
            items: handlerItem(),
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
          // toolBarRender: handlerItem(),
          actions: (
            <Button type="primary" loading={loading.global} onClick={() => handleEdit('add')}>
              新建商品
            </Button>
          ),
        }}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns({ handleEdit, options, categoryList, handlerSKU })}
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
      <Modal
        open={isModalOpen}
        onCancel={() => {
          onSuccess({ code: 200 });
        }}
        title={
          <span style={{ color: 'RGB(26,158,215)' }}>
            {type === 'upload' &&
              (srks.length > 1 ? `确定批量上架选中的${srks.length}个商品吗?` : `确定上架该商品吗?`)}

            {type === 'down' &&
              (srks.length > 1 ? `确定批量下架选中的${srks.length}个商品吗?` : `确定下架商品吗?`)}

            {type === 'delete' &&
              (srks.length > 1 ? `确定批量删除选中的${srks.length}个商品吗?` : `确定删除商品?`)}
          </span>
        }
        footer={
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
              style={{ margin: '0px 10px', color: 'RGB(170,170,170)' }}
              onClick={() => {
                dispatch({
                  type: 'productManage/update',
                  payload: {
                    isModalOpen: false,
                    modalData: { groundType: 1 },
                  },
                });
              }}
            >
              取消
            </Button>
            <Button
              ghost
              style={{ color: 'white', backgroundColor: 'RGB(44,240,152)' }}
              onClick={() => {
                if (type === 'upload') {
                  uploadAsync(
                    srks.map((item) => ({
                      id: item,
                      ...form.getFieldsValue(),
                      openTime: form.getFieldsValue()?.openTime
                        ? dayjs(form.getFieldsValue()?.openTime).format('YYYY-MM-DD HH:mm:ss')
                        : null,
                    })),
                  );
                }

                if (type === 'down') {
                  downAsync({ ids: srks });
                }
                if (type === 'delete') {
                  deleteAsync({ ids: srks });
                }
              }}
            >
              {type === 'upload' && '上架'}
              {type === 'down' && '下架'}
              {type === 'delete' && '删除'}
            </Button>
          </div>
        }
      >
        <>
          {type === 'upload' && (
            <div>
              <Form
                form={form}
                labelAlign="left"
                preserve={false}
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
                  openTime: dayjs(),
                }}
                onValuesChange={(val, vals) => {
                  dispatch({
                    type: 'productManage/update',
                    payload: { modalData: vals },
                  });
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
                    disabled={modalData?.groundType === 1}
                    placeholder="请选择上架时间"
                    showTime={{
                      format: 'HH:mm',
                    }}
                    format="YYYY-MM-DD HH:mm"
                  />
                </Form.Item>
              </Form>
            </div>
          )}
          {type === 'down' && <p>下架商品将迁移入[仓库]中</p>}
          {type === 'delete' && <p>商品删除后不可见，请谨慎操作</p>}
        </>
      </Modal>
    </>
  );
}
