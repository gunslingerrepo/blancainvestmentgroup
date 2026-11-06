"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CircleAlert, CircleCheck, X } from "lucide-react";

type Toast = { id: number; kind: "success" | "error"; title: string; message?: string };
const Ctx = createContext<(t: Omit<Toast, "id">) => void>(() => {});

export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((all) => [...all, { ...t, id }]);
    setTimeout(() => dismiss(id), 8000);
  }, []);

  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" aria-atomic="false" className="pointer-events-none fixed inset-x-4 bottom-24 z-[70] flex flex-col items-end gap-3 sm:inset-x-auto sm:right-7">
        {toasts.map((t) => (
          <div key={t.id} role={t.kind === "error" ? "alert" : "status"} className="toast-in pointer-events-auto flex w-full max-w-sm gap-3 border-l-4 bg-ink p-4 text-white shadow-2xl" style={{ borderColor: t.kind === "success" ? "#25D366" : "#D9272E" }}>
            {t.kind === "success" ? <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#25D366]" aria-hidden /> : <CircleAlert className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />}
            <div className="flex-1">
              <p className="font-display font-medium">{t.title}</p>
              {t.message && <p className="mt-1 text-sm text-white/70">{t.message}</p>}
            </div>
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="self-start text-white/60 hover:text-white"><X className="size-4" /></button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
