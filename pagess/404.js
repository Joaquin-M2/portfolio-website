import Router from 'next/router';
import { useEffect } from 'react';

import styles from './page-error404.module.scss';

import NavBarBottom from '../components/projects/portfolio-website/nav-bar-bottom/nav-bar-bottom';
import Error404 from '../components/SVG-icons/Error 404/404';

export default function Custom404() {
    useEffect(() => {
        if (Router.asPath === '/portfolio/') {
            Router.push('/portfolio/projects');
        }
    }, []);

    return (
        <>
            <div className={styles.Container}>
                <h1>Page Not Found</h1>
                <Error404 />
            </div>
            <NavBarBottom />
        </>
    );
}
