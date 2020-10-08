import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from './nav-bar-top.module.scss';

export default function NavBarTopButton(props) {

    const router = useRouter();

    return (
        <Link href={props.link}>
            <a className={`${styles.NavBarTopButton} ${router.pathname.startsWith(props.link) ? styles.Active : null}`}>
                <h2>
                    {props.children}
                </h2>
            </a>
        </Link>
    )
}