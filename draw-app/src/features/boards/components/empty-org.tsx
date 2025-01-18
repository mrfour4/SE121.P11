import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";

export const EmptyOrg = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Image src="/empty-org.png" alt="Empty" height={300} width={300} />
            <h2 className="mt-6 text-2xl font-semibold">Welcome to Board</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Create an organization to get started
            </p>

            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">Create Organization</Button>
                    </DialogTrigger>
                    <DialogContent className="w-auto border-none bg-transparent p-0">
                        <CreateOrganization hideSlug />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
