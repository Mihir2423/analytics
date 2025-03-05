import { CodeDisplay } from "@/config/code";
import { Copy } from "lucide-react";
import React from "react";

interface ScriptDisplayProps {
  html: string;
  onCopy: () => Promise<void>;
}

export const ScriptDisplay: React.FC<ScriptDisplayProps> = ({
  html,
  onCopy,
}) => (
  <div className="relative mt-4 w-full">
    <button
      onClick={onCopy}
      className="top-4 right-4 absolute hover:bg-neutral-700 p-1 rounded-md transition-colors"
      aria-label="Copy script"
    >
      <Copy size={16} className="text-neutral-300" />
    </button>
    <CodeDisplay html={html} />
  </div>
);
