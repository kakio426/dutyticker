import React, { ReactNode } from 'react';
import { Clock } from '@/components/ui/Clock';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] p-6 font-sans transition-colors duration-500">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">DutyTicker</h1>
                    <p className="text-[var(--text-muted)] font-medium">오늘의 1인 1역 현황판</p>
                </div>
                <Clock />
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
                {children}
            </main>
        </div>
    );
}
