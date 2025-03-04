import { AlertCircle } from "lucide-react";

export const MetadataError = () => {
  return (
    <div className="flex flex-col gap-2 p-3 border border-[#383b4183] rounded-lg">
      <div className="flex flex-col justify-between items-center p-4">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <div className="space-y-2 mt-6">
            <h2 className="font-semibold text-white text-2xl">
              Data Not Found
            </h2>
            <p className="text-[#ffffff9c]">
              <span className="block">
                {"We couldn't find any metadata for this website."}
              </span>
              <span className="block">
                Please check the domain and try again.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
