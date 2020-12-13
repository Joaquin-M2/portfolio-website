import styles from './Links.module.scss';

// import GoogleLogo from '../../../../../../../../public/labs/real-time-search/google-logo.png';
// import AmazonLogo from '../../../../../../../../public/labs/real-time-search/amazon-logo.png';

interface SearchResultLinksProps {
  linkToGoogle: string;
  linkToAmazon: string;
}

const SearchResultLinks: React.FC<SearchResultLinksProps> = props => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Find it on:</p>
      <a
        href={props.linkToAmazon}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img
          className={styles.image}
          alt="Amazon logo taking to its page"
          src="/labs/real-time-search/amazon-logo.png"
        />
      </a>
      <a
        href={props.linkToGoogle}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img
          className={styles.image}
          alt="Google logo taking to its page"
          src="/labs/real-time-search/google-logo.png"
        />
      </a>
    </div>
  );
};

export default SearchResultLinks;
