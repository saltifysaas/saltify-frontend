// components/canvas/FieldPalette.tsx
"use client";

import { useDraggable } from "@dnd-kit/core";

const fields = [
  { id: "text", label: "Text Field" },
  { id: "email", label: "Email Field" },
  { id: "checkbox", label: "Checkbox" },
  { id: "dropdown", label: "Dropdown" },
];

function DraggableItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      type: "field",
      fieldType: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 bg-gray-800 border border-gray-600 rounded text-sm cursor-grab hover:bg-gray-700"
    >
      {label}
    </div>
  );
}

export default function FieldPalette() {
  return (
    <div className="w-56 space-y-2 p-4 bg-[#1f2937] border-r border-gray-700">
      <h2 className="text-sm font-bold text-gray-300 mb-2">Form Fields</h2>
      {fields.map((f) => (
        <DraggableItem key={f.id} id={f.id} label={f.label} />
      ))}
    </div>
  );
}
