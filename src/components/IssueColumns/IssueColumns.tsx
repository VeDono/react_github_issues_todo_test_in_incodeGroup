import { FC } from 'react';
import { Row, Col } from 'antd';
import { IssueCards } from '../IssueCards';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import styles from './IssueColumns.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { moveIssue } from '../../features/columns/columnsSlice';
import { ColumnsInitialStateType } from '../../types/ColumnsInitialStateType';

export const IssueColumns: FC = () => {
  const issuesColumns = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // eslint-disable-next-line no-console
    console.log(result);

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const payload = {
      issueId: Number(draggableId),
      from: source.droppableId as keyof ColumnsInitialStateType,
      to: destination.droppableId as keyof ColumnsInitialStateType,
    };

    dispatch(moveIssue(payload));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Row className={styles.issueColumns} gutter={16}>
        <Col span={8}>
          <h1 className={styles.issueColumns__columnTitle}>Todo</h1>

          <IssueCards columnType="todo" issuesId={issuesColumns.todo} />
        </Col>

        <Col span={8}>
          <h1 className={styles.issueColumns__columnTitle}>In Progress</h1>

          <IssueCards
            columnType="inProgress"
            issuesId={issuesColumns.inProgress}
          />
        </Col>

        <Col span={8}>
          <h1 className={styles.issueColumns__columnTitle}>Done</h1>

          <IssueCards columnType="done" issuesId={issuesColumns.done} />
        </Col>
      </Row>
    </DragDropContext>
  );
};
