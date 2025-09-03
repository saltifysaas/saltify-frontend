// components/settings/AltmanChat.tsx
'use client';

import React, { useEffect, useRef, useState } from "react";
import { Bot, SendHorizontal, X } from "lucide-react";
import clsx from "clsx";

export default function AltmanChat({ activeTab }: { activeTab: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "altman"; text: string }[]>([
    { role: "altman", text: "I’m Altman. Ask me anything about this tab." },
  ]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const onSend = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { role: "user", text: draft.trim() }]);
    // Placeholder echo — wire to your API later
    setTimeout(() => {
      setMessages((m) => [...m, { role: "altman", text: "Noted. Let me guide you." }]);
    }, 250);
    setDraft("");
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full",
          "px-4 py-2 border shadow-lg hover:shadow-xl transition",
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        )}
        aria-label="Ask Altman"
      >
        <Bot className="h-5 w-5" />
        <span className="text-sm font-medium">Ask Altman</span>
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className={clsx(
            "fixed z-50",
            "bottom-6 right-6",
            "w-[360px] max-w-[92vw] h-[60vh] max-h-[640px]",
            "rounded-lg border shadow-2xl",
            "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85",
            "flex flex-col"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Altman chat"
        >
          <div className="flex items-center gap-2 p-3 border-b">
            <Bot className="h-4 w-4" />
            <div className="font-medium">Altman</div>
            <div className="ml-auto text-xs text-muted-foreground">Tab: {activeTab}</div>
            <button
              onClick={() => setOpen(false)}
              className="ml-2 rounded-md p-1 hover:bg-muted/50"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={clsx(
                  "max-w-[85%] rounded-md px-3 py-2 text-sm border",
                  m.role === "user" ? "ml-auto" : "mr-auto bg-muted/50"
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Ask Altman about this tab…"
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={onSend}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/50"
            >
              <SendHorizontal className="h-4 w-4" />
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
