import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (studentName: string) => void;
    students: string[];
}

export default function StudentSelectModal({ isOpen, onClose, onSelect, students }: StudentSelectModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[110]">
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
                        className="bg-[var(--bg-card)]/80 backdrop-blur-2xl border border-[var(--border)] rounded-[2.5rem] w-full max-w-4xl p-10 shadow-3xl relative overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent)]/10 blur-[100px] rounded-full" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-main)] p-2 transition-colors z-20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="relative z-10">
                            <h2 className="text-4xl font-black text-[var(--text-main)] mb-10 text-center tracking-tight">Select Student</h2>

                            <div className="grid grid-cols-4 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                                {students.map((student) => (
                                    <motion.button
                                        key={student}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            onSelect(student);
                                            onClose();
                                        }}
                                        className="bg-[var(--bg-accent)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-main)] text-2xl font-black py-8 rounded-2xl transition-all border border-[var(--border)] hover:border-[var(--accent)] shadow-lg"
                                    >
                                        {student}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
