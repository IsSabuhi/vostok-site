import React from 'react';
import styles from './RegistrationCard.module.scss';
import clubImg from '../../assets/images/club_f.png';
import { Image, Text } from '@chakra-ui/react';
import { main_text } from '../MainPage/MainPage';

const RegistrationCard = () => {
  return (
    <div className={styles.container}>
      <Image src={clubImg} alt='' className={styles.container_img} />
      <div className={styles.main}>
        <Text className={styles.container_title}>Больше скидок и акций</Text>
        <div className={styles.main_block}>
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
    </div>
  );
};

export default RegistrationCard;
