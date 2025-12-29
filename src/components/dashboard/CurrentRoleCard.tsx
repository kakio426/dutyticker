import React from 'react';
import { Role } from '@/types/role';

interface CurrentRoleCardProps {
    role: Role | null;
    broadcastMessage?: string;
    isBroadcasting?: boolean;
    onRoleClick?: (roleId: string) => void;
}

import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { AutoFitText } from '@/components/ui/AutoFitText';
import { AnimatePresence } from 'motion/react';

export default function CurrentRoleCard({ role, broadcastMessage, isBroadcasting, onRoleClick }: CurrentRoleCardProps) {
    return (
        <AnimatePresence mode="wait">
            {isBroadcasting && broadcastMessage ? (
                <AnimatedCard
                    key="broadcast"
                    className="bg-yellow-400 text-black p-10 flex flex-col justify-center items-center h-full min-h-[400px] col-span-1 lg:col-span-7"
                >
                    <div className="flex flex-col items-center text-center w-full">
                        <span className="inline-block bg-black text-yellow-400 px-8 py-3 rounded-full text-3xl font-black mb-12 animate-pulse">
                            NOTICE
                        </span>
                        <AutoFitText
                            text={broadcastMessage}
                            className="font-black"
                        />
                    </div>
                </AnimatedCard>
            ) : !role ? (
                <AnimatedCard
                    key="empty"
                    className="bg-slate-800 p-8 flex items-center justify-center h-full min-h-[400px] col-span-1 lg:col-span-7"
                >
                    <p className="text-3xl text-slate-500">현재 예정된 역할이 없습니다</p>
                </AnimatedCard>
            ) : (
                <AnimatedCard
                    key="role"
                    onClick={() => onRoleClick?.(role.id)}
                    className="bg-yellow-400 text-black p-10 flex flex-col justify-between h-full min-h-[400px] col-span-1 lg:col-span-7 cursor-pointer hover:scale-[1.01] transition-transform shadow-2xl"
                >
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <span className="inline-block bg-black text-yellow-400 px-6 py-2 rounded-full text-2xl font-bold animate-pulse">
                                NOW
                            </span>
                            <span className="text-3xl font-bold opacity-80">
                                {role.timeSlot}
                            </span>
                        </div>

                        <AutoFitText
                            text={role.name}
                            className="font-black tracking-tight"
                        />
                    </div>

                    <div className="mt-8 pt-8 border-t-4 border-black/10">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-2xl font-bold mb-1 opacity-60 uppercase tracking-widest">Assignee</p>
                                <p className="text-5xl lg:text-6xl font-black">{role.assignee}</p>
                            </div>
                            {role.description && (
                                <div className="hidden lg:block max-w-sm bg-black/10 p-5 rounded-3xl backdrop-blur-sm">
                                    <p className="text-xl font-bold leading-relaxed">
                                        {role.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </AnimatedCard>
            )}
        </AnimatePresence>
    );
}
