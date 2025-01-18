import { EditorPanel } from "@/features/dashboard/components/editor-panel";
import { Header } from "@/features/dashboard/components/header";
import { OutputPanel } from "@/features/dashboard/components/output-panel";

// import { parseTmTheme } from "monaco-themes";

export default function AppPage() {
    // const theme = parseTmTheme("ansiBlack");
    // console.log("🚀 ~ AppPage ~ theme:", theme);

    return (
        <div className="h-full">
            <div className="mx-auto max-w-[1800px] p-4">
                <Header />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <EditorPanel />
                    <OutputPanel />
                </div>
            </div>
        </div>
    );
}
