import { FC, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';

import styles from './IssueFetcher.module.scss';
import { transformUrl } from '../../utils/transformUrl';
import { isGitHubLink } from '../../utils/isGitHubLink';
import { useAppDispatch } from '../../app/hooks';
import { set as setIssues } from '../../features/issues/issuesSlice';
import {
  setRepoData,
  setRepoUrlAndClearColumns,
} from '../../features/repo/repoSlice';
import {
  addIssue,
  loadColumnsFromLocalStorage,
} from '../../features/columns/columnsSlice';
import { Issue } from '../../types/Issue';
import { RepoData } from '../../types/RepoData';
import {
  setLoadingTrue,
  setLoadingFalse,
} from '../../features/loading/loadingSlice';

export const IssueFetcher: FC = () => {
  const dispatch = useAppDispatch();
  const [hasUrlError, setHasUrlError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setLoadingTrue());

    if (!isGitHubLink(inputValue)) {
      setHasUrlError(true);

      return;
    }

    const apiIssuesUrl = transformUrl(inputValue, 'issues');
    const apiRepoUrl = transformUrl(inputValue, 'repo');

    dispatch(setRepoUrlAndClearColumns(inputValue));
    dispatch(loadColumnsFromLocalStorage());

    try {
      const issuesData: Issue[] = await (await axios.get(apiIssuesUrl)).data;
      const repoData: RepoData = await (await axios.get(apiRepoUrl)).data;

      dispatch(setIssues(issuesData));
      dispatch(setRepoData(repoData));

      issuesData.map((issue) => dispatch(addIssue(issue.id)));

      setInputValue('');
      setHasUrlError(false);
    } catch (error) {
      alert('Something went wrong during issues loading 😥');
      // eslint-disable-next-line no-console
      console.log(error);
    }

    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }

    dispatch(setLoadingFalse());
  };

  return (
    <form
      onBlur={() => setHasUrlError(!isGitHubLink(inputValue))}
      onSubmit={handlerSubmit}
      className={styles.issueFetcher}
    >
      <div className={styles.issueFetcher__inputWrapper}>
        <span
          className={cn(styles.issueFetcher__inputWrongMessage, {
            [styles['issueFetcher__inputWrongMessage--show']]: hasUrlError,
          })}
        >
          Invalid URL
        </span>

        <input
          className={cn(styles.issueFetcher__input, {
            [styles['issueFetcher__input--wrong']]: hasUrlError,
          })}
          name="repoUrl"
          type="text"
          placeholder="Enter repo URL"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className={cn(styles.issueFetcher__submitBtn, {
          [styles['issueFetcher__submitBtn--wrong']]: hasUrlError,
        })}
      >
        Load issues
      </button>
    </form>
  );
};
