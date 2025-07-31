"use client";

import { useState } from "react";
import {
  Plus,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Upload,
  Link,
  Copy,
  FileCode2,
  ImageIcon,
  FileVideo,
  FormInput,
  LayoutTemplate,
  Text,
  UploadCloud,
  Code2,
  Trash2,
  ArrowUp,
  ArrowDown,
  CopyPlus,
} from "lucide-react";

interface Row {
  id: string;
  columns: number;
  columnWidths: number[];
}

export default function CanvasBuilder() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const createRow = (position?: number) => {
    const newRow: Row = {
      id: `row-${Date.now()}`,
      columns: 1,
      columnWidths: [100],
    };
    if (typeof position === "number") {
      setRows((prev) => [
        ...prev.slice(0, position),
        newRow,
        ...prev.slice(position),
      ]);
    } else {
      setRows((prev) => [...prev, newRow]);
    }
    setSelectedRow(newRow.id);
  };

  const updateRowConfig = (rowId: string, columns: number) => {
    const widthPerColumn = Math.floor((100 / columns) * 100) / 100;
    const adjustedWidths = Array(columns).fill(widthPerColumn);
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              columns,
              columnWidths: adjustedWidths,
            }
          : row
      )
    );
  };

  const updateColumnWidth = (rowId: string, index: number, width: number) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row;
        const updatedWidths = [...row.columnWidths];
        updatedWidths[index] = width;
        return { ...row, columnWidths: updatedWidths };
      })
    );
  };

  const moveRow = (rowIndex: number, direction: "up" | "down") => {
    if (
      (direction === "up" && rowIndex === 0) ||
      (direction === "down" && rowIndex === rows.length - 1)
    )
      return;
    const newRows = [...rows];
    const [movedRow] = newRows.splice(rowIndex, 1);
    newRows.splice(direction === "up" ? rowIndex - 1 : rowIndex + 1, 0, movedRow);
    setRows(newRows);
  };

  const deleteRow = (rowId: string) => {
    setRows((prev) => prev.filter((r) => r.id !== rowId));
    if (selectedRow === rowId) setSelectedRow(null);
  };

  const duplicateRow = (rowIndex: number) => {
    const rowToDuplicate = rows[rowIndex];
    const newRow: Row = {
      id: `row-${Date.now()}`,
      columns: rowToDuplicate.columns,
      columnWidths: [...rowToDuplicate.columnWidths],
    };
    const newRows = [...rows];
    newRows.splice(rowIndex + 1, 0, newRow);
    setRows(newRows);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="w-full bg-[#00390d] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Untitled Page"
            className="bg-transparent text-white border-b border-white/30 focus:outline-none focus:border-white px-2 py-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm hover:underline">
            <Monitor className="w-4 h-4" /> Desktop
          </button>
          <button className="flex items-center gap-1 text-sm hover:underline">
            <Tablet className="w-4 h-4" /> Tablet
          </button>
          <button className="flex items-center gap-1 text-sm hover:underline">
            <Smartphone className="w-4 h-4" /> Mobile
          </button>
          <span className="w-px h-4 bg-white/30 mx-2" />
          <button className="flex items-center gap-1 text-sm hover:underline">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button className="flex items-center gap-1 text-sm hover:underline">
            <Upload className="w-4 h-4" /> Publish
          </button>
          <button className="flex items-center gap-1 text-sm hover:underline">
            <Copy className="w-4 h-4" /> Clone
          </button>
          <button className="flex items-center gap-1 text-sm hover:underline">
            <Link className="w-4 h-4" /> Copy Link
          </button>
          <button className="flex items-center gap-1 text-sm hover:underline">
            <FileCode2 className="w-4 h-4" /> Embed Code
          </button>
        </div>
      </div>

      <div className="flex w-full flex-1">
        <aside className="w-[200px] border-r border-gray-200 bg-white p-4 text-sm space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Building Blocks</h3>
            <ul className="space-y-1">
              <li className="flex items-center gap-2"><Text className="w-4 h-4" /> Text</li>
              <li className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Image</li>
              <li className="flex items-center gap-2"><FileVideo className="w-4 h-4" /> GIF</li>
              <li className="flex items-center gap-2"><FileVideo className="w-4 h-4" /> Video</li>
              <li className="flex items-center gap-2"><Code2 className="w-4 h-4" /> HTML/JS</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Brand Centre</h3>
            <ul className="space-y-1">
              <li>Logos</li>
              <li>Icons</li>
              <li>Headers</li>
              <li>Footers</li>
              <li>Saved Components</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Templates</h3>
            <ul className="space-y-1">
              <li><LayoutTemplate className="w-4 h-4 inline mr-1" /> Prebuilt Pages</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Forms</h3>
            <ul className="space-y-1">
              <li><FormInput className="w-4 h-4 inline mr-1" /> Add Form</li>
            </ul>
          </div>
        </aside>

        <main className="flex-1 bg-[#f9fafb] p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="group relative">
              <button
                onClick={() => createRow(0)}
                className="w-full border border-dashed border-gray-300 text-gray-400 py-1 text-xs rounded hover:bg-gray-50 invisible group-hover:visible"
              >
                <Plus className="w-4 h-4 inline" /> Add Section Here
              </button>
            </div>

            {rows.map((row, index) => (
              <div
                key={row.id}
                className="group relative hover:pt-8 transition-all duration-200"
                onMouseEnter={() => setSelectedRow(row.id)}
                onMouseLeave={() => setSelectedRow(null)}
              >
                {index > 0 && (
                  <button
                    onClick={() => createRow(index)}
                    className="w-full border border-dashed border-gray-300 text-gray-400 py-1 text-xs rounded hover:bg-gray-50 invisible group-hover:visible"
                  >
                    <Plus className="w-4 h-4 inline" /> Add Section Here
                  </button>
                )}

                <div className="flex w-full gap-0 relative group">
                  {selectedRow === row.id && (
                    <div className="absolute top-0 right-2 flex gap-1 bg-white/90 px-2 py-1 rounded shadow text-gray-600">
                      <button onClick={() => moveRow(index, "up")} title="Move Up">
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => moveRow(index, "down")} title="Move Down">
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button onClick={() => duplicateRow(index)} title="Duplicate">
                        <CopyPlus className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteRow(row.id)} title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {row.columnWidths.map((width, colIdx) => (
                    <div
                      key={colIdx}
                      className="border border-dashed border-gray-400 flex items-center justify-center text-sm text-gray-500"
                      style={{
                        width: `${width}%`,
                        height: "100px",
                        minWidth: 0,
                        backgroundColor: "#fff",
                      }}
                    >
                      +
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => createRow()}
              className="w-full border border-dashed border-gray-400 text-gray-600 py-2 rounded hover:bg-white text-sm flex justify-center items-center gap-2 mt-4"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>
          </div>
        </main>

        <aside className="w-[280px] border-l border-gray-200 bg-white p-4 text-sm">
          <h3 className="font-semibold mb-2">Row Configuration</h3>
          {selectedRow ? (
            <>
              <label className="block text-xs text-gray-600 mb-1">Columns</label>
              <input
                type="number"
                min={1}
                max={10}
                value={
                  rows.find((r) => r.id === selectedRow)?.columns ?? 1
                }
                onChange={(e) =>
                  updateRowConfig(selectedRow, parseInt(e.target.value, 10))
                }
                className="w-full border rounded px-2 py-1 mb-4"
              />
              <div className="space-y-2">
                {rows
                  .find((r) => r.id === selectedRow)
                  ?.columnWidths.map((w, i) => (
                    <div key={i}>
                      <label className="text-xs text-gray-600">Col {i + 1} width (%)</label>
                      <input
                        type="number"
                        value={w}
                        onChange={(e) =>
                          updateColumnWidth(
                            selectedRow,
                            i,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Select a row to configure</p>
          )}
        </aside>
      </div>
    </div>
  );
}
