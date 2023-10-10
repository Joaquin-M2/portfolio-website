import styles from './FilterButton.module.scss';

export default function FilterButton(props) {
  return (
    <li className={styles.listElement}>
      {props.children}
      <label className={styles.rocker}>
        <input
          type='checkbox'
          onChange={props.addAndRemoveFilter}
          checked={props.setCheckedStatus}
        />
        <span className={styles.switchLeft}>On</span>
        <span className={styles.switchRight}>Off</span>
      </label>
    </li>
  );
}
