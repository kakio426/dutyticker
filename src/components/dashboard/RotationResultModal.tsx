import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Role } from '@/types/role';

interface RotationResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    results: { roleName: string; assignee: string }[];
}

export function RotationResultModal({ isOpen, onClose, results }: RotationResultModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[200]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[2rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
                    >
                        <h2 className="text-3xl font-black text-center mb-6 text-[var(--text-main)]">
                            🎲 Rotation Results
                        </h2>

                        <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2 mb-8">
                            {results.map((res, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-[var(--bg-accent)] rounded-xl border border-[var(--border)]">
                                    <span className="font-bold text-[var(--text-muted)]">{res.roleName}</span>
                                    <span className="font-black text-[var(--accent)] text-lg">{res.assignee}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full bg-[var(--accent)] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg"
                        >
                            Got it!
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
