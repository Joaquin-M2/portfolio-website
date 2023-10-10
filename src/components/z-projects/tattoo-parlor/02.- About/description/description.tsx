import styles from './description.module.scss';

import TextBlock from './text-block/text-block';
import SecondaryButton from '../../Common/Secondary button/secondary-button';

const Description: React.FC = () => {
  return (
    <div className={styles.container}>
      <TextBlock title="Internationally awarded professionals">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum
        sapiente aspernatur libero repellat quis consequatur ducimus quam nisi
        exercitationem omnis earum qui.
      </TextBlock>
      <TextBlock title="Modern equipment">
        Consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero
        repellat quis consequatur ducimus quam nisi exercitationem omnis earum
        qui. Aliquam faucibus eros vel tincidunt lacinia.
      </TextBlock>
      <SecondaryButton link="#">Learn more &rarr;</SecondaryButton>
    </div>
  );
};

export default Description;
