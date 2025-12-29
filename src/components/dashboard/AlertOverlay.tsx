import React from 'react';

interface Alert {
    message: string;
    type: 'info' | 'warning';
}

interface AlertOverlayProps {
    alert: Alert | null;
    onDismiss: () => void;
}

export default function AlertOverlay({ alert, onDismiss }: AlertOverlayProps) {
    if (!alert) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-red-500 text-white rounded-3xl p-12 max-w-4xl w-full mx-4 shadow-2xl transform animate-bounce-subtle text-center">
                <h2 className="text-5xl font-black mb-6">🚨 알림</h2>
                <p className="text-6xl lg:text-7xl font-bold mb-10 leading-tight">
                    {alert.message}
                </p>
                <button
                    onClick={onDismiss}
                    className="bg-white text-red-500 px-10 py-4 rounded-full text-3xl font-bold hover:bg-slate-100 transition-colors"
                >
                    확인완료
                </button>
            </div>
        </div>
    );
}
