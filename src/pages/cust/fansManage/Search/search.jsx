import { ProFormRadio, ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-components';

export default function Search() {
  return (
    <div>
      <QueryFilter defaultCollapsed split>
        <ProFormText name="name" label="昵称" />
        <ProFormSelect name="level" label="性别" />
        <ProFormSelect name="source" label="用户身份" />
        <ProFormSelect name="label" label="购物偏好" />
        <ProFormSelect name="label" label="拉新能力" />
        <ProFormRadio name="label" label="无标签能力" />
      </QueryFilter>
    </div>
  );
}
