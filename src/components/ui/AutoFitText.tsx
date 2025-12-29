import React from 'react';
import { cn } from '@/lib/utils';

import { useAutoFitText } from '@/hooks/useAutoFitText';

interface AutoFitTextProps {
    text: string;
    className?: string;
}

export function AutoFitText({ text, className }: AutoFitTextProps) {
    const { fontSizeClass } = useAutoFitText(text);

    return (
        <div
            className={cn("w-full transition-all duration-300", fontSizeClass, className)}
            style={{ lineHeight: 1.1 }}
        >
            <span className="block break-keep whitespace-pre-wrap leading-tight">
                {text}
            </span>
        </div>
    );
}
