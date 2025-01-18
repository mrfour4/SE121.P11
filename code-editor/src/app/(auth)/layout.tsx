type Props = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
    return (
        <div className="flex size-full items-center justify-center">
            {children}
        </div>
    );
}
