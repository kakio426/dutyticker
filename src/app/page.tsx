'use client';

import DashboardLayout from "@/components/layout/DashboardLayout";
import CurrentRoleCard from "@/components/dashboard/CurrentRoleCard";
import TimelineView from "@/components/dashboard/TimelineView";
import AlertOverlay from "@/components/dashboard/AlertOverlay";
import BroadcastModal from "@/components/dashboard/BroadcastModal";
import StudentSelectModal from "@/components/dashboard/StudentSelectModal";
import { mockRoles } from "@/data/mockRoles";
import { mockWeeklySchedule } from "@/data/mockWeeklySchedule";
import { mockStudents } from "@/data/mockStudents";
import { useClassAlert } from "@/hooks/useClassAlert";
import { useBroadcast } from "@/hooks/useBroadcast";
import { useRoleManagement } from "@/hooks/useRoleManagement";
import { useWeeklySchedule } from "@/hooks/useWeeklySchedule";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

export default function Home() {
  // Role Management
  const { roles, updateAssignee } = useRoleManagement(mockRoles);
  const currentRole = roles.find(r => r.status === 'pending') || null;

  // Student Select Modal State
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const handleRoleClick = (roleId: string) => {
    // Only allow editing if not in broadcast mode? Or always?
    // Let's allow always for now.
    setSelectedRoleId(roleId);
    setIsStudentModalOpen(true);
  };

  const handleStudentSelect = (studentName: string) => {
    if (selectedRoleId) {
      updateAssignee(selectedRoleId, studentName);
    }
  };

  const { schedule } = useWeeklySchedule();
  const { alert, dismiss } = useClassAlert(schedule);

  // Broadcast State
  const { isBroadcasting, message, startBroadcast, stopBroadcast } = useBroadcast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBroadcast = (msg: string) => {
    startBroadcast(msg);
  };

  return (
    <>
      <AlertOverlay alert={alert} onDismiss={dismiss} />
      <BroadcastModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBroadcast={handleBroadcast}
      />
      <StudentSelectModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSelect={handleStudentSelect}
        students={mockStudents}
      />

      <DashboardLayout>
        {/* Left (or Top): Current Role Highlight or Broadcast Message */}
        <CurrentRoleCard
          role={currentRole}
          broadcastMessage={message}
          isBroadcasting={isBroadcasting}
          onRoleClick={handleRoleClick}
        />

        {/* Right (or Bottom): Timeline of all roles */}
        <TimelineView
          roles={roles}
          onRoleClick={handleRoleClick}
        />
      </DashboardLayout>

      {/* Floating Action Button for Teacher */}
      <motion.div
        layout
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4 items-center"
      >
        {/* Admin Link Button */}
        {!isBroadcasting && (
          <Link href="/admin">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-slate-800 text-slate-400 hover:text-white rounded-full shadow-lg border border-white/5 transition-colors"
              title="Admin Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>
          </Link>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isBroadcasting) {
              stopBroadcast();
            } else {
              setIsModalOpen(true);
            }
          }}
          className={cn(
            "p-6 rounded-full shadow-3xl transition-colors relative overflow-hidden",
            isBroadcasting
              ? 'bg-red-500 text-white'
              : 'bg-slate-700 hover:bg-yellow-500 hover:text-black text-white'
          )}
          title={isBroadcasting ? "Stop Broadcast" : "New Broadcast"}
        >
          {isBroadcasting && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 border-4 border-white/20 rounded-full border-t-white"
            />
          )}

          <div className="relative z-10">
            {isBroadcasting ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 018.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.43.816 1.035.816 1.73 0 .695-.32 1.3-.816 1.73" />
              </svg>
            )}
          </div>
        </motion.button>
      </motion.div>
    </>
  );
}
