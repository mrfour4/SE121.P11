import Image from "next/image";

export const Loading = () => {
    return (
        <div className="flex size-full items-center justify-center">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={120}
                className="animate-pulse duration-700"
            />
        </div>
    );
};
