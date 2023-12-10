import React from 'react';
import { Container } from '@mui/material';
import ExchangeRateTable from './components/ExchangeRateTable';
import CacheAgeBox from './components/CacheAgeBox';

const App = () => {
    return (
        <Container>
            <React.Suspense fallback="...loading">
                <CacheAgeBox />
            </React.Suspense>
            <br />
            <React.Suspense fallback="...loading">
                <ExchangeRateTable />
            </React.Suspense>
        </Container>
    );
};

export default App;
