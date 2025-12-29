import { useState } from 'react';

export function useBroadcast() {
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [message, setMessage] = useState('');

    const startBroadcast = (msg: string) => {
        setMessage(msg);
        setIsBroadcasting(true);
    };

    const stopBroadcast = () => {
        setMessage('');
        setIsBroadcasting(false);
    };

    return {
        isBroadcasting,
        message,
        startBroadcast,
        stopBroadcast
    };
}
