'use client';

import { useState, useEffect } from 'react';

export function Clock() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return <div className="text-2xl font-black bg-[var(--bg-accent)] text-[var(--accent)] px-6 py-2 rounded-2xl border border-[var(--border)] backdrop-blur-md shadow-inner">{time || '00:00:00'}</div>;
}
