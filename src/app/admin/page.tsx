'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useStudentSettings, useRoleSettings, useScheduleSettings } from '@/hooks/useSettings';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

export default function AdminPage() {
    const [isMounted, setIsMounted] = React.useState(false);

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

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleRotateRoles = () => {
        if (students.length === 0) {
            alert("No students to rotate!");
            return;
        }

        const updatedRoles = roles.map(role => {
            const currentAssignee = role.assignee;
            const currentIndex = students.indexOf(currentAssignee);

            let nextIndex = 0;
            if (currentIndex !== -1) {
                nextIndex = (currentIndex + 1) % students.length;
            }

            return {
                ...role,
                assignee: students[nextIndex]
            };
        });

        setAllRoles(updatedRoles);
        alert("Roles rotated successfully!");
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
                assignee: students[0] || 'Unassigned' // Default to first student if available
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

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-black tracking-tight">⚙️ Admin Dashboard</h1>
                <Link href="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/10">
                    ← Back to Classroom
                </Link>
            </header>

            {/* Quick Actions */}
            <div className="max-w-7xl mx-auto mb-8">
                <AnimatedCard className="bg-gradient-to-r from-indigo-900 to-slate-800 p-6 border border-indigo-500/30">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span>🔄</span> Daily Rotation
                            </h2>
                            <p className="text-indigo-200 text-sm mt-1">
                                Shift all roles to the next student in the list.
                            </p>
                        </div>
                        <button
                            onClick={handleRotateRoles}
                            className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg hover:shadow-indigo-500/25 active:scale-95 transform duration-100"
                        >
                            Rotate All Roles ➜
                        </button>
                    </div>
                </AnimatedCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Student Management */}
                <AnimatedCard className="bg-slate-800 p-8 border border-slate-700">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span>👨‍🎓</span> Student List ({students?.length || 0})
                    </h2>

                    <form onSubmit={handleAddStudent} className="flex gap-4 mb-6">
                        <input
                            type="text"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                            placeholder="Add new student name..."
                            className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-all font-medium"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold transition-colors"
                        >
                            Add
                        </button>
                    </form>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                        {students?.map((student) => (
                            <motion.div
                                key={student}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05, borderColor: 'rgba(239, 68, 68, 0.5)' }}
                                className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center border border-white/5 group hover:bg-red-500/10 transition-colors"
                            >
                                <span className="font-medium">{student}</span>
                                <button
                                    onClick={() => removeStudent(student)}
                                    className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedCard>

                {/* Role Management */}
                <AnimatedCard className="bg-slate-800 p-8 border border-slate-700">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span>📋</span> Role Management ({roles?.length || 0})
                    </h2>

                    <form onSubmit={handleAddRole} className="grid gap-4 mb-6 bg-slate-700/30 p-4 rounded-xl border border-white/5">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={newRoleName}
                                onChange={(e) => setNewRoleName(e.target.value)}
                                placeholder="Role Name (e.g. 칠판 지우기)"
                                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                            />
                            <input
                                type="text"
                                value={newRoleTime}
                                onChange={(e) => setNewRoleTime(e.target.value)}
                                placeholder="Time (e.g. 08:30 - 08:50)"
                                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                            />
                        </div>
                        <input
                            type="text"
                            value={newRoleDesc}
                            onChange={(e) => setNewRoleDesc(e.target.value)}
                            placeholder="Description (Optional)"
                            className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-bold transition-all active:scale-95 text-sm shadow-lg shadow-blue-500/20"
                        >
                            + Add New Role
                        </button>
                    </form>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {roles?.map((role) => (
                            <motion.div
                                key={role.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                className="bg-slate-700/50 p-4 rounded-xl border border-white/5 flex justify-between items-start group transition-colors"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-lg">{role.name}</h3>
                                        <span className="text-xs bg-black/30 px-2 py-0.5 rounded text-blue-300 font-mono">
                                            {role.timeSlot}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-xs">{role.description || 'No description'}</p>
                                </div>
                                <button
                                    onClick={() => removeRole(role.id)}
                                    className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                    title="Delete Role"
                                >
                                    🗑️
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedCard>

                {/* Schedule Management (Full Width) */}
                <div className="lg:col-span-2">
                    <AnimatedCard className="bg-slate-800 p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span>📅</span> Weekly Schedule
                        </h2>

                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                                const dayNum = index + 1;
                                return (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(dayNum)}
                                        className={`px-6 py-3 rounded-xl font-bold transition-all ${selectedDay === dayNum
                                            ? 'bg-yellow-500 text-black shadow-lg scale-105'
                                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                                            }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {schedule && schedule[selectedDay]?.map((session, index) => (
                                <div key={index} className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-xs text-slate-500 font-bold uppercase">{session.name.includes('교시') ? session.name : `Session ${index + 1}`}</label>
                                    </div>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={session.name}
                                            onChange={(e) => {
                                                const newSessions = [...(schedule[selectedDay] || [])];
                                                newSessions[index] = { ...session, name: e.target.value };
                                                updateDaySchedule(selectedDay, newSessions);
                                            }}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                                            placeholder="Subject Name"
                                        />
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] text-slate-500 font-bold uppercase ml-1">Start</label>
                                                <input
                                                    type="text"
                                                    value={session.startTime}
                                                    onChange={(e) => {
                                                        const newSessions = [...(schedule[selectedDay] || [])];
                                                        newSessions[index] = { ...session, startTime: e.target.value };
                                                        updateDaySchedule(selectedDay, newSessions);
                                                    }}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-sm font-mono focus:outline-none focus:border-yellow-500"
                                                    placeholder="09:00"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-slate-500 font-bold uppercase ml-1">End</label>
                                                <input
                                                    type="text"
                                                    value={session.endTime}
                                                    onChange={(e) => {
                                                        const newSessions = [...(schedule[selectedDay] || [])];
                                                        newSessions[index] = { ...session, endTime: e.target.value };
                                                        updateDaySchedule(selectedDay, newSessions);
                                                    }}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-sm font-mono focus:outline-none focus:border-yellow-500"
                                                    placeholder="09:40"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(!schedule || !schedule[selectedDay] || schedule[selectedDay].length === 0) && (
                                <div className="col-span-full py-10 text-center text-slate-500">
                                    No classes scheduled for this day.
                                </div>
                            )}
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    );
}
