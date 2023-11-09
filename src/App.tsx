import { useEffect } from 'react';
import FooterComponent from './components/Footer/FooterComponent';
import './styles/App.scss';
import MainPage from './components/MainPage/MainPage';
import useParticipantStore from './store/store';
import TermsPromotions from './components/TermsPromotions/TermsPromotions';
import ParticipantsStock from './components/ParticipantsStock/ParticipantsStock';
import axios from 'axios';
import config from './configs';

function App() {
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

        {participants.length !== 0 && <ParticipantsStock />}

        <TermsPromotions />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
