"use client";

import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { ConfirmModal } from "@/components/modals/confirmModal";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";

import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TrashBox() {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Document restored!",
            error: "Failed to restore document...",
        });
    };

    const onRemove = (documentId: Id<"documents">) => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Removing document...",
            success: "Document removed!",
            error: "Failed to remove document...",
        });

        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <div className="flex h-full items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="flex h-80 flex-col overflow-hidden text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
                    placeholder="filter by document title!"
                />
            </div>
            <div className="mt-2 flex-grow overflow-y-auto px-1 pb-1">
                {filteredDocuments && filteredDocuments.length > 0 ? (
                    filteredDocuments?.map((document) => (
                        <div
                            key={document._id}
                            role="button"
                            onClick={() => onClick(document._id)}
                            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
                        >
                            <span className="truncate pl-2">{document.title}</span>
                            <div className="flex items-center">
                                <div
                                    onClick={(e) => onRestore(e, document._id)}
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                >
                                    <Undo className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                    <div
                                        className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                        role="button"
                                    >
                                        <Trash className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </ConfirmModal>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="pb-2 text-center text-xs text-muted-foreground">
                        No documents found
                    </p>
                )}
            </div>
        </div>
    );
}
