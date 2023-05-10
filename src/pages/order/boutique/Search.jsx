import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Cascader, Col, DatePicker, Form, Input, Row, Select } from 'antd';
const { RangePicker } = DatePicker;

const Search = () => {
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const residences = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            {
              value: 'xihu',
              label: '西湖',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京',
          children: [
            {
              value: 'zhonghuamen',
              label: '中华门',
            },
          ],
        },
      ],
    },
  ];

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 120,
        }}
      >
        <Option value="86">经销商名称</Option>
        <Option value="87">经销商id</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form
        layout="horizontal"
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
      >
        <Form.Item label="订单搜索">
          <Row>
            <Col span={7} style={{ marginRight: 8 }}>
              <Select
                defaultValue="jack"
                style={{
                  marginRight: 10,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'jack',
                    label: '订单编号',
                  },
                  {
                    value: 'lucy',
                    label: '买家会员编号',
                  },
                  {
                    value: 'Yiminghe',
                    label: '买家会员微信昵称',
                  },
                  {
                    value: 'disabled',
                    label: '收货人姓名',
                  },
                  {
                    value: 'mj',
                    label: '收货人手机号',
                  },
                  {
                    value: 'sh',
                    label: '发货快递单号',
                  },
                  {
                    value: 'zf',
                    label: '支付单号',
                  },
                ]}
              />
            </Col>
            <Col span={7} style={{ marginRight: 8 }}>
              <Input placeholder="输入订单编号和后六位数字" />
            </Col>
            <Col span={8}>
              <div style={{ fontWeight: 'bold', color: '#409EFF', marginTop: 6, marginBottom: 12 }}>
                批量输入订单
              </div>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="下单时间">
          <Row align="middle">
            <Col>
              <RangePicker />
            </Col>
            <Col>
              <ButtonGroupPro
                button={[
                  {
                    type: 'primary',
                    label: '今天',
                  },
                  {
                    type: 'primary',
                    label: '昨天',
                  },
                  {
                    type: 'primary',
                    label: '近7天',
                  },
                  {
                    type: 'primary',
                    label: '近30天',
                  },
                  {
                    type: 'primary',
                    label: '近半年',
                  },
                  {
                    type: 'primary',
                    label: '近一年',
                  },
                ]}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="时间类型">
          <Row>
            <Col span={8} style={{ marginRight: 8 }}>
              <Select
                defaultValue="jack"
                style={{
                  marginRight: 10,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'jack',
                    label: '订单编号',
                  },
                  {
                    value: 'lucy',
                    label: '买家会员编号',
                  },
                  {
                    value: 'Yiminghe',
                    label: '买家会员微信昵称',
                  },
                  {
                    value: 'disabled',
                    label: '收货人姓名',
                  },
                  {
                    value: 'mj',
                    label: '收货人手机号',
                  },
                  {
                    value: 'sh',
                    label: '发货快递单号',
                  },
                  {
                    value: 'zf',
                    label: '支付单号',
                  },
                ]}
              />
            </Col>
            <Col span={11} style={{ marginRight: 8 }}>
              <DatePicker /> 至 <DatePicker />
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Form
        layout="inline"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item label="商品ID">
          <Input placeholder="输入多个商品ID" />
        </Form.Item>
        <Form.Item label="商品名称">
          <Input placeholder="请输入商品名称" />
        </Form.Item>
        <Form.Item label="销售商搜索">
          <Input
            addonBefore={prefixSelector}
            placeholder="请输入销售商/简称"
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
      </Form>
      <Form layout="horizontal" style={{ marginTop: 20 }}>
        <Form.Item label="销售商分组">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '一组',
              },
              {
                value: 'Yiminghe',
                label: '二组',
              },
              {
                value: 'disabled',
                label: '三组',
              },
              {
                value: 'mj',
                label: '四组',
              },
              {
                value: 'sh',
                label: '五组',
              },
              {
                value: 'zf',
                label: '无分组',
              },
            ]}
          />
        </Form.Item>
      </Form>

      <Form
        layout="inline"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{ marginTop: 20 }}
      >
        <Form.Item label="订单状态">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '待付款',
              },
              {
                value: 'Yiminghe',
                label: '待审核',
              },
              {
                value: 'disabled',
                label: '待发货',
              },
              {
                value: 'mj',
                label: '部分发货',
              },
              {
                value: 'sh',
                label: '已发货',
              },
              {
                value: 'zf',
                label: '待提货',
              },
              {
                value: 'zf',
                label: '已完成',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="订单类型">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '默认订单',
              },
              {
                value: 'Yiminghe',
                label: '积分订单',
              },
              {
                value: 'disabled',
                label: '权益订单',
              },
              {
                value: 'mj',
                label: '代理订单',
              },
              {
                value: 'sh',
                label: '提货单',
              },
              {
                value: 'zf',
                label: '面对面付款',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="零元订单">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '非零元订单',
              },
              {
                value: 'Yiminghe',
                label: '赠品订单',
              },
              {
                value: 'disabled',
                label: '换货订单',
              },
              {
                value: 'mj',
                label: '补发订单',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="维权状态">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '无售后',
              },
              {
                value: 'Yiminghe',
                label: '买家申请退款',
              },
              {
                value: 'disabled',
                label: '买家申请退货退款',
              },
              {
                value: 'mj',
                label: '商家拒绝退款',
              },
              {
                value: 'sh',
                label: '待买家退货',
              },
              {
                value: 'zf',
                label: '待商家退货收货',
              },
              {
                value: 'th',
                label: '退款成功',
              },
            ]}
          />
        </Form.Item>
      </Form>
      <Form layout="horizontal" style={{ marginTop: 20 }}>
        <Form.Item label="订单性质">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '商家订单',
              },
              {
                value: 'Yiminghe',
                label: '销售商订单',
              },
            ]}
          />
        </Form.Item>
      </Form>
      <Form
        layout="inline"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{ marginTop: 20 }}
      >
        <Form.Item label="支付方式">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '微信支付',
              },
              {
                value: 'Yiminghe',
                label: '银联支付',
              },
              {
                value: 'disabled',
                label: '微信代销支付',
              },
              {
                value: 'mj',
                label: '支付宝支付',
              },
              {
                value: 'sh',
                label: '银行卡支付',
              },
              {
                value: 'zf',
                label: '货到付款',
              },
              {
                value: 'zf',
                label: '代付',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="发货信息">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '待发货',
              },
              {
                value: 'Yiminghe',
                label: '备货中',
              },
              {
                value: 'disabled',
                label: '已发货',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="配送方式">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '快递',
              },
              {
                value: 'Yiminghe',
                label: '到店自提',
              },
              {
                value: 'disabled',
                label: '无需物流',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="标签筛选">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '无标签',
              },
              {
                value: 'lucy',
                label: '一星',
              },
              {
                value: 'Yiminghe',
                label: '二星',
              },
              {
                value: 'disabled',
                label: '三星',
              },
              {
                value: 'mj',
                label: '四星',
              },
              {
                value: 'sh',
                label: '五星',
              },
            ]}
          />
        </Form.Item>
      </Form>
      <Form layout="horizontal" style={{ marginTop: 20 }}>
        <Form.Item label="订单来源">
          <Select
            defaultValue="jack"
            style={{
              marginRight: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '全部',
              },
              {
                value: 'lucy',
                label: '商家订单',
              },
              {
                value: 'Yiminghe',
                label: '商家订单-视频号',
              },
              {
                value: 'disabled',
                label: '微盟',
              },
              {
                value: 'mj',
                label: '小鹅通',
              },
              {
                value: 'sh',
                label: '商家订单-视频号小店',
              },
              {
                value: 'zf',
                label: '其他商城',
              },
              {
                value: 'qt',
                label: '商家订单-内容团购',
              },
            ]}
          />
        </Form.Item>
      </Form>
      <Form
        layout="inline"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{ marginTop: 20, marginBottom: 10 }}
      >
        <Form.Item label="店长会员编号">
          <Input placeholder="请输入店长会员编号" />
        </Form.Item>
        <Form.Item label="收货地址">
          <Cascader options={residences} placeholder="请选择" />
        </Form.Item>
      </Form>

      <ButtonGroupPro
        button={[
          {
            type: 'primary',
            label: '查询',
            // onClick: () => setStore({ ...store, visible: true }),
          },
          {
            label: '重置',
          },
          {
            label: '备货搜索订单',
            // onClick: () => setStore({ ...store, visible: true }),
          },
          {
            label: '取消备货',
          },
          {
            label: '导出搜索订货',
            // onClick: () => setStore({ ...store, visible: true }),
          },
          {
            type: 'link',
            label: '查看导出记录',
          },
          {
            type: 'link',
            label: '查看备货记录',
          },
        ]}
      />
    </>
  );
};
export default Search;
