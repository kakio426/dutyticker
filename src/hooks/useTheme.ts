import { useState, useEffect } from 'react';

export type ThemeType = 'midnight' | 'nature' | 'ocean' | 'pastel';

export function useTheme() {
    const [theme, setTheme] = useState<ThemeType>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('duty-ticker-theme') as ThemeType) || 'midnight';
        }
        return 'midnight';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('duty-ticker-theme', theme);
    }, [theme]);

    return { theme, setTheme };
}
