import Head from 'next/head';

import NavBarBottom from '../../components/nav-bar-bottom/nav-bar-bottom';

import ContactForm from '../../components/contact/contact-form/contact-form';

import EmailLogo from '../../components/SVG-icons/email';
import LinkedinLogo from '../../components/SVG-icons/linkedin';
import SkypeLogo from '../../components/SVG-icons/skype';
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
              <li><EmailLogo link={'#'} EmailLogoStyles={`${styles.EmailLogo} ${styles.ContactLogos}`}>yoh@joaquin-m2.pro</EmailLogo></li>
              <li><LinkedinLogo link={'#'} LinkedinLogoStyles={`${styles.LinkedinLogo} ${styles.ContactLogos}`}>LinkedIn</LinkedinLogo></li>
              <li><SkypeLogo link={'#'} SkypeLogoStyles={`${styles.SkypeLogo} ${styles.ContactLogos}`}>Skype</SkypeLogo></li>
              <li><TwitterLogo link={'#'} TwitterLogoStyles={`${styles.TwitterLogo} ${styles.ContactLogos}`}>Twitter</TwitterLogo></li>
              <li><a href="#" target="_blank">---</a></li>
            </ul>
            <p>If you prefer a direct call, just send me an email so we can arrange a meeting. No UTC preference on my side.</p>
          </div>
        </main>
        <NavBarBottom />
      </div>
    </>
  )
}