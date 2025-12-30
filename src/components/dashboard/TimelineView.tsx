import { Role } from '@/types/role';
import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TimelineViewProps {
    roles: Role[];
    onRoleClick?: (roleId: string) => void;
    onToggleStatus?: (roleId: string) => void;
}

export default function TimelineView({ roles, onRoleClick, onToggleStatus }: TimelineViewProps) {
    const [isHovered, setIsHovered] = useState(false);

    const shouldAnimate = roles.length > 4;

    return (
        <div
            className="bg-[var(--bg-accent)] backdrop-blur-xl rounded-[2.5rem] h-full col-span-1 lg:col-span-5 border border-[var(--border)] shadow-3xl relative overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header stays sticky outside the scrolling area */}
            <div className="absolute top-0 left-0 right-0 bg-[var(--bg-page)]/80 backdrop-blur-md px-8 py-6 z-20 border-b border-[var(--border)]">
                <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-black tracking-tight text-[var(--text-main)]">Today&apos;s Schedule</h3>
                    {shouldAnimate && (
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                isHovered ? "bg-red-500 animate-pulse" : "bg-green-500"
                            )} />
                            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                                {isHovered ? "Paused" : "Scrolling"}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Scrolling Container */}
            <div className="h-full pt-24 pb-8 px-8 overflow-hidden">
                <motion.div
                    animate={shouldAnimate && !isHovered ? {
                        y: ["0%", "-50%"],
                    } : {}}
                    transition={{
                        duration: roles.length * 5, // 5 seconds per item for comfortable reading
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    // Note: In a real world, we'd measure actual height, but for
                    // this ticker style with uniform cards, a percentage or count-based shift works best.
                    // Using translate-y percentage for better accuracy with dynamic heights.
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {(shouldAnimate ? [...roles, ...roles] : roles).map((role, index) => (
                        <motion.div
                            key={`${role.id}-${index}`}
                            whileHover={{ scale: 1.02, backgroundColor: "var(--bg-card)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onRoleClick?.(role.id)}
                            className={`p-6 rounded-[1.5rem] flex justify-between items-center transition-all border border-[var(--border)] cursor-pointer shadow-lg ${role.status === 'completed'
                                ? 'opacity-40 grayscale-[0.5]'
                                : 'bg-[var(--bg-card)]'
                                }`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${role.status === 'completed' ? 'bg-[var(--bg-accent)] text-[var(--text-muted)]' : 'bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/20'}`}>
                                        {role.timeSlot}
                                    </span>
                                </div>
                                <p className={`font-black text-2xl mt-2 tracking-tight ${role.status === 'completed' ? 'line-through decoration-[var(--text-muted)] text-[var(--text-muted)]' : 'text-[var(--text-main)]'}`}>
                                    {role.name}
                                </p>
                                <p className="text-[var(--accent)] font-bold text-lg mt-1">{role.assignee}</p>
                            </div>

                            <div className="ml-4 flex items-center">
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleStatus?.(role.id);
                                    }}
                                    className="relative z-30"
                                >
                                    {role.status === 'completed' ? (
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                            <span className="text-green-500 text-2xl font-bold">✓</span>
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-[var(--bg-accent)] flex items-center justify-center border border-[var(--border)] group">
                                            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                                        </div>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
