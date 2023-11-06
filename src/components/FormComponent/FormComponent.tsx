import React from 'react';
import styles from './FormComponent.module.scss';
import { Text, Input, FormControl, FormLabel, Button } from '@chakra-ui/react';

const FormComponent = () => {
  return (
    <div className={styles.container}>
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
          type='text'
          placeholder='Фамилия'
          variant='outline'
          sx={{
            borderColor: '#ced4da',
            _hover: {
              borderColor: '#ced4da',
              opacity: '0.5',
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
            type='text'
            placeholder='Имя'
            variant='outline'
            sx={{
              borderColor: '#ced4da',
              _hover: {
                borderColor: '#ced4da',
                opacity: '0.5',
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
            type='text'
            placeholder='Отчество'
            variant='outline'
            sx={{
              borderColor: '#ced4da',
              _hover: {
                borderColor: '#ced4da',
                opacity: '0.5',
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
            type='text'
            placeholder='Телефон'
            variant='outline'
            sx={{
              borderColor: '#ced4da',
              _hover: {
                borderColor: '#ced4da',
                opacity: '0.5',
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
            type='text'
            placeholder='Номер купона'
            variant='outline'
            sx={{
              borderColor: '#ced4da',
              _hover: {
                borderColor: '#ced4da',
                opacity: '0.5',
              },
            }}
          />
        </FormControl>
      </div>
      <Button
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
    </div>
  );
};

export default FormComponent;
