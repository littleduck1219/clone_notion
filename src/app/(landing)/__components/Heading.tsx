"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function Heading() {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
                Write, plan, share. With AI at your side. Welcome to{" "}
                <span className="underline">Notion</span>
            </h1>
            <h3 className="text-base font-medium sm:text-xl md:text-2xl">
                Notion is the connected workspace where better, faster work happens
            </h3>
            <Button>
                Enter Notion
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
