/* eslint-disable max-len */
import { FC } from 'react';
import { Card } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { differenceInDays } from 'date-fns';

import styles from './IssueCards.module.scss';
import { useAppSelector } from '../../../app/hooks';

interface Props {
  issuesId?: number[];
  columnType: 'todo' | 'inProgress' | 'done';
}

export const IssueCards: FC<Props> = ({ issuesId, columnType }) => {
  const issues = useAppSelector((state) => state.issues);

  const issuesForRender =
    issuesId?.map((issueId) => issues.find((issue) => issue.id === issueId)) ||
    [];

  const currentTime = new Date();

  return (
    <Droppable droppableId={columnType}>
      {(provided) => (
        <article
          className={styles.issuesCards}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {issuesForRender.map(
            (issue, index) =>
              issue && (
                <Draggable
                  key={issue.id}
                  draggableId={String(issue.id)}
                  index={index}
                >
                  {(providedCard) => (
                    <Card
                      ref={providedCard.innerRef}
                      {...providedCard.draggableProps}
                      {...providedCard.dragHandleProps}
                      className={styles.issuesCards__card}
                      title={issue.title}
                    >
                      <div className={styles['issuesCards__card-content']}>
                        <div className={styles['issuesCards__card-row']}>
                          {`#${issue.number} opened ${differenceInDays(currentTime, issue.created_at)} days ago`}
                        </div>
                        <div
                          className={styles['issuesCards__card-row']}
                        >{`${issue.user.login} | Comments: ${issue.comments}`}</div>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ),
          )}
          {provided.placeholder}
        </article>
      )}
    </Droppable>
  );
};
