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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(`/api/project/${data.id}`);
      if (res.data.success) {
        toast.success("Project deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("", error);
      toast.error("An error occurred while deleting the project");
    } finally {
      setDeleting(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen && type === "deleteProject"}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {data?.name}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="px-2">
          <button
            onClick={onClose}
            disabled={deleting}
            className="bg-[#323232] hover:bg-[#32323298] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-[#823d3d] hover:bg-[#823d3dc3] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
