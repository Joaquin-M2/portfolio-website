import styles from './sliderThumbnail.module.scss';

export default function SliderThumbnail(props) {
  return (
    <>
      <input
        className={styles.InputThumbnailImageContainer}
        id={props.forAttribute}
        onChange={props.updateStateForActiveThumbnail}
        checked={props.setCheckedButton}
        type='radio'
        name='slider thumbnails'
      />
      <label
        className={`${styles.LabelThumbnailImageContainer} ${props.styleActiveThumbnail}`}
        htmlFor={props.forAttribute}
      >
        <div className={styles.ThumbnailImageContainer}>
          <img
            className={`${styles.ThumbnailImageContainer_Image} ${props.styleNonActiveThumbnail}`}
            src={`${props.image}-thumbnail.jpg`}
          />
        </div>
      </label>
    </>
  );
}
