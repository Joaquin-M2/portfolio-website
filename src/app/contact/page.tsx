import ContactForm from '../../components/ContactForm/ContactForm';

import EmailLogo from '../../components/SVG-icons/email';
import LinkedinLogo from '../../components/SVG-icons/linkedin';
import GithubLogo from '../../components/SVG-icons/github';
//import TwitterLogo from '../../components/SVG-icons/twitter';

import styles from './contact.module.scss';

export default function Contact() {
  return (
    <>
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
                <a
                  href='#'
                  className={`${styles.EmailLogo} ${styles.ContactLogos}`}
                  target='_blank'
                >
                  <EmailLogo />
                  Email
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className={`${styles.LinkedinLogo} ${styles.ContactLogos}`}
                  target='_blank'
                >
                  <LinkedinLogo />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className={`${styles.GithubLogo} ${styles.ContactLogos}`}
                  target='_blank'
                >
                  <GithubLogo />
                  GitHub
                </a>
              </li>
              {/* <li>
                <a
                  href='#'
                  className={`${styles.TwitterLogo} ${styles.ContactLogos}`}
                  target='_blank'
                >
                  <TwitterLogo />
                  Twitter
                </a>
              </li>
              <li>
                <a href='#' target='_blank'>
                  ---
                </a>
              </li> */}
            </ul>
            <p>
              If you prefer a direct call, just send me an email so we can
              arrange a meeting. No UTC preference on my side.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
