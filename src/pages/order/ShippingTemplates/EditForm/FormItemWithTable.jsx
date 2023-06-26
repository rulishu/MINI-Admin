import { ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card, Divider, Form, InputNumber, Table } from 'antd';
import { useState } from 'react';

const EditForm = () => {
  const dispatch = useDispatch();
  const { shippingtemplates } = useSelector((state) => state);
  const { assignedAreaTableList, disabledAreaTableList } = shippingtemplates;

  const update = (data) => {
    dispatch({
      type: 'shippingtemplates/updateState',
      payload: data,
    });
  };

  return (
    <>
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
        name="chargeMode"
        label="计价方式"
        required
        rules={[{ required: true, message: '计价方式不能为空' }]}
        options={[
          {
            label: '按件数',
            value: 1,
          },
          {
            label: '按重量',
            value: 2,
            disabled: true,
          },
        ]}
      />
      <Form.Item
        className="form-item-freight"
        name="freightObj"
        label="运费计算"
        required
        rules={[
          {
            validator: (_, value) => {
              if (
                value?.firstPart &&
                value?.freightCharge &&
                value?.continuedEmphasis &&
                value?.feesRenewal
              ) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('默认运费不能为空'));
            },
          },
        ]}
      >
        <Freight showTooltip />
      </Form.Item>
      <Form.Item name="_cansell_" label=" " colon={false}>
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
                // 增加禁用列表
                let disArr = [];

                assignedAreaTableList.forEach((item) => {
                  if (item?.selectList && item?.selectList.length > 0) {
                    disArr = disArr.concat(item?.selectList);
                  }
                });

                let unchecked = disArr.concat([]);
                disArr.forEach((item) => {
                  if (item.slice(-4) !== '0000') {
                    if (item.slice(-2) === '00') {
                      unchecked = unchecked.concat([`${item.slice(0, 2)}0000`]);
                    } else {
                      unchecked = unchecked.concat([
                        `${item.slice(0, 2)}0000`,
                        `${item.slice(0, 4)}00`,
                      ]);
                    }
                  }
                });

                update({ areaListType: 'can', disabledList: disArr, unchecked });
                //
                update({ isModalOpen: true });
              }}
            >
              添加地区
            </Button>
          </div>
          {/* {assignedAreaTableList.length > 0 && ( */}
          <Table
            rowKey="id"
            size="small"
            style={{ marginTop: 12 }}
            pagination={false}
            dataSource={assignedAreaTableList}
            columns={columns(update, assignedAreaTableList)}
          />
          {/* )} */}
        </Card>
      </Form.Item>
      {/* 限售 */}
      <Form.Item name="notsell" label="限售地区">
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
              disabled={disabledAreaTableList.length > 0}
              onClick={() => {
                update({ areaListType: 'not', disabledList: [], isModalOpen: true });
              }}
            >
              添加地区
            </Button>
          </div>
          {/* {disabledAreaTableList.length > 0 && ( */}
          <Table
            rowKey="id"
            size="small"
            style={{ marginTop: 12 }}
            pagination={false}
            dataSource={disabledAreaTableList}
            columns={columns2(update)}
          />
          {/* )} */}
        </Card>
      </Form.Item>
    </>
  );
};

export default EditForm;

const columns = (update, assignedAreaTableList) => [
  {
    title: '运送地区',
    dataIndex: 'selectLabel',
    key: 'selectLabel',
    ellipsis: true,
  },
  {
    title: '计费规则',
    dataIndex: 'age',
    key: 'age',
    width: 530,
    render: (_, records, index) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InputNumber
          value={records?.firstPart}
          onChange={(value) => {
            const arr = assignedAreaTableList.concat([]);
            arr[index]['firstPart'] = value;
            update({ assignedAreaTableList: arr });
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
          value={records?.freightCharge}
          onChange={(value) => {
            const arr = assignedAreaTableList.concat([]);
            arr[index]['freightCharge'] = value;
            update({ assignedAreaTableList: arr });
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
          value={records?.continuedEmphasis}
          onChange={(value) => {
            const arr = assignedAreaTableList.concat([]);
            arr[index]['continuedEmphasis'] = value;
            update({ assignedAreaTableList: arr });
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
          value={records?.feesRenewal}
          onChange={(value) => {
            const arr = assignedAreaTableList.concat([]);
            arr[index]['feesRenewal'] = value;
            update({ assignedAreaTableList: arr });
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
    ),
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'id',
    with: 135,
    render: (_, records) => (
      <div style={{ display: 'flex' }}>
        <a
          type="link"
          size="small"
          style={{ wordBreak: 'keep-all' }}
          onClick={() => {
            const arr = assignedAreaTableList.filter((item) => {
              item?.id !== records?.id;
            });
            let disArr = [];
            arr.forEach((item) => {
              if (item?.selectList && item?.selectList.length > 0) {
                disArr = disArr.concat(item?.selectList);
              }
            });

            let unchecked = disArr.concat([]);
            disArr.forEach((item) => {
              if (item.slice(-4) !== '0000') {
                if (item.slice(-2) === '00') {
                  unchecked = unchecked.concat([`${item.slice(0, 2)}0000`]);
                } else {
                  unchecked = unchecked.concat([
                    `${item.slice(0, 2)}0000`,
                    `${item.slice(0, 4)}00`,
                  ]);
                }
              }
            });
            update({
              areaListType: 'can',
              editAreaId: records?.id,
              disabledList: disArr,
              unchecked,
            });
            update({ isModalOpen: true });
          }}
        >
          修改地区
        </a>
        <Divider type="vertical" />
        <a type="link" style={{ wordBreak: 'keep-all' }} size="small" onClick={() => {}}>
          删除
        </a>
      </div>
    ),
  },
];
const columns2 = (update) => [
  {
    title: '运送地区',
    dataIndex: 'selectLabel',
    key: 'selectLabel',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: '_op_',
    key: '_op_',
    with: 135,
    render: (_, records) => {
      <div>
        <a
          type="link"
          style={{ wordBreak: 'keep-all' }}
          size="small"
          onClick={() => {
            update({ areaListType: 'not', editAreaId: records?.id });
            update({ isModalOpen: true });
          }}
        >
          修改地区
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" style={{ wordBreak: 'keep-all' }} onClick={() => {}}>
          删除
        </a>
      </div>;
    },
  },
];

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
          value={allData?.firstPart}
          onChange={(value) => {
            setAllData({ ...allData, firstPart: value });
            onChange({ ...allData, firstPart: value });
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
          value={allData?.freightCharge}
          onChange={(value) => {
            setAllData({ ...allData, freightCharge: value });
            onChange({ ...allData, freightCharge: value });
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
          value={allData?.continuedEmphasis}
          onChange={(value) => {
            setAllData({ ...allData, continuedEmphasis: value });
            onChange({ ...allData, continuedEmphasis: value });
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
          value={allData?.feesRenewal}
          onChange={(value) => {
            setAllData({ ...allData, feesRenewal: value });
            onChange({ ...allData, feesRenewal: value });
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
