import { Card } from 'antd';
import Edit from './Edit';
import SearchTable from './SearchTable';

export default function Page() {
  return (
    <div>
      <Card>
        <strong style={{ fontSize: 18 }}>批量发货</strong>
        <p> 批量发货目前暂不支持第三方平台订单批量发货。</p>
        <p>
          1、不需要对订单拆分包裹发货（订单只需发一个包裹），在表格中填写同一个物流单号。再上传。
        </p>
        <p>
          2、需要对订单拆分多包裹发货（订单需发多个包裹），在表格中对拆分的子订单号填写不同的物流单号。再上传。
        </p>
        <p>
          3、批量发货支持对任意数量的商品拆分成多包裹发货。如：订单中有A商品1件，需要发3个包裹；则在发货模板中，将A商品的信息复制3条，填入3个不同的运单号，上传即可。多个商品多包裹发货，同样操作。
        </p>
        <p> 4、批量发货无需物流，在表格中只需要填写订单号和子订单号即可</p>
      </Card>
      <SearchTable />
      <Edit />
    </div>
  );
}
