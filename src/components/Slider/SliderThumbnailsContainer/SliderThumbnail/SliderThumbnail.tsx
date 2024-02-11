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
        data-testid="sliderThumbnailLabel"
        className={`${styles.wrapper} ${
          setButtonIsChecked && styles.activeThumbnail
        }`}
        onClick={updateStateForActiveThumbnail}
      >
        <Image
          className={`${styles.image} ${
            !setButtonIsChecked && styles.inactiveThumbnail
          }`}
          src={`${image}-thumbnail.jpg` || image}
          alt={`Thumbnail image for ${image}`}
          width={60}
          height={60}
        />
      </div>
    </>
  );
}
