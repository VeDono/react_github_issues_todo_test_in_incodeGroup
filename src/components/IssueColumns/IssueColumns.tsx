import { FC } from 'react';
import { Row, Col } from 'antd';
import { IssueCards } from '../IssueCards';

import styles from './IssueColumns.module.scss';

export const IssueColumns: FC = () => {
  return (
    <Row className={styles.issueColumns} gutter={16}>
      <Col span={8}>
        <h1 className={styles.issueColumns__columnTitle}>Todo</h1>

        <IssueCards />
      </Col>

      <Col span={8}>
        <h1 className={styles.issueColumns__columnTitle}>In Progress</h1>

        <IssueCards />
      </Col>

      <Col span={8}>
        <h1 className={styles.issueColumns__columnTitle}>Done</h1>

        <IssueCards />
      </Col>
    </Row>
  );
};
