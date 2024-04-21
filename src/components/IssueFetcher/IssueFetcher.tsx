import { FC, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';

import styles from './IssueFetcher.module.scss';
import { transformUrl } from '../../utils/transformUrl';
import { isGitHubLink } from '../../utils/isGitHubLink';
import { useAppDispatch } from '../../app/hooks';
import { set as issuesSet } from '../../features/issues/issuesSlice';
import { set as repoUrlSet } from '../../features/repoUrl/repoUrlSlice';
import { addIssue } from '../../features/columns/columnsSlice';
import { Issue } from '../../types/Issue';

export const IssueFetcher: FC = () => {
  const dispatch = useAppDispatch();
  const [hasUrlError, setHasUrlError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isGitHubLink(inputValue)) {
      setHasUrlError(true);

      return;
    }

    const apiUrl = transformUrl(inputValue);

    dispatch(repoUrlSet(inputValue));

    try {
      const { data }: { data: Issue[] } = await axios.get(apiUrl);

      dispatch(issuesSet(data));

      data.map((issue) => dispatch(addIssue(issue.id)));

      setInputValue('');
      setHasUrlError(false);
    } catch (error) {
      alert('Something went wrong during issues loading 😥');
    }

    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
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
