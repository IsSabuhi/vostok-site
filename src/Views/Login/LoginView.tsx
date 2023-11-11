import { Button, TextField, Typography, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import useAuth from '../../hook/use-auth';

const LoginFormSchema = Yup.object().shape({
  username: Yup.string().required('Введите имя пользователя'),
  password: Yup.string().required('Введите пароль'),
});

const LoginView = () => {
  const { login, error, success } = useAuth();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  return (
    <div>
      <Typography component='h1' variant='h5'>
        Вход в админку
      </Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginFormSchema}
        onSubmit={(values, { resetForm }) => {
          login(values);
          resetForm();
          setFormSubmitted(true);
        }}
      >
        <Form style={{ width: '100%', marginTop: '1rem' }}>
          <Field
            as={TextField}
            fullWidth
            id='username'
            name='username'
            label='Имя пользователя'
            autoComplete='username'
            variant='outlined'
            margin='normal'
          />
          <Field
            as={TextField}
            fullWidth
            id='password'
            name='password'
            label='Пароль'
            type='password'
            autoComplete='current-password'
            variant='outlined'
            margin='normal'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          {isFormSubmitted && error && <Alert severity='error'>{error}</Alert>}
          {isFormSubmitted && success && (
            <Alert severity='success'>Авторизация выполнена успешно.</Alert>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default LoginView;
