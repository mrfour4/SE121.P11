import { CodePreview } from "@/features/snippet-detail/components/code-preview";
import { CommentList } from "@/features/snippet-detail/components/comment-list";
import { Header } from "@/features/snippet-detail/components/header";

export default function SnippetPage() {
    return (
        <main className="mx-auto max-w-[90rem] space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
            <Header />
            <CodePreview />
            <CommentList />
        </main>
    );
}
