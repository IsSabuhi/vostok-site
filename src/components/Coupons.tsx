import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../configs';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';

interface Coupon {
  coupon_number: string;
  coupon_id: number;
  is_used: boolean;
}

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/Get_coupons`);
        const data = response.data;
        setCoupons(data);
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(coupons);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Coupons');
    XLSX.writeFile(workbook, 'coupons.xlsx');
  };

  const columns: GridColDef[] = [
    { field: 'coupon_id', headerName: 'ID купона', width: 130 },
    { field: 'coupon_number', headerName: 'Номер купона', width: 130 },
    { field: 'is_used', headerName: 'Использован', width: 130 },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {coupons.length > 0 ? (
        <>
          <DataGrid
            rows={coupons}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            getRowId={(row) => row.coupon_number}
          />
          <Button variant='contained' onClick={exportToExcel}>
            Экспорт в Excel
          </Button>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: 'red' }}>
          <p>Нет доступных купонов</p>
        </div>
      )}
    </div>
  );
};

export default Coupons;
