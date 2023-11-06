import { Image } from '@chakra-ui/react';
import oceanLogo from '../../assets/images/logo_oc.png';
import zlLogo from '../../assets/images/logo_zl1.png';
import styles from './HeaderComponent.module.scss';

const HeaderComponent = () => {
  return (
    <div className={styles.container}>
      <Image src={oceanLogo} alt='' />
      <Image src={zlLogo} alt='' />
    </div>
  );
};

export default HeaderComponent;
