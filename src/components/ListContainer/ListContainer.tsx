import { useState } from "react";
import Image from "next/image";

import styles from "./listContainer.module.scss";

interface ListContainerProps {
  items: any[];
  title: string;
  usesIconPreview?: boolean;
}

function ListContainer({ items, title, usesIconPreview }: ListContainerProps) {
  const [iconIsShown, setIconIsShown] = useState(
    items.map(() => {
      return false;
    })
  );

  function handleShowIcon(id) {
    let iconsState = [...iconIsShown];
    iconsState[id] = !iconsState[id];
    setIconIsShown(iconsState);
  }

  return (
    <div className={styles.mainContainer}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.innerContainer}>
        <ul className={styles.list}>
          {items.map((item, id) => {
            return (
              <div className={styles.itemContainer} key={item._id}>
                <li
                  className={`${styles.item} ${
                    usesIconPreview && styles.itemIsClickable
                  }`}
                  onClick={() => usesIconPreview && handleShowIcon(id)}
                >
                  {item.name}
                </li>
                {usesIconPreview && iconIsShown[id] && (
                  <Image
                    src={item.url}
                    alt={`Icon for ${item.name}`}
                    width={60}
                    height={60}
                    className={styles.icon}
                  />
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ListContainer;
