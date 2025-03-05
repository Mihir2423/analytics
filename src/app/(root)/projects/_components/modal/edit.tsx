"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/store/store";
import { Package, PackagePlus } from "lucide-react";
import { useState, useCallback, memo, useEffect } from "react";
import { useRouter } from "next/navigation";

export const EditModal = memo(() => {
  const { isOpen, type, onClose, data: modalData } = useModal();
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    domain: "",
    description: "",
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (modalData) {
      setData({
        name: modalData.name,
        domain: modalData.domain,
        description: modalData.description,
      });
    }
  }, [modalData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );

  const onSubmit = useCallback(async () => {
    if (!data.name || !data.domain || !data.description) {
      return toast.error("Please fill all the fields");
    }
    setUpdating(true);
    try {
      const res = await axios.patch(`/api/project/${modalData?.id}`, data);
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
      toast.success("Project updated successfully");
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    } finally {
      setUpdating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, modalData, onClose]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [onSubmit]);

  return (
    <Dialog
      open={isOpen && type === "editProject"}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="md:w-[600px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Project
            <span>
              <PackagePlus size={16} className="font-normal" />
            </span>
          </DialogTitle>
          <div className="px-4 h-full">
            <div className="flex flex-col items-start gap-2 mt-2 py-2 border-[#383b4183] border-b">
              <Package size={18} className="ml-2 text-[#626366]" />
              <Input
                style={{ fontSize: "24px" }}
                className="bg-transparent px-2 py-1 border-0 outline-0 h-full font-medium text-white placeholder:text-[24px] placeholder:text-[#626366]"
                placeholder="Project name"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <Input
                style={{ fontSize: "16px" }}
                className="bg-transparent px-2 py-1 border-0 outline-0 h-full font-medium text-white placeholder:text-[16px] placeholder:text-[#626366]"
                placeholder="Domain (mihircodes.in)"
                name="domain"
                value={data.domain}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <Textarea
                style={{ fontSize: "14px" }}
                className="bg-transparent px-2 py-1 border-0 outline-0 h-[320px] font-medium text-white placeholder:text-[14px] placeholder:text-[#626366] resize-none"
                placeholder="Write a description, a project brief..."
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="px-2 pt-3 border-[#383b4183] border-t">
          <button
            onClick={onClose}
            className="bg-[#323232] hover:bg-[#32323298] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-[#3d7682] hover:bg-[#3d7782c3] px-6 py-0 rounded-lg w-fit h-8 text-white text-xs"
          >
            {updating ? "Updating..." : "Update Project"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

EditModal.displayName = "EditModal";
