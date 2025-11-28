import React from 'react';

interface IconProps {
    name: string;
    className?: string;
    filled?: boolean;
}

export const Icon = ({ name, className = "", filled = false }: IconProps) => (
    <span className={`material-symbols-outlined ${filled ? 'fill' : ''} ${className}`}>
        {name}
    </span>
);
