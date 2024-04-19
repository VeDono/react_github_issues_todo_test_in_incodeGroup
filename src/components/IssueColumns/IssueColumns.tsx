import { FC } from 'react';
import { Row, Col } from 'antd';
import { IssueCards } from '../IssueCards';

import styles from './IssueColumns.module.scss';
import { useAppSelector } from '../../app/hooks';
import { DragDropContext } from 'react-beautiful-dnd';

export const IssueColumns: FC = () => {
  const todoIssuesId = useAppSelector((state) => state.columns.todo);

  const handleDragEnd = () => {
    // eslint-disable-next-line no-console
    console.log('Hell yeah!');
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Row className={styles.issueColumns} gutter={16}>
        <Col span={8}>
          <h1 className={styles.issueColumns__columnTitle}>Todo</h1>

          <IssueCards issuesId={todoIssuesId} />
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
    </DragDropContext>
  );
};
