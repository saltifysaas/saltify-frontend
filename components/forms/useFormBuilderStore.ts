import { create } from 'zustand';

interface Attribute {
  id: string;
  name: string;
  type: string;
}

interface DataExtension {
  id: string;
  name: string;
  attributes: Attribute[];
}

interface FormBuilderState {
  selectedDE: DataExtension | null;
  setSelectedDE: (de: DataExtension) => void;
  clearSelectedDE: () => void;
}

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  selectedDE: null,
  setSelectedDE: (de) => set({ selectedDE: de }),
  clearSelectedDE: () => set({ selectedDE: null }),
}));
