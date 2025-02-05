import styles from "./Datebox.module.css";
const Datebox = () => {
  return (
    <div className={`${styles.dateBox} absolute`} id="datebox">
      <div className={styles.month}>MAR</div>
      <div className={styles.date}>22</div>
      <div className={styles.day}>Friday</div>
    </div>
  );
};
export default Datebox;
