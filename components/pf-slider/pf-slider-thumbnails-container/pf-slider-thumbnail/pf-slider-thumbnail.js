import styles from './pf-slider-thumbnail.module.scss';
import {useState} from 'react';

export default function PortfolioSliderThumbnail(props) {

    // const [radioButtonChecked, setIfRadioButtonIsChecked] = useState(1)

    // const handleRadioButtonChecked = (event) => {
    //     console.log(event.target.value)
    // }
    // const radioButtonIsChecked = () => {
    //     if (true) {
    //         setIfRadioButtonIsChecked(true)
    //     } else {
    //         setIfRadioButtonIsChecked(false)
    //     }
    // }
    // const checkIfRadioButtonIsChecked = () => {
    //     if (input.checked) {
    //         // return 'active';
    //         console.log('pruebbbaaa')
    //     }
    // };
    // checkIfRadioButtonIsChecked();
    
    return(
        <>
            <input className={styles.InputThumbnailImageContainer}
                   id={props.forAttribute} 
                //    onFocus={() => setIfRadioButtonIsChecked(props.forAttribute)}
                   onChange={props.updateStateForActiveThumbnail}
                //    onChange={() => setIfRadioButtonIsChecked(prevState => !prevState)}
                //    onClick={props.updateStateForActiveThumbnail} 
                   checked={props.setCheckedButton} 
                //    checked={radioButtonChecked} 
                   type="radio" 
                   name="slider thumbnails" 
            />
            <label className={`${styles.LabelThumbnailImageContainer} ${props.styleActiveThumbnail}`} 
                   htmlFor={props.forAttribute}
            >
                <div className={styles.ThumbnailImageContainer}>
                    <img className={`${styles.ThumbnailImageContainer_Image} ${props.styleNonActiveThumbnail}`} src={props.image} />
                </div>
            </label>
        </>
    )
}

// ${checked ? styles.activateLabelStyle : null}