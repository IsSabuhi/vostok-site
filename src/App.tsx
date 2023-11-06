import HeaderComponent from './components/Header/HeaderComponent';
import FooterComponent from './components/Footer/FooterComponent';
import './styles/App.scss';
import MainPage from './components/MainPage/MainPage';
import { Text } from '@chakra-ui/react';

function App() {
  return (
    <div className='container'>
      <div className='main'>
        <HeaderComponent />
        <MainPage />
        <div>
          <Text
            sx={{
              color: 'black',
              fontSize: '40px',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Участники акции
          </Text>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
