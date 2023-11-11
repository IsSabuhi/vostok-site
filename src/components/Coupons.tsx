import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../configs';

const Coupons = () => {
  const [winner, setWinner] = useState<[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/Create_coupon`);
        const data = response.data;
        setWinner(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.error('Произошла ошибка при выполнении запроса:', error);
      }
    };

    fetchParticipants();
  }, []);

  console.log(winner);

  return (
    <div>
      <p>asdasd</p>
    </div>
  );
};

export default Coupons;
