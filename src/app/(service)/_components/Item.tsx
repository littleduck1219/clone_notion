"use client";

import { LucideIcon } from "lucide-react";

interface ItemProps {
    label: string;
    onClick: () => void;
    icon: LucideIcon;
}

export default function Item({ label, onClick, icon: Icon }: ItemProps) {
    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: "12px" }}
            className="group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5"
        >
            <Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
            <span className="truncate">{label}</span>
        </div>
    );
}
