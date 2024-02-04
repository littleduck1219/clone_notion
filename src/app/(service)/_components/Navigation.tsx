"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function Navigation() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const pathname = usePathname();
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsaCollapsed] = useState(isMobile);

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "w-0",
                )}
            >
                <div
                    role="button"
                    className={cn(
                        "opacity absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground transition hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <p>Action</p>
                </div>
                <div className="mt-4">
                    <p>Document</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover:opacity-100" />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "w-[calc(100%-240px absolute left-60 top-0 z-[99999]",
                    isResetting && "transition-all ease-in-out",
                    isMobile && "left-0 w-full",
                )}
            >
                <nav className="w-full bg-transparent px-3 py-2">
                    {isCollapsed && (
                        <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />
                    )}
                </nav>
            </div>
        </>
    );
}
