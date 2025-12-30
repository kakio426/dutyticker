import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface BroadcastModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBroadcast: (message: string) => void;
    isSoundEnabled: boolean;
    onToggleSound: () => void;
}

export default function BroadcastModal({
    isOpen,
    onClose,
    onBroadcast,
    isSoundEnabled,
    onToggleSound
}: BroadcastModalProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onBroadcast(input);
            onClose();
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[100]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[var(--bg-card)]/80 backdrop-blur-2xl border border-[var(--border)] rounded-[2.5rem] w-full max-w-2xl p-10 shadow-3xl relative overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--accent)]/10 blur-[100px] rounded-full" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-4xl font-black text-[var(--text-main)] tracking-tight">
                                    Teacher Broadcast
                                </h2>
                                <button
                                    type="button"
                                    onClick={onToggleSound}
                                    className={cn(
                                        "p-4 rounded-2xl transition-all border flex items-center gap-2 font-bold",
                                        isSoundEnabled
                                            ? "bg-[var(--accent)] text-white border-transparent"
                                            : "bg-[var(--bg-accent)] text-[var(--text-muted)] border-[var(--border)]"
                                    )}
                                >
                                    {isSoundEnabled ? (
                                        <>
                                            <span className="text-xl">🔊</span>
                                            <span>Sound On</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-xl">🔇</span>
                                            <span>Muted</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="학생들에게 전달할 메시지를 입력하세요..."
                                    className="w-full h-48 bg-[var(--bg-page)]/50 text-[var(--text-main)] text-3xl font-bold p-6 rounded-2xl border border-[var(--border)] focus:ring-4 focus:ring-[var(--accent)]/30 focus:outline-none placeholder-[var(--text-muted)] resize-none mb-8 transition-all"
                                    autoFocus
                                />

                                <div className="flex gap-4 h-16">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 bg-[var(--bg-accent)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] rounded-2xl font-bold text-xl transition-all border border-[var(--border)]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] bg-[var(--accent)] hover:opacity-90 text-white rounded-2xl font-bold text-xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Broadcast to Dashboard
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
