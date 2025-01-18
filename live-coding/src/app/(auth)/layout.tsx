import { Logo } from "@/features/auth/components/logo";

type Props = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-6">
            <Logo />

            {children}
        </div>
    );
}
