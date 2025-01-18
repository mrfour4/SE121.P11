import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

export default function TasksPage() {
    return (
        <div className="flex h-full flex-col">
            <TaskViewSwitcher />
        </div>
    );
}
