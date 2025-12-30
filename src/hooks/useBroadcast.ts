import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';

export function useBroadcast() {
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [message, setMessage] = useState('');
    const [isSoundEnabled, setIsSoundEnabled] = useState(() =>
        loadFromStorage('broadcast_sound_enabled', true)
    );

    useEffect(() => {
        saveToStorage('broadcast_sound_enabled', isSoundEnabled);
    }, [isSoundEnabled]);

    const startBroadcast = (msg: string) => {
        setMessage(msg);
        setIsBroadcasting(true);
    };

    const stopBroadcast = () => {
        setMessage('');
        setIsBroadcasting(false);
    };

    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
    };

    return {
        isBroadcasting,
        message,
        isSoundEnabled,
        startBroadcast,
        stopBroadcast,
        toggleSound
    };
}
