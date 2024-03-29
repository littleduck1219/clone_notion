"use client";

import ModeToggle from "@/components/brightModeToggle";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import useScrollTrack from "@/hooks/useScrollNav";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
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
                {isLoading && <Spinner />}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">Get Notion free</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">Enter Notion</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;
