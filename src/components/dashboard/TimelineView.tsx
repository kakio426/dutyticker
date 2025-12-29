import { Role } from '@/types/role';
import { motion } from 'motion/react';

interface TimelineViewProps {
    roles: Role[];
    onRoleClick?: (roleId: string) => void;
}

export default function TimelineView({ roles, onRoleClick }: TimelineViewProps) {
    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 h-full overflow-y-auto col-span-1 lg:col-span-5 border border-white/10 shadow-3xl custom-scrollbar relative">
            <div className="sticky top-0 bg-[#0f171c]/80 backdrop-blur-md -mx-8 -mt-8 px-8 py-6 z-20 border-b border-white/10 mb-6">
                <h3 className="text-3xl font-black tracking-tight text-white">Today&apos;s Schedule</h3>
            </div>
            <div className="space-y-4">
                {roles.map((role, index) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onRoleClick?.(role.id)}
                        className={`p-6 rounded-[1.5rem] flex justify-between items-center transition-all border border-white/5 cursor-pointer shadow-lg ${role.status === 'completed'
                            ? 'opacity-40 grayscale-[0.5]'
                            : 'bg-white/5'
                            }`}
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${role.status === 'completed' ? 'bg-white/10 text-white/50' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'}`}>
                                    {role.timeSlot}
                                </span>
                            </div>
                            <p className={`font-black text-2xl mt-2 tracking-tight ${role.status === 'completed' ? 'line-through decoration-white/30 text-white/30' : 'text-white'}`}>
                                {role.name}
                            </p>
                            <p className="text-blue-300 font-bold text-lg mt-1">{role.assignee}</p>
                        </div>

                        <div className="ml-4">
                            {role.status === 'completed' ? (
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/20">
                                    <span className="text-green-400 text-2xl font-bold">✓</span>
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
