import { create } from "zustand";

export type BuilderMode = "form" | "page";

export type FormLayoutType =
  | "linear"
  | "two-column"
  | "multi-page"
  | "card"
  | "popup";

interface BuilderState {
  mode: BuilderMode;
  setMode: (mode: BuilderMode) => void;

  formLayoutType: FormLayoutType;
  setFormLayoutType: (type: FormLayoutType) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  mode: "page",
  setMode: (mode) => set({ mode }),

  formLayoutType: "linear",
  setFormLayoutType: (type) => set({ formLayoutType: type }),
}));
