import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ExchangeRatesQuery, useExchangeRatesSuspenseQuery } from '../generated/graphql';
import { durationToNowFromMillis } from '../lib/durationToNow';

const columns: GridColDef<ExchangeRatesQuery['exchangeRates'][number]>[] = [
    {
        field: 'currencyCode',
        headerName: 'Currency Code',
        valueGetter: ({ row }) => `${row.currencyCode} (${row.currencyName})`,
        minWidth: 150,
    },
    {
        field: 'rate',
        valueGetter: ({ row }) => `${row.rate} Kč = ${row.amount} ${row.currencyCode}`,
        headerName: 'Rate',
        type: 'number',
        minWidth: 150,
    },
    {
        field: 'country',
        headerName: 'Country',
    },
];

const ExchangeRateTable = () => {
    const { data } = useExchangeRatesSuspenseQuery();
    return (
        <DataGrid
            columns={columns}
            rows={data.exchangeRates}
            getRowId={({ currencyCode }) => currencyCode}
        />
    );
};

export default ExchangeRateTable;
