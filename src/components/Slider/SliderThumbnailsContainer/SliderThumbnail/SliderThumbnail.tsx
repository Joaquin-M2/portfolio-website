import Image, { StaticImageData } from "next/image";

import styles from "./sliderThumbnail.module.scss";

interface SliderThumbnailProps {
  forAttribute: string;
  id: string;
  image: string | StaticImageData;
  updateStateForActiveThumbnail: () => void;
  setButtonIsChecked: boolean;
}

export default function SliderThumbnail({
  forAttribute,
  id,
  image,
  updateStateForActiveThumbnail,
  setButtonIsChecked,
}: SliderThumbnailProps) {
  return (
    <>
      <input
        className={styles.InputThumbnailImageContainer}
        id={forAttribute}
        onChange={updateStateForActiveThumbnail}
        checked={setButtonIsChecked}
        type="radio"
        name="slider thumbnails"
      />
      <label
        data-testid="label"
        className={`${styles.LabelThumbnailImageContainer} ${
          setButtonIsChecked && styles.activeThumbnail
        }`}
        htmlFor={forAttribute}
      >
        <div className={styles.ThumbnailImageContainer}>
          <Image
            className={`${styles.ThumbnailImageContainer_Image} ${
              !setButtonIsChecked && styles.inactiveThumbnail
            }`}
            src={`${image}-thumbnail.jpg` || image}
            alt={`Thumbnail image for ${image}`}
            width={60}
            height={60}
          />
        </div>
      </label>
    </>
  );
}
