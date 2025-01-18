type Props = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    return (
        <main className="flex h-full flex-col bg-gray-950 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
            {children}
        </main>
    );
}
