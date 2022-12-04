import styles from '../loader.css';

export default function Loader() {
  return (
    <>
      <div className={styles.ball}></div>
      <div className={styles.shadow}></div>
    </>
  );
}
