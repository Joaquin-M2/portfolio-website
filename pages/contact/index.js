import Head from 'next/head';

import NavBarBottom from '../../components/projects/portfolio-website/nav-bar-bottom/nav-bar-bottom';

import ContactForm from '../../components/projects/portfolio-website/contact/contact-form/contact-form';

import EmailLogo from '../../components/SVG-icons/email';
import LinkedinLogo from '../../components/SVG-icons/linkedin';
import GithubLogo from '../../components/SVG-icons/github';
import TwitterLogo from '../../components/SVG-icons/twitter';

import styles from './contact.module.scss';

export default function Contact() {
    return (
        <>
            <Head>
                <title>Contact - JM2</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.positionMainElements}>
                <main className={styles.Container}>
                    <div className={styles.FormContainer}>
                        <ContactForm />
                    </div>
                    <div className={styles.OtherContactMeansContainer}>
                        <h2>Not a big fan of forms?</h2>
                        <h3>You can also contact me over here:</h3>
                        <ul>
                            <li>
                                <EmailLogo
                                    link={'#'}
                                    EmailLogoStyles={`${styles.EmailLogo} ${styles.ContactLogos}`}
                                >
                                    Email
                                </EmailLogo>
                            </li>
                            <li>
                                <LinkedinLogo
                                    link={'#'}
                                    LinkedinLogoStyles={`${styles.LinkedinLogo} ${styles.ContactLogos}`}
                                >
                                    LinkedIn
                                </LinkedinLogo>
                            </li>
                            <li>
                                <GithubLogo
                                    link={'#'}
                                    GithubLogoStyles={`${styles.GithubLogo} ${styles.ContactLogos}`}
                                >
                                    GitHub
                                </GithubLogo>
                            </li>
                            <li>
                                <TwitterLogo
                                    link={'#'}
                                    TwitterLogoStyles={`${styles.TwitterLogo} ${styles.ContactLogos}`}
                                >
                                    Twitter
                                </TwitterLogo>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    ---
                                </a>
                            </li>
                        </ul>
                        <p>
                            If you prefer a direct call, just send me an email
                            so we can arrange a meeting. No UTC preference on my
                            side.
                        </p>
                    </div>
                </main>
                <NavBarBottom />
            </div>
        </>
    );
}
