import { useSelections } from 'ahooks';
import { Checkbox, Empty, Pagination, Spin } from 'antd';
import { Fragment, useEffect } from 'react';

export default function OrderTable({
  columns = [],
  dataSource = [],
  pagination,
  productListCode = 'items',
  loading = false,
  renderColumnHeader = null,
  renderColumnOperate = null,
  rowKey = null,
  rowSelection = false,
}) {
  const { pageSize = 20, total = 0, pageNum = 1, goToPage = null, ...others } = pagination;
  const { selectedRow = [], onChange: onChangeSelection = null } = rowSelection;

  const { selected, allSelected, isSelected, toggle, toggleAll, partiallySelected } = useSelections(
    dataSource,
    selectedRow,
  );

  useEffect(() => {
    onChangeSelection?.(selected);
  }, [onChangeSelection, selected]);

  const hasData = dataSource.length > 0;

  const tableContent = hasData ? (
    <tbody>
      {dataSource.map((row, key) => (
        <Fragment key={rowKey?.(row) || key}>
          {/* 订单信息行 */}
          <tr>
            <td
              style={{
                padding: 12,
                background: 'rgb(242, 246, 255)',
              }}
              colSpan={renderColumnOperate ? columns.length - 1 : columns.length}
            >
              {rowSelection && (
                <Checkbox
                  checked={isSelected(row)}
                  onClick={() => {
                    toggle(row);
                  }}
                  style={{ marginRight: 8 }}
                />
              )}
              {renderColumnHeader(row)}
            </td>
            {renderColumnOperate && (
              <td
                style={{
                  padding: 12,
                  background: 'rgb(242, 246, 255)',
                }}
                colSpan={1}
              >
                {renderColumnOperate(row)}
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} />
            ))}
          </tr>

          {/* 产品信息行 */}
          {(row[productListCode] || []).map((product, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td
                  style={{
                    padding: 12,
                    borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
                  }}
                  key={col.key}
                >
                  {typeof col.render === 'function'
                    ? col.render(product, row, key)
                    : product[col.dataIndex]}
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
        <div style={{ height: 'calc(100% - 48px)', overflow: 'auto' }}>
          <table style={{ width: 'fit-content', minWidth: '100%' }}>
            <thead>
              <tr style={{ background: 'rgb(248, 248, 250)' }}>
                {columns.map((col, idx) => (
                  <th style={{ padding: 12, width: col.width || 'auto' }} key={col.key}>
                    <span style={{ float: 'left' }}>
                      {idx === 0 && rowSelection && (
                        <Checkbox
                          checked={allSelected}
                          onClick={toggleAll}
                          indeterminate={partiallySelected}
                          style={{ marginRight: 8 }}
                        />
                      )}
                      {col.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            {tableContent}
          </table>
        </div>

        {hasData && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <Pagination
              showSizeChanger
              defaultPageSize={pageSize}
              defaultCurrent={pageNum}
              total={total}
              onChange={goToPage}
              showTotal={(total) => `第 ${pageNum}-${dataSource.length} 条/总共 ${total} 条`}
              {...others}
            />
          </div>
        )}
      </Spin>
    </div>
  );
}
