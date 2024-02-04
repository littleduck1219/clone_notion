"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navigation from "./_components/Navigation";

export default function layout({ children }: { children: ReactNode }) {
    const { isLoading, isAuthenticated } = useConvexAuth();

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Spinner size="lg"></Spinner>
            </div>
        );
    }

    if (!isAuthenticated) {
        return redirect("/");
    }
    return (
        <div className="flex h-full dark:bg-[#1f1f1f]">
            <Navigation />
            <main className="h-full flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
