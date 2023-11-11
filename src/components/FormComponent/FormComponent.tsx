import styles from './FormComponent.module.scss';
import { Text, Input, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useParticipantStore from '../../store/store';
import config from '../../configs';

type FormParticipants = {
  participants_name: string;
  participants_surname: string;
  participants_middleName: string;
  phone: number;
  coupon_number: string;
};

const initialFormParticipants: FormParticipants = {
  participants_name: '',
  participants_surname: '',
  participants_middleName: '',
  phone: 0,
  coupon_number: '',
};

const FormComponent = () => {
  const { setParticipants } = useParticipantStore();

  const formik = useFormik({
    initialValues: initialFormParticipants,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${config.apiUrl}/registration`,
          values
        );
        console.log(response)
        toast.success('Регистрация выполнена успешно');
        formik.resetForm();

        const updateParticipantsList = async () => {
          const response = await axios.get(
            `${config.apiUrl}/GetParicipantsCoupons_front`
          );
          const data = response.data;
          setParticipants(data);
        };
        updateParticipantsList();
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
          toast.error(errorMessage);
        }
      }
    },
  });

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <Text className={styles.container_title}>Регистрация</Text>
      <FormControl>
        <FormLabel
          sx={{
            color: '#212529',
            fontSize: '16px',
            fontWeight: '400',
            fontFamily: 'inherit',
          }}
        >
          Фамилия
        </FormLabel>
        <Input
          id='participants_surname'
          name='participants_surname'
          type='text'
          placeholder='Фамилия'
          variant='outline'
          value={formik.values.participants_surname}
          onChange={formik.handleChange}
          required
          sx={{
            borderColor: '#ced4da',
            _hover: {
              borderColor: '#ced4da',
            },
          }}
        />
      </FormControl>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <FormControl>
          <FormLabel
            sx={{
              color: '#212529',
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'inherit',
            }}
          >
            Имя
          </FormLabel>
          <Input
            id='participants_name'
            name='participants_name'
            type='text'
            placeholder='Имя'
            variant='outline'
            value={formik.values.participants_name}
            onChange={formik.handleChange}
            required
            sx={{
              borderColor: '#ced4da',
              _hover: {
                borderColor: '#ced4da',
              },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            sx={{
              color: '#212529',
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'inherit',
            }}
          >
            Отчество
          </FormLabel>
          <Input
            id='participants_middleName'
            name='participants_middleName'
            type='text'
            placeholder='Отчество'
            variant='outline'
            value={formik.values.participants_middleName}
            onChange={formik.handleChange}
            sx={{
              borderColor: '#ced4da',
              _hover: {
                borderColor: '#ced4da',
              },
            }}
          />
        </FormControl>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <FormControl>
          <FormLabel
            sx={{
              color: '#212529',
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'inherit',
            }}
          >
            Телефон
          </FormLabel>
          <Input
            id='phone'
            name='phone'
            type='number'
            placeholder='Телефон'
            variant='outline'
            value={formik.values.phone === 0 ? '' : formik.values.phone}
            onChange={formik.handleChange}
            required
            sx={{
              borderColor: '#ced4da',
              _hover: {
                borderColor: '#ced4da',
              },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            sx={{
              color: '#212529',
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'inherit',
            }}
          >
            Номер купона
          </FormLabel>
          <Input
            id='coupon_number'
            name='coupon_number'
            type='text'
            placeholder='Номер купона'
            variant='outline'
            value={formik.values.coupon_number}
            onChange={formik.handleChange}
            required
            sx={{
              borderColor: '#ced4da',
              _hover: {
                color: '#212529',
                borderColor: '#ced4da',
              },
            }}
          />
        </FormControl>
      </div>
      <Button
        type='submit'
        sx={{
          color: '#fff',
          borderRadius: '20px',
          background: '#6cbe45',
          border: '1px solid #6cbe45',
          _hover: {
            color: '#6cbe45',
            background: '#fff',
          },
        }}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default FormComponent;
