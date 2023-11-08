import React from 'react';
import styles from './Stock.module.scss';
import { Text, Image } from '@chakra-ui/react';
import clubImg from '../../assets/images/club_f.png';

const Stock = () => {
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text className={styles.container_text}>Здесь будет текст</Text>
      </div>
      <div className={styles.container_img}>
        <Image src={clubImg} alt='' />
        <Text className={styles.container_text}>
          Здесь возможно будет картинка или анимация
        </Text>
      </div>
    </div>
  );
};

export default Stock;
