"use client";

import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
}

export default function Item({
    label,
    onClick,
    icon: Icon,
    id,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
}: ItemProps) {
    const router = useRouter();
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);
    const { user } = useUser();

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    };

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = create({
            title: "Untitled",
            parentDocument: id,
        }).then((documentId) => {
            if (!expanded) {
                onExpand?.();
            }
            // router.push(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading: "Creating a new document...",
            success: "New Document Created!!!",
            error: "Failed to create a new document...",
        });
    };

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = archive({ id }).then(() => router.push("/documents"));

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Document moved to trash!!!",
            error: "Failed to archive document...",
        });
    };

    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
            className={cn(
                "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
                active && "bg-primary/5 text-primary",
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
            )}

            {documentIcon ? (
                <div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
            ) : (
                <Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">{label}</span>

            {isSearch && (
                <kbd
                    className="pointer-events-none ml-auto inline-flex
        h-5 select-none items-center gap-1 rounded border bg-muted
        px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
                >
                    <span className="text-xs">Ctrl</span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                            <div
                                role="button"
                                className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="p-2 text-xs text-muted-foreground">
                                Last edited by: ${user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div
                        role="button"
                        onClick={onCreate}
                        className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600 "
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    );
};
