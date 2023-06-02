import { useSelections } from 'ahooks';
import { Checkbox, Empty, Pagination, Spin } from 'antd';
import { Fragment, forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';

const OrderTable = forwardRef(
  (
    {
      /** 表格列的配置描述  */
      columns = [],
      /** 数据数组  */
      dataSource = [],
      /** 分页器  */
      pagination,
      /** 商品列表字段  */
      productListCode = 'items',
      /** loading加载  */
      loading = false,
      /** 数据第一行渲染  */
      renderColumnHeader = null,
      /** 数据第一行操作渲染  */
      renderColumnOperate = null,
      /** 表格行 key 的取值  */
      rowKey = null,
      /** 表格行是否可选择 */
      rowSelection = false,
      /** 表格是否可滚动，也可以指定滚动区域的宽、高 */
      scroll = {},
    },
    ref,
  ) => {
    const { pageSize = 20, total = 0, pageNum = 1, goToPage = null, ...others } = pagination;
    const { selectedRow = [], onChange: onChangeSelection = null } = rowSelection;
    const defaultSelectedRow = useMemo(() => selectedRow, []);
    const hasData = useMemo(() => dataSource.length > 0, [dataSource]);
    const { selected, allSelected, isSelected, toggle, toggleAll, unSelectAll, partiallySelected } =
      useSelections(dataSource, defaultSelectedRow);

    useEffect(() => {
      onChangeSelection?.(selected);
    }, [onChangeSelection, selected]);

    useImperativeHandle(ref, () => {
      return {
        unSelectAll: unSelectAll,
        toggleAll: toggleAll,
      };
    });

    const tableContent = hasData ? (
      <tbody>
        {dataSource.map((row, key) => (
          <Fragment key={rowKey?.(row) || key}>
            {/* 订单信息行 */}
            <tr>
              <td
                style={{
                  padding: 12,
                  background: 'rgb(242, 247, 255)',
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
                    background: 'rgb(242, 247, 255)',
                  }}
                  colSpan={1}
                >
                  {renderColumnOperate(row)}
                </td>
              )}
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
          <div style={{ overflowY: 'scroll', maxHeight: scroll?.y ? scroll?.y : null }}>
            <table style={{ width: scroll?.x ? scroll?.x : '100%', minWidth: '100%' }}>
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
  },
);

export default memo(OrderTable);
