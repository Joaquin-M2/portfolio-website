import Link from 'next/link';
import { useRouter } from 'next/router';

import ReturnLogo from '../../../SVG-icons/return';
import styles from './tongues.module.scss';

const ReturnTongue: React.FC = () => {
    const router = useRouter();
    return (
        <Link
            href={
                router.pathname.startsWith('portfolio/projects/')
                    ? '/portfolio/projects'
                    : '/portfolio/labs'
            }
        >
            <a className={styles.link}>
                <div className={`${styles.container} ${styles.return}`}>
                    <div className={styles.icon}>
                        <ReturnLogo />
                    </div>
                    <div className={styles.text}>Return</div>
                </div>
            </a>
        </Link>
    );
};

export default ReturnTongue;
