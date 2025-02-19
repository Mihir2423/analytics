"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

        <DialogFooter className="px-2">
          <button
            onClick={onClose}
            className="bg-[#323232] hover:bg-[#32323298] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-[#823d3d] hover:bg-[#823d3dc3] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
