import styles from './logo.module.scss';

import TP_Isotype from '../../../../SVG-icons/portfolio/projects/TattooParlor/isotype';

interface LogoProps {
  logoPath?: string;
  imgAlt?: string;
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <div className={styles.container}>
      <TP_Isotype additionalStyles={styles.logo} />
      {/* <img src={props.logoPath} alt={props.imgAlt} className={styles.logo} /> */}
    </div>
  );
};

export default Logo;

//"projects/Tattoo Parlor/logo-white.png"
