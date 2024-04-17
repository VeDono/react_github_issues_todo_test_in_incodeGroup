import { FC } from 'react';

import styles from './IssueFetcher.module.scss';

export const IssueFetcher: FC = () => {
  return (
    <form className={styles.issueFetcher}>
      <input
        className={styles.issueFetcher__input}
        type="text"
        placeholder="Enter repo URL"
      />

      <button type="submit" className={styles.issueFetcher__submitBtn}>
        Load issues
      </button>
    </form>
  );
};
