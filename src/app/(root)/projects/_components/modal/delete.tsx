"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/store/store";

export const DeleteModal = () => {
  const { isOpen, type, data, onClose } = useModal();

  return (
    <Dialog
      open={isOpen && type === "deleteProject"}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {data?.projectName}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {/* Add confirmation buttons here */}
      </DialogContent>
    </Dialog>
  );
};
