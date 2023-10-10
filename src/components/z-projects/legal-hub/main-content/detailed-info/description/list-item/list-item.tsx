import styles from './list-item.module.scss';

import CheckmarkIcon from '../../../../../../SVG-icons/portfolio/projects/LegalHub/DetailedInfo/checkmark';

const ListItem: React.FC = (props) => {
  return (
    <li className={styles.listItem}>
      <CheckmarkIcon additionalStyles={styles.checkmarkIcon} />
      {props.children}
    </li>
  );
};

export default ListItem;
