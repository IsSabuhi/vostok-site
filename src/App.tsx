import React, { useEffect, useState } from 'react';
import FooterComponent from './components/Footer/FooterComponent';
import './styles/App.scss';
import MainPage from './components/MainPage/MainPage';
import { Text, Box, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useParticipantStore, { Participant } from './store/store';
import { formatName } from './utils/formatName';
import RegistrationCard from './components/RegistrationCard/RegistrationCard';
import Stock from './components/Stock/Stock';

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
  const { participants, setParticipants } = useParticipantStore();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/Get_participants')
      .then((response) => {
        const data = response.data;
        setParticipants(data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        console.error('Произошла ошибка при выполнении запроса:', error);
      });
  }, [setParticipants]);

  console.log(participants);

  return (
    <div className='container'>
      <div className='main'>
        {/* <HeaderComponent /> */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '40px',
          }}
        >
          <MainPage />
        </div>

        {participants.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <RegistrationCard />
          </div>
        ) : (
          <div>
            <Heading
              as='h2'
              size='lg'
              mb={4}
              sx={{
                color: '#333',
                fontSize: '32px',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Участники акции
            </Heading>
            <ParticipantsSection participants={participants} />
          </div>
        )}
        <div className='stock_container'>
          <Heading
            as='h2'
            size='lg'
            mb={4}
            sx={{
              color: '#333',
              fontSize: '32px',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Условия проведения акции
          </Heading>
          <Stock />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;

const ParticipantCard = ({ name }: { name: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // style={{ width: '200px' }}
    >
      <Box
        p={4}
        borderWidth='1px'
        borderRadius='md'
        shadow='md'
        cursor='pointer'
      >
        <Text fontWeight='bold' color='#333'>
          {name}
        </Text>
      </Box>
    </motion.div>
  );
};

const ParticipantsSection = ({
  participants,
}: {
  participants: Participant[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box p={8}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {participants?.map((participant, index) => (
            <ParticipantCard
              key={index}
              name={formatName(
                participant.participants_surname,
                participant.participants_name
              )}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};
