import { Header } from "@/features/snippets/components/header";

type Props = {
    children: React.ReactNode;
};

export default function SnippetsLayout({ children }: Props) {
    return (
        <div className="h-full">
            <Header />

            {children}
        </div>
    );
}
