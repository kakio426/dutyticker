'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';

export default function TimerCard() {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [duration, setDuration] = useState(0);
    const [isBooster, setIsBooster] = useState(false);
    const [customMins, setCustomMins] = useState(10);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { playDing } = useSound();

    const startTimer = (seconds: number, booster = false) => {
        if (seconds <= 0) return;
        setDuration(seconds);
        setTimeLeft(seconds);
        setIsBooster(booster);
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
        setTimeLeft(null);
        setIsBooster(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        if (isActive && timeLeft !== null && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            playDing();
            setTimeout(() => setTimeLeft(null), 3000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, playDing]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = timeLeft !== null ? (timeLeft / duration) * 100 : 0;

    return (
        <AnimatedCard className={cn(
            "p-6 h-full flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-500",
            isBooster && isActive ? "bg-red-950 border-red-500" : "bg-[var(--bg-card)]"
        )}>
            {/* Booster Pulse Effect */}
            {isBooster && isActive && (
                <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 bg-red-600 pointer-events-none"
                />
            )}

            <AnimatePresence mode="wait">
                {timeLeft === null ? (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="flex flex-col items-center gap-4 w-full relative z-10"
                    >
                        <h3 className="text-xl font-bold text-[var(--text-muted)] flex items-center gap-2">
                            <span>⏱️</span> Classroom Timer
                        </h3>

                        {/* Top Controls Row */}
                        <div className="flex gap-2 w-full">
                            <button
                                onClick={() => startTimer(60)}
                                className="flex-1 py-3 bg-[var(--bg-accent)] hover:bg-[var(--accent)] hover:text-white rounded-xl font-bold transition-all border border-[var(--border)] text-sm"
                            >
                                1m
                            </button>
                            <button
                                onClick={() => startTimer(300)}
                                className="flex-1 py-3 bg-[var(--bg-accent)] hover:bg-[var(--accent)] hover:text-white rounded-xl font-bold transition-all border border-[var(--border)] text-sm"
                            >
                                5m
                            </button>
                            <div className="flex-1 flex gap-1 bg-[var(--bg-accent)] rounded-xl border border-[var(--border)] p-1">
                                <input
                                    type="number"
                                    value={customMins}
                                    onChange={(e) => setCustomMins(Number(e.target.value))}
                                    className="w-full bg-transparent text-center font-bold text-sm focus:outline-none min-w-0"
                                    placeholder="?"
                                />
                                <button
                                    onClick={() => startTimer(customMins * 60)}
                                    className="bg-[var(--accent)] text-white px-3 py-1 rounded-lg text-xs font-black shrink-0"
                                >
                                    GO
                                </button>
                            </div>
                        </div>

                        {/* Booster Button */}
                        <button
                            onClick={() => startTimer(30, true)}
                            className="w-full py-4 bg-[var(--accent)] hover:opacity-90 text-white rounded-2xl font-black transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 shadow-xl"
                        >
                            <span className="text-xl">🚀</span>
                            BOOSTER (30S)
                            <span className="text-xl">🔥</span>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="flex flex-col items-center justify-center w-full relative z-10"
                    >
                        <motion.div
                            animate={isBooster && timeLeft < 10 ? { x: [-1, 1, -1, 1, 0], y: [1, -1, 1, -1, 0] } : {}}
                            transition={{ duration: 0.1, repeat: Infinity }}
                            className={cn(
                                "text-8xl font-black tabular-nums mb-6 tracking-tighter drop-shadow-2xl",
                                isBooster ? "text-orange-400" : "text-[var(--text-main)]"
                            )}
                        >
                            {formatTime(timeLeft)}
                        </motion.div>

                        <div className="flex gap-3 w-full max-w-xs">
                            <button
                                onClick={() => setIsActive(!isActive)}
                                className={cn(
                                    "flex-1 py-3 rounded-xl font-black text-sm shadow-lg border transition-all",
                                    isBooster
                                        ? "bg-white text-red-600 border-white hover:bg-white/90"
                                        : "bg-[var(--accent)] text-white border-transparent hover:opacity-90"
                                )}
                            >
                                {isActive ? 'PAUSE' : 'RESUME'}
                            </button>
                            <button
                                onClick={stopTimer}
                                className="px-6 py-3 bg-black/20 text-white/60 hover:text-white rounded-xl font-bold border border-white/10"
                            >
                                RESET
                            </button>
                        </div>

                        {/* Burning Fuse Progress Bar */}
                        <div className="absolute -bottom-6 left-0 right-0 h-4 bg-black/20 overflow-hidden">
                            <motion.div
                                className={cn(
                                    "h-full relative transition-all duration-1000 ease-linear",
                                    isBooster ? "bg-gradient-to-r from-orange-600 to-yellow-400" : "bg-[var(--accent)]"
                                )}
                                style={{ width: `${progress}%` }}
                            >
                                {isBooster && isActive && (
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.8, 1, 0.8],
                                            x: [-2, 2, -2]
                                        }}
                                        transition={{ duration: 0.1, repeat: Infinity }}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-200 rounded-full blur-sm shadow-[0_0_15px_#fbbf24]"
                                    />
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AnimatedCard>
    );
}
