import Image, { StaticImageData } from "next/image";

import styles from "./sliderThumbnail.module.scss";

interface SliderThumbnailProps {
  image: string | StaticImageData;
  updateStateForActiveThumbnail: () => void;
  setButtonIsChecked: boolean;
}

export default function SliderThumbnail({
  image,
  updateStateForActiveThumbnail,
  setButtonIsChecked,
}: SliderThumbnailProps) {
  return (
    <>
      <div
        data-testid="sliderThumbnail"
        className={`${styles.wrapper} ${
          setButtonIsChecked && styles.activeThumbnail
        }`}
        onClick={updateStateForActiveThumbnail}
      >
        <Image
          className={`${styles.image} ${
            !setButtonIsChecked && styles.inactiveThumbnail
          }`}
          src={`${image}.jpg`}
          alt={`Thumbnail image for ${image}`}
          fill
          sizes="100px"
        />
      </div>
    </>
  );
}
