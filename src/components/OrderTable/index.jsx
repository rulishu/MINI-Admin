import { Empty, Pagination, Spin } from 'antd';
import { Fragment } from 'react';

export default function OrderTable({
  columns = [],
  dataSource = [],
  pageSize,
  total,
  pageNum,
  goToPage,
  productListCode = 'itemList',
  loading = false,
  renderColumnHeader = null,
  rowKey = 'id',
}) {
  const hasData = dataSource.length > 0;

  const tableContent = hasData ? (
    <tbody>
      {dataSource.map((row) => (
        <Fragment key={row[rowKey]}>
          {/* 订单信息行 */}
          <tr>
            <td
              style={{
                padding: 15,
                background: 'rgb(242, 246, 255)',
              }}
              colSpan={columns.length}
            >
              {renderColumnHeader(row)}
            </td>
            {columns.map((col) => (
              <td key={col.key} />
            ))}
          </tr>

          {/* 产品信息行 */}
          {row[productListCode].map((product, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td
                  style={{
                    padding: 15,
                    borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
                  }}
                  key={col.key}
                >
                  {typeof col.render === 'function' ? col.render(product) : product[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </Fragment>
      ))}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td colSpan={columns.length} style={{ height: 200 }}>
          <Empty />
        </td>
      </tr>
    </tbody>
  );

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Spin
        spinning={loading}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <table style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: 'rgb(248, 248, 250)' }}>
              {columns.map((col) => (
                <th style={{ padding: 15 }} key={col.key}>
                  <span style={{ float: 'left' }}>{col.title}</span>
                </th>
              ))}
            </tr>
          </thead>
          {tableContent}
        </table>
        {hasData && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <Pagination
              showSizeChanger
              defaultPageSize={pageSize}
              defaultCurrent={pageNum}
              total={total}
              onChange={goToPage}
              showTotal={(total) => `第 ${pageNum}-${dataSource.length} 条/总共 ${total} 条`}
            />
          </div>
        )}
      </Spin>
    </div>
  );
}
