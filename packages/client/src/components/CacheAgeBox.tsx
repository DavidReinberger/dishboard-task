import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useCacheInfoSuspenseQuery } from '../generated/graphql';
import { durationToNowFromMillis } from '../lib/durationToNow';

const CacheAgeBox = () => {
    const { data } = useCacheInfoSuspenseQuery();
    const elapsedInitial = durationToNowFromMillis(data.cacheAge ?? 0);
    const [elapsed, setElapsed] = useState(elapsedInitial);

    useEffect(() => {
        const interval = setInterval(() => {
            const age = durationToNowFromMillis(data.cacheAge ?? 0);
            setElapsed(age);
        }, 1000);
        return () => clearInterval(interval);
    }, [data.cacheAge]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h3" component="h2">
                    Data Cache age:
                </Typography>
                <>
                    {elapsed.minutes} minutes and {Math.round(elapsed.seconds ?? 0)} seconds
                </>
            </CardContent>
        </Card>
    );
};

export default CacheAgeBox;
