import AImage from '@/components/AImage';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import { Fragment } from 'react';
import { agentLevelStatus, beneficiaryLevelEnum } from '../enum';

const ProfitSharingUser = ({ record, width }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {record.headUrl ? (
        <Avatar src={record.headUrl} size="default" />
      ) : (
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      )}
      <div style={{ textAlign: 'left', marginLeft: 8, width: width - 50 }}>
        <div>
          <Typography.Text ellipsis="Miracle-" style={{ fontWeight: 'bold' }}>
            {record.beneficiary || '-'}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text
            ellipsis={` 经销等级：${
              (record.beneficiaryLevel && beneficiaryLevelEnum[record.beneficiaryLevel].text) || '-'
            }`}
            style={{ fontSize: '14px', color: '#ccc' }}
          >
            经销等级：
            {(record.beneficiaryLevel && beneficiaryLevelEnum[record.beneficiaryLevel].text) || '-'}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text
            ellipsis={`代理等级：${
              (record.beneficiaryAgentLevel &&
                agentLevelStatus[record.beneficiaryAgentLevel].text) ||
              '-'
            }`}
            style={{ fontSize: '14px', color: '#ccc' }}
          >
            代理等级：
            {(record.beneficiaryAgentLevel &&
              agentLevelStatus[record.beneficiaryAgentLevel].text) ||
              '-'}
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};
const ProfitSharingGoodComp = ({ record, amount }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        {' '}
        <AImage height={80} width={80} src={record.imageUrl} />
      </div>
      <div style={{ marginLeft: 12, width: 250 }}>
        <Typography.Text ellipsis={{ tooltip: record.itemName }} style={{ fontSize: '14px' }}>
          {record.itemName || '-'}
        </Typography.Text>
        <div style={{ fontSize: '14px', color: '#ccc' }}>
          {(record.attributes || []).map((item, i) => (
            <Fragment key={item.attributeId}>
              <span> {`${item.attributeName}:${item.value}`}</span>
              {i !== (record.attributes || []).length - 1 && <span>;</span>}
            </Fragment>
          ))}
        </div>
        <div style={{ fontSize: '14px' }}>x{amount || '-'}</div>
      </div>
    </div>
  );
};

export { ProfitSharingUser, ProfitSharingGoodComp };
