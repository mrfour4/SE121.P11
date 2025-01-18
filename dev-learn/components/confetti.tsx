"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import ReactConfetti from "react-confetti";

export const Confetti = () => {
    const { isOpen, onClose } = useConfettiStore((state) => state);

    if (!isOpen) return null;

    return (
        <ReactConfetti
            className="pointer-events-none z-50"
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => {
                onClose();
            }}
        />
    );
};
