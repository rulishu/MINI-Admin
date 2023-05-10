import { SmileTwoTone } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Col, Row } from 'antd';
import React from 'react';

const data = [
  {
    id: 1,
    title: '热门应用推荐',
    children: [
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
    ],
  },
  {
    id: 2,
    title: '丰富的营销工具，助力吸粉、获客、裂变、转化...',
    children: [
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
    ],
  },
  {
    id: 3,
    title: '培训模块专有营销玩法',
    children: [
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
        title: '社区自动推品助手',
        des: '主群一键设置，分群自动跟发，效率翻倍，收益翻倍！',
      },
    ],
  },
];
export default () => {
  return (
    <React.Fragment>
      {data.map((item) => (
        <ProCard
          key={item.id}
          style={{ marginBlockStart: 8 }}
          gutter={[8, 8]}
          wrap
          title={
            <Row gutter={8}>
              <Col>
                <SmileTwoTone />
              </Col>
              <Col>
                <span>{item.title}</span>
              </Col>
            </Row>
          }
        >
          {item.children.map((value, i) => (
            <ProCard
              key={i}
              colSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
              layout="start"
              bordered
            >
              <Row gutter={8} style={{ alignItems: 'center' }}>
                <Col span={4}>
                  <Avatar src={value.img} />
                </Col>
                <Col span={20}>
                  <h4>{value.title}</h4>
                  <p style={{ color: '#999' }}>{value.des}</p>
                </Col>
              </Row>
            </ProCard>
          ))}
        </ProCard>
      ))}
    </React.Fragment>
  );
};
