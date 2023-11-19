// src/ParticipantsTable.tsx
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import config from '../configs';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

interface Participant {
  id: number;
  participants_name: string;
  participants_surname: string;
  participants_middleName: string;
  phone: number;
  coupon_number: string;
}

const ParticipantsTable: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/GetParicipantsCoupons`
        );
        const data = response.data;
        setParticipants(data);
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
          toast.error(errorMessage);
        }
      }
    };

    fetchParticipants();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'participants_name', headerName: 'Имя', width: 130 },
    { field: 'participants_surname', headerName: 'Фамилия', width: 130 },
    { field: 'participants_middleName', headerName: 'Отчество', width: 130 },
    { field: 'phone', headerName: 'Телефон', width: 130 },
    { field: 'coupon_number', headerName: 'Номер купона', width: 130 },
  ];

  const filteredParticipants = participants.filter((participant) =>
    searchTerm ? participant.coupon_number === searchTerm : true
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(participants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
    XLSX.writeFile(workbook, 'Участники.xlsx');
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Номер купона'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button variant='contained' onClick={exportToExcel}>
          Экспорт в Excel
        </Button>
      </div>

      {participants.length > 0 && filteredParticipants.length > 0 ? (
        <DataGrid
          rows={filteredParticipants}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      ) : (
        <div style={{ textAlign: 'center', color: 'red' }}>
          <Typography>Нет участников</Typography>
        </div>
      )}

      <div>
        <WinnerSelectionForm />
      </div>
    </div>
  );
};

const WinnerSelectionForm = () => {
  const [coupon_number, setCouponNumber] = useState('');

  const handleSelectWinner = async () => {
    try {
      await axios.post(
        `${config.apiUrl}/Select_winner?coupon_number=${coupon_number}`
      );
      toast.success('Победитель выбран успешно.');
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        const errorMessage = axiosError.response.data.detail;
        toast.error(errorMessage);
      }
      console.error('Произошла ошибка при выборе победителя:', error);
    }
  };

  return (
    <div>
      <Typography>Выбор победителя</Typography>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TextField
          type='text'
          value={coupon_number}
          onChange={(e) => setCouponNumber(e.target.value)}
          placeholder='Введите номер купона'
          inputProps={{ 'aria-label': 'coupon-number' }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleSelectWinner}
        >
          <Typography>Выбрать победителя</Typography>
        </Button>
      </div>
    </div>
  );
};

const Search = styled('div')(({ theme }) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  'color': 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default ParticipantsTable;