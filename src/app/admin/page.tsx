'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useStudentSettings, useRoleSettings, useScheduleSettings } from '@/hooks/useSettings';
import { useTheme, ThemeType } from '@/hooks/useTheme';
import { useSound } from '@/hooks/useSound';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { cn } from "@/lib/utils";
import { RotationResultModal } from '@/components/dashboard/RotationResultModal';
import { useBroadcast } from '@/hooks/useBroadcast';

export default function AdminPage() {
    const { isSoundEnabled, toggleSound } = useBroadcast();
    const [isMounted, setIsMounted] = useState(false);
    const { playDing } = useSound();

    // Students
    const { students, addStudent, removeStudent } = useStudentSettings();
    const [newStudentName, setNewStudentName] = useState('');

    // Roles
    const { roles, addRole, removeRole, setAllRoles } = useRoleSettings();
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleTime, setNewRoleTime] = useState('');
    const [newRoleDesc, setNewRoleDesc] = useState('');

    // Schedule
    const { schedule, updateDaySchedule } = useScheduleSettings();
    const [selectedDay, setSelectedDay] = useState(1);

    // Themes
    const { theme, setTheme } = useTheme();

    // Rotation Animation State
    const [isRotating, setIsRotating] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [rotationResults, setRotationResults] = useState<{ roleName: string; assignee: string }[]>([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleResetData = () => {
        if (confirm("모든 설정(학생 명단, 역할, 시간표)이 초기화됩니다. 계속할까요?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center text-[var(--text-main)] gap-4">
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-[var(--text-muted)]">Loading Dashboard...</p>
            </div>
        );
    }

    const handleRandomizeRoles = async () => {
        if (!students || students.length === 0) {
            alert("No students to randomize!");
            return;
        }
        if (!roles || roles.length === 0) {
            alert("No roles to assign!");
            return;
        }

        setIsRotating(true);

        // Shuffle students
        const shuffled = [...students].sort(() => Math.random() - 0.5);
        const newResults: { roleName: string; assignee: string }[] = [];
        const updatedRoles = roles.map((role, index) => {
            const assignee = shuffled[index % shuffled.length];
            newResults.push({ roleName: role.name, assignee });
            return { ...role, assignee };
        });

        // Small delay for "effect"
        await new Promise(resolve => setTimeout(resolve, 800));

        setAllRoles(updatedRoles);
        setRotationResults(newResults);
        setIsRotating(false);
        setShowResultModal(true);
        playDing();
    };

    const handleAddRole = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRoleName.trim() && newRoleTime.trim()) {
            addRole({
                id: Date.now().toString(),
                name: newRoleName.trim(),
                timeSlot: newRoleTime.trim(),
                description: newRoleDesc.trim(),
                status: 'pending',
                assignee: students[0] || 'Unassigned'
            });
            setNewRoleName('');
            setNewRoleTime('');
            setNewRoleDesc('');
        }
    };

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        if (newStudentName.trim()) {
            addStudent(newStudentName.trim());
            setNewStudentName('');
        }
    };

    const themes: { id: ThemeType; name: string; color: string }[] = [
        { id: 'midnight', name: 'Midnight', color: '#0f172a' },
        { id: 'nature', name: 'Nature', color: '#064e3b' },
        { id: 'ocean', name: 'Ocean', color: '#0c4a6e' },
        { id: 'pastel', name: 'Pastel', color: '#f1f5f9' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] p-8 font-sans transition-colors duration-500">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-black tracking-tight">⚙️ Admin Dashboard</h1>
                    <button
                        onClick={handleResetData}
                        className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-1 rounded-lg border border-red-500/20 transition-all font-bold"
                    >
                        Reset All Data
                    </button>
                </div>
                <Link href="/" className="px-6 py-3 bg-[var(--bg-accent)] hover:bg-[var(--accent)] hover:text-white rounded-xl font-bold transition-all border border-[var(--border)]">
                    ← Back to Classroom
                </Link>
            </header>


            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Students */}
                <AnimatedCard className="p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span>👨‍🎓</span> Student List ({students?.length || 0})
                    </h2>

                    <form onSubmit={handleAddStudent} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                            placeholder="Student Name"
                            className="flex-1 bg-[var(--bg-page)] border border-[var(--border)] rounded-xl px-4 py-2 focus:outline-none focus:border-[var(--accent)]"
                        />
                        <button
                            type="submit"
                            className="bg-[var(--accent)] text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-all"
                        >
                            + Add
                        </button>
                    </form>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {students?.map((student) => (
                            <motion.div
                                key={student}
                                layout
                                className="bg-[var(--bg-accent)] p-3 rounded-lg flex justify-between items-center border border-[var(--border)] group"
                            >
                                <span className="font-medium">{student}</span>
                                <button
                                    onClick={() => removeStudent(student)}
                                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedCard>


                {/* Role Management */}
                <AnimatedCard className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <span>📋</span> Role Management ({roles?.length || 0})
                        </h2>
                        <button
                            onClick={handleRandomizeRoles}
                            disabled={isRotating}
                            className={cn(
                                "bg-[var(--accent)] text-white px-4 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2",
                                isRotating && "opacity-50 animate-pulse"
                            )}
                        >
                            {isRotating ? "Shuffling..." : "🎲 Randomize All"}
                        </button>
                    </div>

                    <form onSubmit={handleAddRole} className="grid gap-4 mb-6 bg-[var(--bg-accent)] p-4 rounded-xl border border-[var(--border)]">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={newRoleName}
                                onChange={(e) => setNewRoleName(e.target.value)}
                                placeholder="Role Name"
                                className="bg-[var(--bg-page)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
                            />
                            <input
                                type="text"
                                value={newRoleTime}
                                onChange={(e) => setNewRoleTime(e.target.value)}
                                placeholder="Time Slot"
                                className="bg-[var(--bg-page)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[var(--accent)] hover:opacity-90 text-white py-2 rounded-lg font-bold transition-all text-sm shadow-lg"
                        >
                            + Add New Role
                        </button>
                    </form>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {roles?.map((role) => (
                            <motion.div
                                key={role.id}
                                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-accent)] flex justify-between items-center group transition-all"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold">{role.name}</h3>
                                        <span className="text-xs text-[var(--accent)] font-mono">{role.timeSlot}</span>
                                    </div>
                                    <p className="text-[var(--accent)] font-black text-lg">
                                        {role.assignee}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeRole(role.id)}
                                    className="text-[var(--text-muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                >
                                    🗑️
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedCard>

                {/* Schedule Management */}
                <div className="lg:col-span-2">
                    <AnimatedCard className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <span>📅</span> Weekly Schedule
                            </h2>
                            <button
                                onClick={() => {
                                    const newSessions = [...(schedule[selectedDay] || [])];
                                    const lastNum = newSessions.length + 1;
                                    newSessions.push({
                                        id: `period-${Date.now()}`,
                                        name: `${lastNum}교시`,
                                        startTime: "00:00",
                                        endTime: "00:00"
                                    });
                                    updateDaySchedule(selectedDay, newSessions);
                                }}
                                className="bg-[var(--accent)] text-white px-4 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg"
                            >
                                + Add Session
                            </button>
                        </div>

                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                                const dayNum = index + 1;
                                return (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(dayNum)}
                                        className={cn(
                                            "px-8 py-3 rounded-2xl font-black transition-all",
                                            selectedDay === dayNum
                                                ? "bg-[var(--accent)] text-white shadow-lg scale-105"
                                                : "bg-[var(--bg-accent)] text-[var(--text-muted)] hover:bg-[var(--bg-card)]"
                                        )}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {schedule && schedule[selectedDay]?.map((session, index) => (
                                <div key={session.id || index} className="bg-[var(--bg-accent)] p-5 rounded-2xl border border-[var(--border)] group hover:border-[var(--accent)] transition-all relative">
                                    <button
                                        onClick={() => {
                                            const newSessions = [...(schedule[selectedDay] || [])];
                                            newSessions.splice(index, 1);
                                            updateDaySchedule(selectedDay, newSessions);
                                        }}
                                        className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ✕
                                    </button>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-black text-[var(--accent)] uppercase">
                                            {session.name.includes('교시') ? session.name.split(' ')[0] : `PER ${index + 1}`}
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={session.name}
                                            onChange={(e) => {
                                                const newSessions = [...(schedule[selectedDay] || [])];
                                                newSessions[index] = { ...session, name: e.target.value };
                                                updateDaySchedule(selectedDay, newSessions);
                                            }}
                                            className="w-full bg-[var(--bg-page)] border border-[var(--border)] rounded-xl px-4 py-2 font-bold focus:outline-none focus:border-[var(--accent)]"
                                            placeholder="Subject"
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="text"
                                                value={session.startTime}
                                                onChange={(e) => {
                                                    const newSessions = [...(schedule[selectedDay] || [])];
                                                    newSessions[index] = { ...session, startTime: e.target.value };
                                                    updateDaySchedule(selectedDay, newSessions);
                                                }}
                                                className="w-full bg-[var(--bg-page)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-center font-mono text-sm focus:border-[var(--accent)] outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={session.endTime}
                                                onChange={(e) => {
                                                    const newSessions = [...(schedule[selectedDay] || [])];
                                                    newSessions[index] = { ...session, endTime: e.target.value };
                                                    updateDaySchedule(selectedDay, newSessions);
                                                }}
                                                className="w-full bg-[var(--bg-page)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-center font-mono text-sm focus:border-[var(--accent)] outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedCard>
                </div>
            </div>

            {/* General Settings */}
            <div className="max-w-7xl mx-auto mt-12 px-8">
                <AnimatedCard className="p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">🔊</span>
                            <div>
                                <h3 className="font-black text-lg">Teacher Broadcast Sound</h3>
                                <p className="text-sm text-[var(--text-muted)]">반복적인 알림음으로 학생들의 주의를 집중시킵니다.</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleSound}
                            className={cn(
                                "px-6 py-3 rounded-xl font-bold transition-all border",
                                isSoundEnabled
                                    ? "bg-[var(--accent)] text-white border-transparent shadow-lg"
                                    : "bg-[var(--bg-accent)] text-[var(--text-muted)] border-[var(--border)]"
                            )}
                        >
                            {isSoundEnabled ? "Sound Enabled" : "Sound Muted"}
                        </button>
                    </div>
                </AnimatedCard>
            </div>

            {/* Theme Selector (At Bottom) */}
            <div className="max-w-7xl mx-auto mt-8 mb-12">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3 bg-[var(--bg-card)] p-2 rounded-2xl border border-[var(--border)] shadow-xl">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={cn(
                                    "p-2 rounded-xl border transition-all flex items-center gap-2 px-4",
                                    theme === t.id
                                        ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-md"
                                        : "border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-accent)]"
                                )}
                            >
                                <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.color }}></div>
                                <span className="font-bold text-xs uppercase tracking-widest">{t.name}</span>
                            </button>
                        ))}
                    </div>
                    <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Classroom Theme Engine</p>
                </div>
            </div>

            <RotationResultModal
                isOpen={showResultModal}
                onClose={() => setShowResultModal(false)}
                results={rotationResults}
            />
        </div>
    );
}
