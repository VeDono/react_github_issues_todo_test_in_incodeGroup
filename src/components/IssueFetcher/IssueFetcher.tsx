import { FC } from 'react';
import axios from 'axios';

import styles from './IssueFetcher.module.scss';
import { transformUrl } from '../../utils/transformUrl';
import { useAppDispatch } from '../../app/hooks';
import { set as issuesSet } from '../../features/issues/issuesSlice';
import { Issue } from '../../types/Issue';
import { addIssue } from '../../features/columns/columnsSlice';

export const IssueFetcher: FC = () => {
  const dispatch = useAppDispatch();

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const repoUrl = (
      event.currentTarget.elements.namedItem('repoUrl') as HTMLInputElement
    ).value;

    const apiUrl = transformUrl(repoUrl);

    try {
      const { data }: { data: Issue[] } = await axios.get(apiUrl);

      dispatch(issuesSet(data));

      data.map((issue) => dispatch(addIssue(issue.id)));
    } catch (error) {
      alert('Something went wrong during issues loading 😥');
    }
  };

  return (
    <form onSubmit={handlerSubmit} className={styles.issueFetcher}>
      <input
        className={styles.issueFetcher__input}
        name="repoUrl"
        type="text"
        placeholder="Enter repo URL"
      />

      <button type="submit" className={styles.issueFetcher__submitBtn}>
        Load issues
      </button>
    </form>
  );
};
