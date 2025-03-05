"use client";

import { codeToHtml } from "shiki";
import React from "react";

export async function NextJsScript() {
  const html = await codeToHtml(nextJsScript, {
    lang: "tsx",
    theme: "github-dark",
  });

  return html;
}

export function CodeDisplay({ html }: { html: string }) {
  return (
    <div className="h-[500px]">
      <div
        className="p-5 text-sm leading-[1.6rem] bg-zinc-900 dark:bg-transparent rounded-lg [&>pre]:!bg-transparent [&>pre]:!p-0 [&_.line-number]:pr-4 [&_.line-number]:text-zinc-500 [&_.line-number]:border-r [&_.line-number]:border-zinc-700 [&_.line-number]:mr-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export const nextJsScript = `import Script from "next/script";
<Script
  defer
  data-domain="your-domain.com" // Replace with your domain
  src="https://analytics-code.vercel.app/tracking-script.js"
/>`;
