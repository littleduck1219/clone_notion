"use client";

import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

interface MenuProps {
    documentId: Id<"documents">;
}

export default function Menu({ documentId }: MenuProps) {
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({ id: documentId });
        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Document moved to trash!",
            error: "Failed to move to trash",
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={9} forceMount>
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground">
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return < Skeleton className="h-10 w-10" />;
};
