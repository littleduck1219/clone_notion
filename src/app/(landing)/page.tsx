import Heading from "./__components/Heading";
import Heroes from "./__components/Heroes";
import Footer from "./__components/Footer";

export default function Home() {
    return (
        <div className="flex min-h-full flex-col dark:bg-[#1f1f1f]">
            <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 text-center md:justify-start">
                <Heading />
                <Heroes />
            </div>
            <Footer />
        </div>
    );
}
