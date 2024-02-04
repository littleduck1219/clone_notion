import Image from "next/image";
import React from "react";

export default function Heroes() {
    return (
        <div className="flex max-w-5xl flex-col items-center justify-center">
            <div className="flex items-center">
                <div className="relative h-[300px] w-[300px] sm:h-[300px] sm:w-[300px] md:h-[300px] md:w-[300px]">
                    <Image
                        src="/documents.png"
                        fill
                        className="object-contain dark:hidden"
                        alt="Documents"
                    />
                    <Image
                        src="/documents-dark.png"
                        fill
                        className="hidden object-contain dark:block"
                        alt="Documents"
                    />
                </div>
                <div className="relative hidden h-[400px] w-[400px] md:block ">
                    <Image
                        src="/reading.png"
                        fill
                        className="object-contain dark:hidden"
                        alt="Documents"
                    />
                    <Image
                        src="/reading-dark.png"
                        fill
                        className="hidden object-contain dark:block"
                        alt="Documents"
                    />
                </div>
            </div>
        </div>
    );
}
