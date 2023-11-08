import styles from './FooterComponent.module.scss';
import { Text, Link, Image } from '@chakra-ui/react';
import telegramImg from '../../assets/images/telegramLink.png';

const FooterComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social_network}>
        {/* <Link
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
        </Link> */}
        <Link
          href='https://t.me/okean_tc'
          target='_blank'
          className={styles.telegramImg_link}
        >
          <Image src={telegramImg} alt='' />
        </Link>
        <div className={styles.text_img}>
          <Text className={styles.social_text}>Наш телеграмм канал</Text>
          <Text className={styles.social_text}>@OKEAN_TC</Text>
        </div>
      </div>

      <div className={styles.phone_number}>
        <Link
          href='tel: +79039299039'
          target='_blank'
          className={styles.phone_number_text}
        >
          +7 (903) 929-90-39
        </Link>
        <Text className={styles.phone_number_text_desc}>
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
