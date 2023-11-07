import HeaderComponent from './components/Header/HeaderComponent';
import FooterComponent from './components/Footer/FooterComponent';
import './styles/App.scss';
import MainPage from './components/MainPage/MainPage';
import { Text, Box, Heading, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formaName } from './utils/formatName';
import useParticipantStore from './store/store';
import { motion } from 'framer-motion';

const participants = [
  { name: 'Иванов И.' },
  { name: 'Петров А.' },
  { name: 'Федорова В.' },
  { name: 'Илькина Г.' },
];

function App() {
  const { participants, setParticipants } = useParticipantStore();

  // useEffect(() => {
  //   const fetchParticipants = async () => {
  //     try {
  //       const participantsData = await ParticipantsService.getParticipantsGet();
  //       setParticipants(participantsData);
  //     } catch (error) {
  //       console.error('Ошибка при получении участников:', error);
  //     }
  //   };

  //   fetchParticipants();
  // }, [setParticipants]);

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/Get_participants').then((response) => {
  //     const data = response.data;
  //     setParticipants(data);
  //   });
  // }, [setParticipants]);

  console.log(participants);
  return (
    <div className='container'>
      <div className='main'>
        <HeaderComponent />
        <MainPage />
        <div>
          <Heading
            as='h2'
            size='lg'
            mb={4}
            sx={{
              color: '#333',
              fontSize: '30px',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Участники акции
          </Heading>
          {/* <div
            style={{
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
              margin: '20px',
              borderRadius: '40px',
              padding: '20px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              height: '200px',
            }}
          >
            {participants.map((participant) => (
              <div
                key={participant.participants_id}
                className='cards_participant'
              >
                {formaName(
                  participant.participants_surname,
                  participant.participants_name
                )}
              </div>
            ))}
          </div> */}
          <ParticipantsSection />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;

const Participant = ({ name }: { name: string }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Box p={4} borderWidth='1px' borderRadius='md' shadow='md'>
        <Text fontWeight='bold'>{name}</Text>
      </Box>
    </motion.div>
  );
};

const ParticipantsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box p={8} borderWidth='1px' borderRadius='md' shadow='lg'>
        <Heading as='h2' size='lg' mb={4}>
          Участники розыгрыша
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {participants.map((participant, index) => (
            <Participant key={index} name={participant.name} />
          ))}
        </SimpleGrid>
      </Box>
    </motion.div>
  );
};
