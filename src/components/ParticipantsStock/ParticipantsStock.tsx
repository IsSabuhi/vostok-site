import { useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import useParticipantStore, { Participant } from '../../store/store';
import { motion } from 'framer-motion';
import axios from 'axios';
import { formatName } from '../../utils/formatName';
import styles from './ParticipantsStock.module.scss';
import { arrayToString } from '../../utils/arrayToString';

const ParticipantsStock = () => {
  const { participants, setParticipants } = useParticipantStore();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/GetParicipantsCoupons')
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

  return (
    <div className={styles.container}>
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
        Участники акции <span>"Марафон 2024"</span>
      </Heading>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Участник</th>
              <th>Номер купона</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((item) => {
              return (
                <tr key={item.participants_id}>
                  <td>
                    {formatName(
                      item.participants_surname,
                      item.participants_name
                    )}
                  </td>
                  <td>{arrayToString(item.coupons)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsStock;
