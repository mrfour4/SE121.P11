import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/">
            <Image
                width={130}
                height={130}
                priority
                src="/logo.svg"
                alt="Logo"
                className="size-[130px]"
            />
        </Link>
    );
};
