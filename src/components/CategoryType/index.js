import { RightOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useSelector } from '@umijs/max';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

const TheBigCascader = (props) => {
  const { value, onChange } = props;

  const { groupManage } = useSelector((state) => state);
  const { categoryTree } = groupManage;

  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [outValue, setOutValue] = useState([]);

  useEffect(() => {
    if (categoryTree && categoryTree.length > 0) {
      const arr = [];
      categoryTree.forEach((item) => {
        if (item?.id !== '0') {
          arr.push(item);
        }
      });
      setList1(arr);
    }
  }, [categoryTree]);

  useEffect(() => {
    if (value) {
      const obj = categoryTree.find((item) => item?.id === value?.[0]);
      //
      if (obj?.children && obj?.children.length > 0) {
        setList2(arr2);
        const arr2 = obj?.children;
        const obj2 = arr2.find((item) => item?.id === value?.[1]);
        //
        if (obj2?.children && obj2?.children.length > 0) {
          const arr3 = obj2?.children;
          setList3(arr3);
        }
      }
      setOutValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onValueChange = (val) => {
    console.log('val: ', val);
    onChange(val);
  };

  // return (
  //   <div style={{ display: 'flex' }}>
  //     <div>
  //       {list1 && list1.length > 0 ? (
  //         list1.map((item) => (
  //           <div key={item?.id} aria-selected={true} className="ant-select-item-option-selected">
  //             <span>{item?.label}</span>
  //             <RightOutlined />
  //           </div>
  //         ))
  //       ) : (
  //         <Empty />
  //       )}
  //     </div>

  //     <div>
  //       <ul>
  //         {list1 && list1.length > 0 ? (
  //           list1.map((item) => (
  //             <li>
  //               <span>{item?.label}</span>
  //               <RightOutlined />
  //             </li>
  //           ))
  //         ) : (
  //           <Empty />
  //         )}
  //       </ul>
  //     </div>

  //     <div>
  //       <ul>
  //         {list1 && list1.length > 0 ? (
  //           list1.map((item) => (
  //             <li>
  //               <span>{item?.label}</span>
  //             </li>
  //           ))
  //         ) : (
  //           <Empty />
  //         )}
  //       </ul>
  //     </div>
  //   </div>
  // );

  return (
    <Row>
      <Col span={8} style={{ height: 300, overflowX: 'scroll' }}>
        <ProList
          className={`com-prolist`}
          rowClassName={(row) => (row.id === outValue?.[0] ? 'checked' : '')}
          split={true}
          showActions="hover"
          size="small"
          metas={{
            title: {
              dataIndex: 'label',
            },
            actions: {
              render: (_, record) => {
                return record?.children ? <RightOutlined /> : null;
              },
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                const newArr = [record?.id];
                setOutValue(newArr);
                onValueChange(newArr);
                setList2(record?.children);
                setList3([]);
              },
            };
          }}
          rowKey="id"
          dataSource={list1}
        />
      </Col>
      <Col span={8}>
        {list2 && list2.length > 0 && (
          <ProList
            className="com-prolist"
            rowClassName={(row) => (row.id === outValue?.[1] ? 'checked' : '')}
            split={true}
            size="small"
            showActions="hover"
            metas={{
              title: {
                dataIndex: 'label',
              },
              actions: {
                render: (_, record) => {
                  return record?.children ? <RightOutlined /> : null;
                },
              },
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  const newArr = outValue.concat([]);
                  newArr[1] = record?.id;
                  newArr.splice(2, 1);
                  setOutValue(newArr);
                  onValueChange(newArr);
                  setList3(record?.children);
                },
              };
            }}
            rowKey="id"
            dataSource={list2}
          />
        )}
      </Col>
      <Col span={8}>
        {list3 && list3.length > 0 && (
          <ProList
            className="com-prolist"
            rowClassName={(row) => (row.id === outValue?.[2] ? 'checked' : '')}
            split={true}
            showActions="hover"
            size="small"
            metas={{
              title: {
                dataIndex: 'label',
              },
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  const newArr = outValue.concat([]);
                  newArr[2] = record?.id;
                  setOutValue(newArr);
                  onValueChange(newArr);
                },
              };
            }}
            rowKey="id"
            dataSource={list3}
          />
        )}
      </Col>
    </Row>
  );
};
export default TheBigCascader;
