import React from 'react';
import FormComponent from '../../components/FormComponent/FormComponent';
import { Image, Text } from '@chakra-ui/react';
import formImg from '../../assets/images/club_f.png';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <FormComponent />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text
          sx={{
            color: '#333',
            fontSize: '40px',
            fontWeight: '600',
            letterSpacing: '1.5px',
            textAlign: 'center',
          }}
        >
          Карта <br />
          "Клуб семья"
        </Text>
        <Image src={formImg} alt='' />
      </div>
    </div>
  );
};

export default MainPage;
