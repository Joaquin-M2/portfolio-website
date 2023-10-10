import styles from './description.module.scss';

import Paragraph from './paragraph/paragraph';
import ListItem from './list-item/list-item';
import Recommendations from './recommendations/recommendations';

const Description: React.FC = () => {
  return (
    <div className={styles.container}>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi nisi
        dignissimos debitis ratione sapiente saepe. Accusantium cumque, quas, ut
        corporis incidunt deserunt quae architecto voluptate.
      </Paragraph>
      <Paragraph>
        Accusantium cumque, quas, ut corporis incidunt deserunt quae architecto
        voluptate delectus, inventore iure aliquid aliquam.
      </Paragraph>
      <ul className={styles.list}>
        <ListItem>Feature 1</ListItem>
        <ListItem>Feature 2</ListItem>
        <ListItem>Feature 3</ListItem>
        <ListItem>Feature 4</ListItem>
        <ListItem>Feature 5</ListItem>
        <ListItem>Feature 6</ListItem>
        <ListItem>Feature 7</ListItem>
        <ListItem>Feature 8</ListItem>
      </ul>
      <Recommendations />
    </div>
  );
};

export default Description;
