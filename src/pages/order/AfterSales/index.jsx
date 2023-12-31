import { useDispatch, useLocation, useSelector } from '@umijs/max';
import { Card, Tabs } from 'antd';
import { useEffect } from 'react';
import Table from './Table';

const App = () => {
  const dispatch = useDispatch();
  const { activeKey, allAcount } = useSelector((state) => state.aftersales);
  const params = useLocation();

  useEffect(() => {
    dispatch({
      type: 'aftersales/getAfterSaleAcount',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValues = async () => {
    console.log('params', params);
    let obj = {};
    if (params?.state?.id) {
      obj = {
        orderNumber: params?.state?.orderNumber,
      };
      await dispatch({
        type: 'aftersales/update',
        payload: {
          searchForm: obj,
        },
      });
      await dispatch({
        type: 'aftersales/update',
        payload: {
          activeKey: '9',
        },
      });
    }
    await dispatch({
      type: 'aftersales/selectByPage',
    });
    window.history.replaceState({}, document.title);
  };

  useEffect(() => {
    setValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      key: '9',
      label: '全部',
      children: <Table key="9" />,
    },
    {
      key: '1',
      label: allAcount?.audit >= 0 ? `待审核(${allAcount?.audit})` : '待审核',
      children: <Table key="1" />,
    },
    {
      key: '2',
      label: allAcount?.refunding >= 0 ? `退款中(${allAcount?.refunding})` : `退款中`,
      children: <Table key="2" />,
    },
    {
      key: '3',
      label:
        allAcount?.waitingReturn >= 0 ? `待买家退货(${allAcount?.waitingReturn})` : `待买家退货`,
      children: <Table key="3" />,
    },
    {
      key: '4',
      label:
        allAcount?.waitingReceipt >= 0 ? `待平台收货(${allAcount?.waitingReceipt})` : `待平台收货`,
      children: <Table key="4" />,
    },
    {
      key: '5',
      label: allAcount?.refuse >= 0 ? `已拒绝售后(${allAcount?.refuse})` : `已拒绝售后`,
      children: <Table key="5" />,
    },
    {
      key: '6',
      label:
        allAcount?.returnRefuse >= 0
          ? `退货后平台拒绝(${allAcount?.returnRefuse})`
          : `退货后平台拒绝`,
      children: <Table key="6" />,
    },
    {
      key: '7',
      label: allAcount?.cancel >= 0 ? `已取消(${allAcount?.cancel})` : `已取消`,
      children: <Table key="7" />,
    },
    {
      key: '8',
      label: allAcount?.refund >= 0 ? `已退款(${allAcount?.refund})` : `已退款`,
      children: <Table key="8" />,
    },
  ];

  return (
    <Card size="small">
      <Tabs
        size="small"
        defaultActiveKey="1"
        activeKey={activeKey}
        // destroyInactiveTabPane
        items={items}
        onChange={(key) => {
          dispatch({
            type: 'aftersales/update',
            payload: {
              activeKey: key,
              // searchForm: {},
              pageSize: 10,
              pageNum: 1,
            },
          });
          dispatch({
            type: 'aftersales/selectByPage',
          });
        }}
      />
    </Card>
  );
};
export default App;
