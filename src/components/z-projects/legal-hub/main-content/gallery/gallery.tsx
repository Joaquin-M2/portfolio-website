import styles from './gallery.module.scss';

import Image from './image/image';

const Gallery: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image
        srcSet="/projects/legal-hub/lawyer-1.jpg 600w, /projects/legal-hub/lawyer-1-small.jpg 300w"
        src="/projects/legal-hub/lawyer-1.jpg"
        alt="Picture lawyer 1"
      />
      <Image
        srcSet="/projects/legal-hub/lawyer-2.jpg 600w, /projects/legal-hub/lawyer-2-small.jpg 300w"
        src="/projects/legal-hub/lawyer-2.jpg"
        alt="Picture lawyer 2"
      />
      <Image
        srcSet="/projects/legal-hub/lawyer-3.jpg 600w, /projects/legal-hub/lawyer-3-small.jpg 300w"
        src="/projects/legal-hub/lawyer-3.jpg"
        alt="Picture lawyer 3"
      />
    </div>
  );
};

export default Gallery;
