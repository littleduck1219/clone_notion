import React, { ReactNode } from "react";
import Navbar from "./__components/Navbar";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-full ">
            <Navbar />
            <main className="h-full pt-40">{children}</main>
        </div>
    );
}
