import { Image, Text, Heading } from '@chakra-ui/react';
import styles from './MainPage.module.scss';
import oceanLogo from '../../assets/images/logo_ocean.png';
import zlLogo from '../../assets/images/logo_zl.png';
import FormComponent from '../FormComponent/FormComponent';
import iconCheck from '../../assets/icons/check.svg';

export const main_text = [
  {
    icon: iconCheck,
    title: 'Регистрируйся для участия',
  },
  {
    icon: iconCheck,
    title: 'Участвуй в розыгрыше',
  },
  {
    icon: iconCheck,
    title: 'Выиграй супер призы',
  },
];

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_title}>
          <Heading
            className={styles.title}
            sx={{
              color: '#fff',
              fontSize: '50px',
              fontStyle: 'normal',
              fontWeight: 900,
            }}
          >
            Участвуй в розыгрыше
          </Heading>
        </div>
        <div className={styles.header_text}>
          {main_text.map((item, index) => {
            return (
              <div key={index} className={styles.item_card}>
                <Image src={item.icon} alt='' />
                <Text className={styles.item_text}>{item.title}</Text>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.form_container}>
        <div className={styles.logoBlock}>
          <div className={styles.logo_img}>
            <Image src={oceanLogo} alt='' />
            <Image src={zlLogo} alt='' />
          </div>
        </div>
        <FormComponent />
      </div>
    </div>
  );
};

export default MainPage;
