import { FC } from 'react';
import { Row, Col } from 'antd';
import { IssueCards } from '../IssueCards';

export const IssueColumns: FC = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <h1>Todo</h1>

        <IssueCards />
      </Col>

      <Col span={8}>
        <h1>In Progress</h1>

        <IssueCards />
      </Col>

      <Col span={8}>
        <h1>Done</h1>

        <IssueCards />
      </Col>
    </Row>
  );
};
