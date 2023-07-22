import { ExclamationCircleFilled } from '@ant-design/icons';
import { ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card, Divider, Form, InputNumber, Modal, Table, Tooltip } from 'antd';
import Freight from './Freight';
const { confirm } = Modal;

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
        placeholder="最多输入20个汉字"
        fieldProps={{
          maxLength: 20,
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
                value?.freightCharge >= 0 &&
                value?.continuedEmphasis &&
                value?.feesRenewal >= 0
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
                disabledAreaTableList.forEach((item) => {
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
          {assignedAreaTableList.length > 0 && (
            <Table
              rowKey="id"
              size="small"
              style={{ marginTop: 12, width: '100%' }}
              pagination={false}
              dataSource={assignedAreaTableList}
              columns={columns(update, assignedAreaTableList, confirm, disabledAreaTableList)}
            />
          )}
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
                // 增加禁用列表
                let disArr = [];
                assignedAreaTableList.forEach((item) => {
                  if (item?.selectList && item?.selectList.length > 0) {
                    disArr = disArr.concat(item?.selectList);
                  }
                });
                disabledAreaTableList.forEach((item) => {
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
                update({ areaListType: 'not', disabledList: disArr, unchecked, isModalOpen: true });
              }}
            >
              添加地区
            </Button>
          </div>
          {disabledAreaTableList.length > 0 && (
            <Table
              rowKey="id"
              size="small"
              style={{ marginTop: 12, width: '100%' }}
              pagination={false}
              dataSource={disabledAreaTableList}
              columns={columns2(update, confirm, disabledAreaTableList, assignedAreaTableList)}
            />
          )}
        </Card>
      </Form.Item>
    </>
  );
};

export default EditForm;

const columns = (update, assignedAreaTableList, confirm, disabledAreaTableList) => [
  {
    title: '运送地区',
    dataIndex: 'selectLabel',
    key: 'selectLabel',
    width: 167,
    render: (txt) =>
      txt?.length > 30 ? (
        <Tooltip placement="topLeft" title={txt}>
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              WebkitLineClamp: 2,
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {txt}
          </div>
        </Tooltip>
      ) : (
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {txt}
        </div>
      ),
  },
  {
    title: '计费规则',
    dataIndex: 'age',
    key: 'age',
    width: 520,
    render: (_, records, index) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InputNumber
          status={records?.firstPart ? null : 'error'}
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
          status={records?.freightCharge >= 0 ? null : 'error'}
          value={records?.freightCharge}
          onChange={(value) => {
            const arr = assignedAreaTableList.concat([]);
            arr[index]['freightCharge'] = value;
            update({ assignedAreaTableList: arr });
          }}
          min={0}
          max={999.99}
          precision={2}
          controls={false}
          style={{ width: 65 }}
          size="small"
        />
        元， 每增加
        <InputNumber
          status={records?.continuedEmphasis ? null : 'error'}
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
          status={records?.feesRenewal >= 0 ? null : 'error'}
          value={records?.feesRenewal}
          onChange={(value) => {
            const arr = assignedAreaTableList.concat([]);
            arr[index]['feesRenewal'] = value;
            update({ assignedAreaTableList: arr });
          }}
          min={0}
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
    with: 120,
    render: (_, records, index) => (
      <div style={{ display: 'flex' }}>
        <a
          type="link"
          size="small"
          style={{ wordBreak: 'keep-all' }}
          onClick={() => {
            const arr = assignedAreaTableList.filter((item) => item?.id !== records?.id);
            let disArr = [];
            arr.forEach((item) => {
              if (item?.selectList && item?.selectList.length > 0) {
                disArr = disArr.concat(item?.selectList);
              }
            });
            disabledAreaTableList.forEach((item) => {
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
            //
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
        <a
          type="link"
          style={{ wordBreak: 'keep-all' }}
          size="small"
          onClick={() => {
            confirm({
              title: '确定要删除这条数据吗?',
              icon: <ExclamationCircleFilled />,
              centered: true,
              onOk() {
                const arr = assignedAreaTableList.concat([]);
                arr.splice(index, 1);
                update({ assignedAreaTableList: arr });
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}
        >
          删除
        </a>
      </div>
    ),
  },
];
const columns2 = (update, confirm, disabledAreaTableList, assignedAreaTableList) => [
  {
    title: '运送地区',
    dataIndex: 'selectLabel',
    key: 'selectLabel',
    width: 687,
    render: (txt) =>
      txt?.length > 145 ? (
        <Tooltip placement="topLeft" title={txt}>
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              WebkitLineClamp: 2,
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {txt}
          </div>
        </Tooltip>
      ) : (
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {txt}
        </div>
      ),
  },
  {
    title: '操作',
    dataIndex: '_op_',
    key: '_op_',
    with: 120,
    render: (_, records, index) => (
      <div>
        <a
          type="link"
          style={{ wordBreak: 'keep-all' }}
          size="small"
          onClick={() => {
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
            update({
              areaListType: 'not',
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
        <a
          type="link"
          size="small"
          style={{ wordBreak: 'keep-all' }}
          onClick={() => {
            confirm({
              title: '确定要删除这条数据吗?',
              icon: <ExclamationCircleFilled />,
              centered: true,
              onOk() {
                const arr = disabledAreaTableList.concat([]);
                arr.splice(index, 1);
                update({ disabledAreaTableList: arr });
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}
        >
          删除
        </a>
      </div>
    ),
  },
];
