import styles from './sliderThumbnailsContainer.module.scss';

export default function SliderThumbnailsContainer(props) {
  return <div className={styles.ThumbnailContainer}>{props.children}</div>;
}
