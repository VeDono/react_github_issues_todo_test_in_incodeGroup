/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';

import styles from './Breadcrumbs.module.scss';
import { useAppSelector } from '../../app/hooks';

import starIcon from '../../images/star.png';
import { truncateString } from '../../utils/truncateString';

export const Breadcrumbs: FC = () => {
  const { name, html_url, owner, stargazers_count } = useAppSelector(
    (state) => state.repo.repoData,
  );

  if (!name || !owner) {
    return (
      <div className={styles.breadcrumbs}>Waiting for your repository 😶‍🌫️</div>
    );
  }

  return (
    <div className={styles.breadcrumbs}>
      <a target="_blank" rel="noreferrer" href={owner.html_url}>
        {owner.login}
      </a>

      <span className={styles.breadcrumbs__nestSign}>&gt;</span>

      <a target="_blank" rel="noreferrer" href={html_url}>
        {truncateString(name, 12)}
      </a>

      {/* {!!stargazers_count && <span>{`${stargazers_count} stars`}</span>} */}
      <div className={styles.breadcrumbs__starContainer}>
        <img
          className={styles.breadcrumbs__starIcon}
          src={starIcon}
          alt="star"
        />
        <span
          className={styles.breadcrumbs__starsCount}
        >{`${stargazers_count} stars`}</span>
      </div>
    </div>
  );
};
