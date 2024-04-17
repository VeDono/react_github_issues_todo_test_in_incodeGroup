import { FC } from 'react';

import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: FC = () => {
  return (
    <div className={styles.breadcrumbs}>
      {'Facebook > React   *194 K stars'}
    </div>
  );
};
