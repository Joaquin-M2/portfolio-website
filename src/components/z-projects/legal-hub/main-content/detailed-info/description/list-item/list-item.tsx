import styles from "./list-item.module.scss";

import CheckmarkIcon from "../../../../../../SVG-icons/portfolio/projects/LegalHub/DetailedInfo/checkmark";

interface ListItemProps {
  children: JSX.Element | JSX.Element[] | string;
}

function ListItem({ children }: ListItemProps) {
  return (
    <li className={styles.listItem}>
      <CheckmarkIcon additionalStyles={styles.checkmarkIcon} />
      {children}
    </li>
  );
}

export default ListItem;
