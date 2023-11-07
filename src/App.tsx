import FooterComponent from './components/Footer/FooterComponent';
import './styles/App.scss';
import MainPage from './components/MainPage/MainPage';
import { Text, Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const participants = [
  { name: 'Иванов И.' },
  { name: 'Петров А.' },
  { name: 'Федорова В.' },
  { name: 'Илькина Г.' },
];

function App() {
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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: '200px' }}
    >
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {participants.map((participant, index) => (
            <Participant key={index} name={participant.name} />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};
