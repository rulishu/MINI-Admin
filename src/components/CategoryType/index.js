import { RightOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

const TheBigCascader = (props) => {
  const { categoryTree, value, onChange } = props;

  const onValueChange = () => {
    onChange(value);
  };

  const handler = (data) => {
    const arr = [];
    data.forEach((item) => {
      if (item?.id !== '0') {
        const obj = { label: item?.label || '', value: item?.id };
        if (item?.children && item?.children.length > 0) {
          obj.children = handler(item.children);
        }
        arr.push(obj);
      }
    });
    return arr;
  };

  const options = () => {
    if (categoryTree && categoryTree.length > 0) {
      return [...handler(categoryTree)];
    } else {
      return [];
    }
  };

  return (
    <Row>
      <Col span={8} style={{ height: 400, overflow: 'auto' }}>
        <ProList
          split={true}
          showActions="hover"
          metas={{
            title: {
              dataIndex: 'label',
            },
            actions: {
              render: () => {
                return [<RightOutlined />];
              },
            },
          }}
          onRow={(record) => {
            return {
              // onMouseEnter: () => {
              //   console.log(record);
              // },
              onClick: () => {
                console.log(record);
                onValueChange(record);
              },
            };
          }}
          rowKey="id"
          dataSource={options()}
        />
      </Col>
      <Col span={8} style={{ height: 400, overflow: 'auto' }}>
        <ProList
          split={true}
          showActions="hover"
          metas={{
            title: {
              dataIndex: 'label',
            },
            actions: {
              render: () => {
                return [<RightOutlined />];
              },
            },
          }}
          onRow={(record) => {
            return {
              // onMouseEnter: () => {
              //   console.log(record);
              // },
              onClick: () => {
                console.log(record);
              },
            };
          }}
          rowKey="id"
          dataSource={options()}
        />
      </Col>
      <Col span={8} style={{ height: 400, overflow: 'auto' }}>
        <ProList
          split={true}
          showActions="hover"
          metas={{
            title: {
              dataIndex: 'label',
            },
            // actions: {
            //   render: () => {
            //     return [<RightOutlined />];
            //   },
            // },
          }}
          onRow={(record) => {
            return {
              // onMouseEnter: () => {
              //   console.log(record);
              // },
              onClick: () => {
                console.log(record);
              },
            };
          }}
          rowKey="id"
          dataSource={options()}
        />
      </Col>
    </Row>
  );
};
export default TheBigCascader;
