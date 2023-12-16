import { cn } from '@/lib/utils';
import React from 'react';

export function Title({ 
    children, 
    classname 
}: { 
    children: React.ReactNode,
    classname?: string 
}) {
    return (
        <h1 className={cn('text-3xl font-semibold text-indigo-800', classname)}>
            {children}
        </h1>
    );
}

export function Author({ 
    children, 
    classname 
}: { 
    children: React.ReactNode,
    classname?: string 
}) {
    return (
        <h1 className={cn('text-sm font-bold text-slate-500', classname)}>
            {children}
        </h1>
    );
}

export function Description({ 
    children, 
    classname 
}: { 
    children: React.ReactNode,
    classname?: string 
}) {
    return (
        <h1 className={cn('text-sm font-semibold text-slate-500', classname)}>
            {children}
        </h1>
    );
}

