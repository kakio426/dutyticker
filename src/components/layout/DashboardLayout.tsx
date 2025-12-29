import React, { ReactNode } from 'react';
import { Clock } from '@/components/ui/Clock';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Classroom Hub</h1>
                    <p className="text-slate-400">오늘의 1인 1역 현황판</p>
                </div>
                <Clock />
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
                {children}
            </main>
        </div>
    );
}
