import { Button } from "@/components/ui/button";
import Image from "next/image";
import Heading from "./__components/Heading";

export default function Home() {
    return (
        <div className="flex min-h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
                <Heading />
            </div>
        </div>
    );
}
