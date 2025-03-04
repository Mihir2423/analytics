"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/store/store";

export const EditModal = () => {
  const { isOpen, type, onClose } = useModal();
  return (
    <Dialog
      open={isOpen && type === "editProject"}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Make changes to your project</DialogDescription>
        </DialogHeader>
        {/* Add your form here with data.projectName etc */}
      </DialogContent>
    </Dialog>
  );
};
