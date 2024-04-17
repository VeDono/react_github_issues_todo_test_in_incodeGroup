import { FC } from 'react';
import { Card } from 'antd';

import styles from './IssueCards.module.scss';

export const IssueCards: FC = () => {
  return (
    <article className={styles.issuesCards}>
      <Card className={styles.issuesCards__card} title="Card title">
        Card content
      </Card>

      <Card className={styles.issuesCards__card} title="Card title">
        Card content 2
      </Card>
    </article>
  );
};
