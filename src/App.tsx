import styles from './App.module.scss';
import { Breadcrumbs } from './components/Breadcrumbs';
import { IssueFetcher } from './components/IssueFetcher';

function App() {
  return (
    <section className={styles.application}>
      <div className={styles.application__wrapper}>
        <IssueFetcher />

        <Breadcrumbs />
      </div>
    </section>
  );
}

export default App;
