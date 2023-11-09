import { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import useParticipantStore from '../../store/store';
import axios from 'axios';
import { formatName } from '../../utils/formatName';
import styles from './ParticipantsStock.module.scss';
import { arrayToString } from '../../utils/arrayToString';
import config from '../../configs';

const ParticipantsStock = () => {
  const { participants, setParticipants } = useParticipantStore();

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/GetParicipantsCoupons`)
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
      <div className={styles.cotainer_tables}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Участник</th>
              <th>Номер купона</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((item, index) => {
              return (
                <tr key={index}>
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
          Победители акции <span>"Марафон 2024"</span>
        </Heading>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Участник</th>
              <th>Период</th>
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
                  <td>01.01.2024</td>
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
