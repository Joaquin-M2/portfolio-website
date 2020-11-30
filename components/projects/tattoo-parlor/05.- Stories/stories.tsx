import styles from './stories.module.scss';

import StoryCard from './story-card/story-card';
import SecondaryButton from '../Common/Secondary button/secondary-button';

interface StoriesProps {
  id: string;
}

const Stories: React.FC<StoriesProps> = props => {
  return (
    <section className={styles.container} id={props.id}>
      <div className={styles.backgroundVideo}>
        <video className={styles.backgroundVideoContent} autoPlay muted loop>
          <source
            src="/projects/tattoo-parlor/stories-video.webm"
            type="video/webm"
          />
          <source
            src="/projects/tattoo-parlor/stories-video.mp4"
            type="video/mp4"
          />
          Your browser is not supported!
        </video>
      </div>
      <StoryCard
        clientName="Eddie Smith"
        title="The best tattoo studio of the whole city!!"
        imgPath="/projects/tattoo-parlor/Stories/client-1.jpg"
        imgAlt="Tattoed client on the phone."
      >
        Mauris ornare augue neque, nec commodo sapien semper sed. Vivamus at
        posuere mi. Aliquam fermentum viverra urna a dictum. Duis bibendum est
        non ante gravida, nec tempus dui pulvinar. Morbi fringilla facilisis
        consequat. Aliquam gravida elit id volutpat suscipit. Sed aliquet
        aliquet elit, a iaculis justo semper at. Sed quis leo nec elit mollis
        tincidunt.
      </StoryCard>
      <StoryCard
        clientName="Megan Wayne"
        title="Highly skilled professionals. 100% recommended!"
        imgPath="/projects/tattoo-parlor/Stories/client-2.jpg"
        imgAlt="Piercings client sticking out her tongue."
      >
        In aliquam lorem ut risus finibus, vel suscipit orci tincidunt.
        Curabitur congue neque in lectus malesuada luctus. Integer ut dui vitae
        quam lobortis imperdiet ac nec nisi. Proin ac bibendum quam.
        Pellentesque accumsan consequat convallis. Proin eu lectus efficitur,
        elementum diam sed, efficitur dui. Nullam leo neque, eleifend vel metus
        ut, semper rhoncus augue.
      </StoryCard>
      <SecondaryButton additionalStyles={styles.secondaryButton} link="#">
        Read all stories &rarr;
      </SecondaryButton>
    </section>
  );
};

export default Stories;
