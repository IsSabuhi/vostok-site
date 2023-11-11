import { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import useParticipantStore from '../../store/store';
import axios from 'axios';
import { formatName } from '../../utils/formatName';
import styles from './ParticipantsStock.module.scss';
import config from '../../configs';
import { formatDateString } from '../../utils/formatDateString';

type IParticipants = {
  participant_id: string;
  participants_middleName: string;
  participants_name: string;
  participants_surname: string;
  phone: number;
};

type IWinners = {
  winner_id: number;
  win_date: string;
  participant: IParticipants;
  coupon: {
    coupon_number: string;
    coupon_id: number;
    is_used: boolean;
  };
  is_winner: boolean;
};

const ParticipantsStock = () => {
  const { participants, setParticipants } = useParticipantStore();
  const [winner, setWinner] = useState<IWinners[]>();

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/GetParicipantsCoupons_front`)
      .then((response) => {
        const data = response.data;
        setParticipants(data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        // console.error('Произошла ошибка при выполнении запроса:', error);
      });
  }, [setParticipants]);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/Get_winner`)
      .then((response) => {
        const data = response.data;
        setWinner(data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        // console.error('Произошла ошибка при выполнении запроса:', error);
      });
  }, [setWinner]);

  return (
    <div className={styles.container}>
      {participants.length !== 0 && participants.length !== undefined && (
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
      )}

      <div className={styles.cotainer_tables}>
        {participants.length !== 0 && participants.length !== undefined && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Участник</th>
                <th>Номер купона</th>
              </tr>
            </thead>
            <tbody>
              {participants &&
                participants?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {formatName(
                          item.participants_surname,
                          item.participants_name
                        )}
                      </td>
                      <td>
                        <ul>
                          {item.coupons &&
                            item.coupons.map((coupon, couponIndex) => (
                              <li key={couponIndex}>{coupon}</li>
                            ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {winner?.length !== 0 && winner?.length !== undefined && (
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
        )}

        {winner?.length !== 0 && winner?.length !== undefined && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Участник</th>
                <th>Период</th>
                <th>Номер купона</th>
              </tr>
            </thead>
            <tbody>
              {winner?.map((winner_item) => {
                return (
                  <tr key={winner_item.winner_id}>
                    <td>
                      {formatName(
                        winner_item.participant.participants_surname,
                        winner_item.participant.participants_name
                      )}
                    </td>
                    <td>{formatDateString(winner_item.win_date)}</td>
                    <td>{winner_item.coupon.coupon_number}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ParticipantsStock;
