import React from 'react';

interface Alert {
    message: string;
    type: 'info' | 'warning';
}

interface AlertOverlayProps {
    alert: Alert | null;
    onDismiss: () => void;
}

import { useSound } from '@/hooks/useSound';

export default function AlertOverlay({ alert, onDismiss }: AlertOverlayProps) {
    const { playDing } = useSound();

    React.useEffect(() => {
        if (alert) {
            playDing();
        }
    }, [alert, playDing]);

    if (!alert) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] animate-in fade-in duration-300 backdrop-blur-md">
            <div className="bg-[var(--accent)] text-white rounded-[3rem] p-12 max-w-4xl w-full mx-4 shadow-3xl transform animate-bounce-subtle text-center border-4 border-white/20">
                <h2 className="text-5xl font-black mb-8 drop-shadow-lg">🚨 Attention</h2>
                <div className="text-5xl lg:text-7xl font-bold mb-12 leading-tight tracking-tight">
                    {alert.message}
                </div>
                <button
                    onClick={onDismiss}
                    className="bg-white text-[var(--accent)] px-12 py-5 rounded-full text-4xl font-black hover:scale-110 active:scale-95 transition-all shadow-xl"
                >
                    확인완료
                </button>
            </div>
        </div>
    );
}
