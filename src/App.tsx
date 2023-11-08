import React, { useEffect, useState } from 'react';
import FooterComponent from './components/Footer/FooterComponent';
import './styles/App.scss';
import MainPage from './components/MainPage/MainPage';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import useParticipantStore from './store/store';
import { formatName } from './utils/formatName';
import RegistrationCard from './components/RegistrationCard/RegistrationCard';
import TermsPromotions from './components/TermsPromotions/TermsPromotions';
import ParticipantsStock from './components/ParticipantsStock/ParticipantsStock';

// const participants = [
//   { name: 'Федорова В.' },
//   { name: 'Илькина Г.' },
//   { name: 'Мельников С.' },
//   { name: 'Казаков М.' },
//   { name: 'Воронин А.' },
//   { name: 'Кузнецов Н.' },
//   { name: 'Лебедева Е.' },
// ];

function App() {
  const { participants } = useParticipantStore();
  console.log(participants);
  return (
    <div className='container'>
      <div className='main'>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '30px',
          }}
        >
          <MainPage />
        </div>

        <ParticipantsStock />

        <TermsPromotions />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
