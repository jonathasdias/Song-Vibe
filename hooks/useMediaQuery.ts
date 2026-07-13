"use client";

import { useSyncExternalStore } from "react";

// Função utilitária que não faz nada no servidor
const subscribe = (query: string) => (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches, // Snapshot do cliente
    () => false // Snapshot do servidor (deve ser fixo)
  );
}
