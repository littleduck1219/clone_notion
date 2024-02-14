"use client";

import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { ConfirmModal } from "@/components/modals/confirmModal";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">;
}

export default function Banner({ documentId }: BannerProps) {
    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting document...",
            success: "Document deleted!!",
            error: "Failed to delete document...",
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Document restored!!",
            error: "Failed to restore document...",
        });
    };

    return (
        <div
            className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center
    text-sm text-white
    "
        >
            <p>This page is in the Trash Box...</p>
            <Button
                onClick={onRestore}
                variant="outline"
                size="sm"
                className="border-white bg-transparent text-white hover:bg-primary/5"
            >
                Restore Page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-white bg-transparent text-white hover:bg-primary/5"
                >
                    Delete Forever
                </Button>
            </ConfirmModal>
        </div>
    );
}
