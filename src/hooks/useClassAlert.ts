'use client';

import { useState, useEffect } from 'react';
import { ClassSession } from '@/types/schedule';

interface Alert {
    message: string;
    type: 'info' | 'warning';
}

export function useClassAlert(schedule: ClassSession[]) {
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        const checkSchedule = () => {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentTotalMinutes = currentHours * 60 + currentMinutes;

            const upcoming = schedule.find(session => {
                const [h, m] = session.startTime.split(':').map(Number);
                const sessionTotalMinutes = h * 60 + m;
                return sessionTotalMinutes - currentTotalMinutes === 5;
            });

            if (upcoming) {
                const newMessage = `${upcoming.name} 시작 5분 전입니다. 준비해 주세요!`;
                setAlert(prev => {
                    if (prev?.message === newMessage) return prev;
                    return { message: newMessage, type: 'warning' };
                });
            } else {
                setAlert(prev => {
                    if (prev === null) return null;
                    return null;
                });
            }
        };

        checkSchedule();
        const interval = setInterval(checkSchedule, 1000);
        return () => clearInterval(interval);
    }, [schedule]);

    return { alert, dismiss: () => setAlert(null) };
}
