import FooterComponent from './components/Footer/FooterComponent';
import './styles/App.scss';
import MainPage from './components/MainPage/MainPage';
import TermsPromotions from './components/TermsPromotions/TermsPromotions';
import ParticipantsStock from './components/ParticipantsStock/ParticipantsStock';

function App() {
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
