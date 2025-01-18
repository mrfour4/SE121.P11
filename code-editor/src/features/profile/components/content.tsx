"use client";

import { useState } from "react";
import { TABS } from "../constants";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ExecutionsTab } from "./executions-tab";
import { StarsTab } from "./stars-tab";

export const Content = () => {
    const [activeTab, setActiveTab] = useState(TABS[0].value);

    return (
        <div className="overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="border-b border-gray-800/50">
                <div className="flex space-x-1 p-4">
                    {TABS.map((tab) => (
                        <Button
                            key={tab.value}
                            variant="ghost"
                            className={cn(
                                "text-gray-400 hover:text-gray-300",
                                activeTab === tab.value &&
                                    "bg-blue-400/10 text-blue-400 hover:bg-blue-400/10 hover:text-blue-400",
                            )}
                            onClick={() => setActiveTab(tab.value)}
                        >
                            <tab.icon />
                            {tab.label}
                        </Button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === "executions" ? (
                        <ExecutionsTab />
                    ) : (
                        <StarsTab />
                    )}
                </div>
            </div>
        </div>
    );
};
