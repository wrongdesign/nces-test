"use client"

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    description?: string;
    confirmButtonText: string;
}

const ConfirmModal = ({isOpen, onConfirm, confirmButtonText, description, onClose, title}: Props) => {
    const handleConfirm = async () => {
        await onConfirm()

        onClose()
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose()
                }
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {title}
                    </DialogTitle>

                    {description && (
                        <DialogDescription className="pt-2 text-sm text-muted-foreground">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <Button
                        className="w-full cursor-pointer"
                        onClick={handleConfirm}
                    >
                        {confirmButtonText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmModal