import styles from './FooterComponent.module.scss';
import { Text, Link } from '@chakra-ui/react';
import { FaInstagram } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';

const FooterComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social_network}>
        <Link
          href='https://www.instagram.com/okean_tc'
          className={styles.social_network_link}
        >
          <FaInstagram size={25} />
        </Link>
        <Link
          href='https://vk.com/okean_tc'
          className={styles.social_network_link}
        >
          <SlSocialVkontakte size={25} />
        </Link>
      </div>

      <div className={styles.phone_number}>
        <Link
          href='tel: +79039299039'
          target='_blank'
          className={styles.phone_number_text}
        >
          +7 (903) 929-90-39
        </Link>
        <Text sx={{ padding: '0', margin: '0', color: '#fff' }}>
          Телефон горячей линии
        </Text>
      </div>
      <Link
        href='https://okean-tc.ru/politika.php'
        target='_blank'
        className={styles.policy}
      >
        Политика конфиденциальности
      </Link>
    </div>
  );
};

export default FooterComponent;
