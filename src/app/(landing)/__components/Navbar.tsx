"use client";

import useScrollTrack from "@/hooks/useScrollNav";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
    const scrolled = useScrollTrack();

    return (
        <div
            className={cn(
                "fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1f1f1f]",
                scrolled && "border-b shadow-sm",
            )}
        >
            <Logo />
            <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
                <ModeToggle />
            </div>
        </div>
    );
}
