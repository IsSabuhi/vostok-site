// src/ParticipantsTable.tsx
import React, { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import config from '../configs';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

interface Participant {
  id: number;
  participants_name: string;
  participants_surname: string;
  participants_middleName: string;
  phone: number;
  coupons: string[];
}

const ParticipantsTable: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);

  const [pLoading, setPLoading] = useState(false);

  // Кеширование данных
  const cachedParticipants = useMemo(() => participants, [participants]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/GetParicipantsCoupons_admin`
        );
        const data = response.data;
        setParticipants(data);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
          toast.error(errorMessage);
          setLoading(false);
        }
      }
    };

    fetchParticipants();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'participants_name', headerName: 'Имя', width: 140 },
    { field: 'participants_surname', headerName: 'Фамилия', width: 140 },
    { field: 'participants_middleName', headerName: 'Отчество', width: 140 },
    { field: 'phone', headerName: 'Телефон', width: 140 },
    {
      field: 'coupons',
      headerName: 'Номера купонов',
      width: 200,
      renderCell: (params) => (
        <div>{(params.value as string[]).join(', ')}</div>
      ),
    },
  ];

  const filteredParticipants = cachedParticipants.filter((participant) =>
    searchTerm ? participant.coupons.includes(searchTerm) : true
  );

  const exportToExcel = () => {
    const dataToExport = participants.map((participant) => ({
      id: participant.id,
      participants_name: participant.participants_name,
      participants_surname: participant.participants_surname,
      participants_middleName: participant.participants_middleName,
      phone: participant.phone,
      coupon_number: participant.coupons.join(', '),
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
    XLSX.writeFile(workbook, 'Участники.xlsx');
  };

  const handleDownloadParticipantsCoupons = async () => {
    try {
      setPLoading(true);
      const response = await axios.get(
        `${config.apiUrl}/GetParicipantsCoupons`
      );
      const data = response.data;
      const dataToExport = data.map((participant: any) => ({
        id: participant.id,
        participants_name: participant.participants_name,
        participants_surname: participant.participants_surname,
        participants_middleName: participant.participants_middleName,
        phone: participant.phone,
        coupon_number: participant.coupon_number,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
      XLSX.writeFile(workbook, 'Все_участники_акции.xlsx');
    } catch (error) {
      console.error('Ошибка при скачивании данных:', error);
    } finally {
      setPLoading(false);
    }
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
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
        <div
          style={{
            width: '100%',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {pLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='contained'
              onClick={handleDownloadParticipantsCoupons}>
              Экспорт в Excel всех участников
            </Button>
          )}
          <Button variant='contained' onClick={exportToExcel}>
            Экспорт в Excel
          </Button>
        </div>
      </div>

      {participants.length > 0 && filteredParticipants.length > 0 ? (
        <DataGrid
          rows={filteredParticipants}
          columns={columns}
          getRowId={(row) => row.participant_id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
        />
      ) : (
        <div style={{ textAlign: 'center', color: 'red' }}>
          {loading && <CircularProgress />}
          {/* <Typography>Нет участников</Typography> */}
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
          onClick={handleSelectWinner}>
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
