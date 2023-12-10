import { DateTime } from 'luxon';

export const durationToNowFromMillis = (start: number) => {
    const startLuxonDateTime = DateTime.fromMillis(start);
    const now = DateTime.now();
    return now.diff(startLuxonDateTime, ['minutes', 'seconds']).toObject();
};
