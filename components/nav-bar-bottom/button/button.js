import styles from './button.module.scss';

function Button_NavBarBottom(props) {
    return (
        <button className={`${styles.navBarButton} ${props.additionalStyles}`} type="button">
            {props.children}
        </button>
    )
}

export default Button_NavBarBottom;