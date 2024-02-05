"use client";

import { api } from "@/../convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { ChevronsLeft, MenuIcon, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, MouseEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import Item from "./Item";
import UserItem from "./UserItem";

export default function Navigation() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const pathname = usePathname();
    const documents = useQuery(api.documents.get);
    const create = useMutation(api.documents.create);
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const handleCreate = () => {
        const promise = create({ title: "test" });

        toast.promise(promise, {
            loading: "Creating document",
            success: "Document created",
            error: "Failed to create document",
        });
    };

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [isMobile, pathname]);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group relative z-[9999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "w-0",
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "opacity absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground transition hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                    <Item onClick={handleCreate} label="New Document" icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    {documents?.map((document) => <p key={document._id}>{document.title}</p>)}
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover:opacity-100"
                />
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
                        <MenuIcon
                            onClick={resetWidth}
                            role="button"
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </nav>
            </div>
        </>
    );
}
