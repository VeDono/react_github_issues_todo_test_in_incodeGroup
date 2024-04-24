import cn from 'classnames';

import styles from './App.module.scss';
import { Breadcrumbs } from './components/Breadcrumbs';
import { IssueColumns } from './components/IssueColumns';
import { IssueFetcher } from './components/IssueFetcher';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';

function App() {
  const { isLoading } = useAppSelector((state) => state.loading);

  return (
    <section className={styles.application}>
      <div className={styles.application__wrapper}>
        <article
          className={cn(styles.application__loader, {
            [styles['application__loader--visible']]: isLoading === true,
          })}
        >
          <Loader />
        </article>

        <IssueFetcher />

        <Breadcrumbs />

        <IssueColumns />
      </div>
    </section>
  );
}

export default App;
