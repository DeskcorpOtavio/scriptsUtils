import { useState, useRef, useCallback } from "react";
import type { Toast } from "../types";

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const pushToast = useCallback((message: string, type: Toast["type"]) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const onSuccess = useCallback(
    (msg: string) => pushToast(msg, "success"),
    [pushToast]
  );

  const onError = useCallback(
    (msg: string) => pushToast(msg, "error"),
    [pushToast]
  );

  return { toasts, pushToast, removeToast, onSuccess, onError };
}
