import { extendTheme } from '@chakra-ui/react';
import { inputTheme } from './CustomStyles/inputTheme';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Roboto,Arial,sans-serif',
        background: '#fff',
        color: '#ced4da',
      },
    },
  },
  components: {
    Input: inputTheme,
  },
});

export default theme;
