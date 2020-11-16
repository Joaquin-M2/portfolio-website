import styles from './avatar-image.module.scss';

interface AvatarImageProps {
  src: string;
  alt: string;
  additionalStyles?: string;
  stackedAvatar?: boolean;
}

const AvatarImage: React.FC<AvatarImageProps> = props => {
  return (
    <img
      className={`${styles.avatarImage} ${props.additionalStyles} ${
        props.stackedAvatar === true ? styles.stackedAvatars : null
      }`}
      src={props.src}
      alt={props.alt}
    />
  );
};

export default AvatarImage;
