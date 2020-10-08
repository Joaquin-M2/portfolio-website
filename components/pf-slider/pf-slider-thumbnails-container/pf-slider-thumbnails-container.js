import styles from './pf-slider-thumbnails-container.module.scss';
import PortfolioSliderThumbnail from './pf-slider-thumbnail/pf-slider-thumbnail';

export default function PortfolioSliderThumbnailsContainer(props) {


    return(
        <div className={styles.ThumbnailContainer}>
            {props.children}
        </div>
    )
}