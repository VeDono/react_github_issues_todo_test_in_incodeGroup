import { FC } from 'react';
import { Card } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './IssueCards.module.scss';
import { useAppSelector } from '../../app/hooks';

interface Props {
  issuesId?: number[];
  columnType: 'todo' | 'inProgress' | 'done';
}

export const IssueCards: FC<Props> = ({ issuesId, columnType }) => {
  const issues = useAppSelector((state) => state.issues);

  const issuesForRender = issues.filter((issue) =>
    issuesId?.includes(issue.id),
  );

  return (
    <Droppable droppableId={columnType}>
      {(provided) => (
        <article
          className={styles.issuesCards}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {issuesForRender.map((issue, index) => (
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
                  Card content
                </Card>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </article>
      )}
    </Droppable>
  );
};
