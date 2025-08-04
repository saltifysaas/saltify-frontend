"use client";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { GripVertical } from "lucide-react";

type Field = {
  id: string;
  label: string;
};

function SortableField({ field }: { field: Field }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white text-[#00332D] px-4 py-3 rounded-md shadow flex items-center justify-between mb-2"
    >
      <span>{field.label}</span>
      <button {...attributes} {...listeners} className="cursor-grab text-gray-400">
        <GripVertical />
      </button>
    </div>
  );
}

export default function FormCanvas() {
  const [fields, setFields] = useState<Field[]>([
    { id: "1", label: "Full Name" },
    { id: "2", label: "Email Address" },
    { id: "3", label: "Phone Number" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-md min-h-[400px] border border-dashed border-gray-300">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {fields.map((field) => (
            <SortableField key={field.id} field={field} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
