import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BroadcastModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBroadcast: (message: string) => void;
}

export default function BroadcastModal({ isOpen, onClose, onBroadcast }: BroadcastModalProps) {
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
                        className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] w-full max-w-2xl p-10 shadow-3xl relative overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-400/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl font-black text-white mb-8 tracking-tight">
                                Teacher Broadcast
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="학생들에게 전달할 메시지를 입력하세요..."
                                    className="w-full h-48 bg-black/20 text-white text-3xl font-bold p-6 rounded-2xl border border-white/5 focus:ring-4 focus:ring-yellow-500/30 focus:outline-none placeholder-slate-600 resize-none mb-8 transition-all"
                                    autoFocus
                                />

                                <div className="flex gap-4 h-16">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl font-bold text-xl transition-all border border-white/5"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl font-bold text-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-[0.98]"
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
