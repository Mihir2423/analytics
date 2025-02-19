"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/store/store";
import { Package, PackagePlus } from "lucide-react";

export const CreateModal = () => {
  const { isOpen, type, onClose } = useModal();

  return (
    <Dialog
      open={isOpen && type === "createProject"}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="md:w-[600px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            New Project
            <span>
              <PackagePlus size={16} className="font-normal" />
            </span>
          </DialogTitle>
          <DialogDescription className="h-full">
            <div className="flex flex-col items-start gap-2 mt-2 py-2 border-[#383b4183] border-b">
              <Package size={18} className="ml-2" />
              <Input
                style={{ fontSize: "24px" }}
                className="bg-transparent px-2 py-1 border-0 outline-0 h-full font-medium text-white placeholder:text-[24px] placeholder:text-[#626366]"
                placeholder="Project name"
              />
            </div>
            <div className="mt-4">
              <Textarea
                style={{ fontSize: "16px" }}
                className="bg-transparent px-2 py-1 border-0 outline-0 h-[320px] font-medium text-white placeholder:text-[16px] placeholder:text-[#626366] resize-none"
                placeholder="Write a description, a project brief..."
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-2 pt-3 border-[#383b4183] border-t">
          <button
            onClick={onClose}
            className="bg-[#323232] hover:bg-[#32323298] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-[#3d7682] hover:bg-[#3d7782c3] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            Create Project
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
