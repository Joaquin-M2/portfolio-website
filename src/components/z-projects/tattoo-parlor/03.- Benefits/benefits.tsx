import styles from './benefits.module.scss';

import BenefitCard from './benefit-card/benefit-card';

import PrizeLogo from '../../../SVG-icons/portfolio/projects/TattooParlor/benefits/trophy';
import MoneyLogo from '../../../SVG-icons/portfolio/projects/TattooParlor/benefits/money';
import HealthLogo from '../../../SVG-icons/portfolio/projects/TattooParlor/benefits/health';
import SatisfactionLogo from '../../../SVG-icons/portfolio/projects/TattooParlor/benefits/smile';

const iconGradient = (
  <defs>
    <linearGradient
      id='Gradient-1'
      x2='100%'
      y2='0%'
      gradientUnits='userSpaceOnUse'
    >
      <stop offset='30%' stopColor='#7c43bd' />
      {/* <stop offset="10%" stop-color="#b4c63b" />
      <stop offset="20%" stop-color="#ef5b2b" />
      <stop offset="20%" stop-color="#503969" />
      <stop offset="30%" stop-color="#ab6294" />
      <stop offset="30%" stop-color="#1cb98f" />
      <stop offset="40%" stop-color="#48afc1" />
      <stop offset="40%" stop-color="#b4c63b" /> */}
      <stop offset='100%' stopColor='#12005e' />
      {/* <stop offset="50%" stop-color="#503969" />
      <stop offset="60%" stop-color="#ab6294" />
      <stop offset="60%" stop-color="#1cb98f" />
      <stop offset="70%" stop-color="#48afc1" />
      <stop offset="70%" stop-color="#b4c63b" />
      <stop offset="80%" stop-color="#ef5b2b" />
      <stop offset="80%" stop-color="#503969" />
      <stop offset="90%" stop-color="#ab6294" />
      <stop offset="90%" stop-color="#1cb98f" />
      <stop offset="100%" stop-color="#48afc1" /> */}
    </linearGradient>
  </defs>
);

interface BenefitsProps {
  id: string;
}

const Benefits: React.FC<BenefitsProps> = (props) => {
  return (
    <section className={styles.container} id={props.id}>
      <div className={styles.subcontainer}>
        <BenefitCard
          title='Benefit 1'
          icon={<PrizeLogo colorGradient={iconGradient} />}
        >
          Donec ultricies, libero sed interdum imperdiet, arcu sapien egestas
          orci, eu placerat lectus arcu sit amet mauris. In cursus at sem non
          posuere. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Integer et diam aliquet risus bibendum
          molestie.
        </BenefitCard>
        <BenefitCard
          title='Benefit 2'
          icon={<MoneyLogo colorGradient={iconGradient} />}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non
          turpis fermentum, malesuada mauris ut, ornare dui. Nunc nec turpis non
          nulla tempor efficitur. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Curabitur consectetur
          vitae quam ut egestas.
        </BenefitCard>
        <BenefitCard
          title='Benefit 3'
          icon={<HealthLogo colorGradient={iconGradient} />}
        >
          Vestibulum vitae consequat neque, vitae molestie elit. Aliquam
          faucibus eros vel tincidunt lacinia. Morbi consectetur diam imperdiet
          ipsum pellentesque, vitae lobortis lectus venenatis. Praesent mauris
          orci, ornare at tincidunt non, molestie sit amet ligula.
        </BenefitCard>
        <BenefitCard
          title='Benefit 4'
          icon={<SatisfactionLogo colorGradient={iconGradient} />}
        >
          Proin imperdiet tellus non leo malesuada, ac tempor magna venenatis.
          Donec sagittis, sem vitae placerat ornare, ante nisi dictum quam, a
          porta dolor ante vitae sapien. Ut arcu lectus, lacinia non lobortis
          non, vehicula eu nulla. Donec ut tincidunt lacus.
        </BenefitCard>
      </div>
    </section>
  );
};

export default Benefits;
