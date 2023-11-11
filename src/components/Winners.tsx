import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../configs';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { formatDateString } from '../utils/formatDateString';
import * as XLSX from 'xlsx';

interface Winner {
  winner_id: number;
  win_date: string;
  participant_id: number;
  participants_name: string;
  participants_middleName: string;
  participants_surname: string;
  phone: number;
  coupon_id: number;
  coupon_number: string;
  is_used: boolean;
  is_winner: boolean;
}

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/Get_winner_adminJSON`
        );
        const data = response.data;
        setWinners(data);
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
          toast.error(errorMessage);
        }
        console.error('Произошла ошибка при выполнении запроса:', error);
      }
    };

    fetchParticipants();
  }, []);

  const columns: GridColDef[] = [
    { field: 'winner_id', headerName: 'ID', width: 50 },
    { field: 'participants_name', headerName: 'Имя', width: 100 },
    { field: 'participants_surname', headerName: 'Фамилия', width: 130 },
    { field: 'participants_middleName', headerName: 'Отчество', width: 130 },
    { field: 'phone', headerName: 'Телефон', width: 130 },
    { field: 'coupon_number', headerName: 'Номер купона', width: 130 },
    {
      field: 'win_date',
      headerName: 'Дата выигрыша',
      width: 130,
      valueGetter: (params) => formatDateString(params.row.win_date),
    },
  ];

  const getRowId = (row: Winner) => row.winner_id;

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(winners);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
    XLSX.writeFile(workbook, 'Список победителей.xlsx');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        width: '100%',
      }}
    >
      <Button
        variant='contained'
        sx={{ marginLeft: 'auto' }}
        onClick={exportToExcel}
      >
        Экспорт в Excel
      </Button>
      {winners.length > 0 ? (
        <>
          <DataGrid
            rows={winners}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            getRowId={getRowId}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', color: 'red' }}>
          <p>Нет победителей</p>
        </div>
      )}
    </div>
  );
};

export default Winners;
