'use client';

import { useMemo, useState, useCallback } from 'react';
import clsx from 'clsx';

type SortDir = 'asc' | 'desc' | null;
type Row = Record<string, unknown>;

export type Column<T extends Row> = {
  key: keyof T | string;
  label: string;
  widthClass?: string; // e.g. "w-64"
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortAccessor?: (row: T) => string | number | Date | null | undefined;
};

interface ModuleListViewProps<T extends Row> {
  columns: Column<T>[];
  data: T[];
  idKey?: keyof T | string;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  renderBulkActions?: (selectedRows: T[]) => React.ReactNode;
  stickyHeader?: boolean;
}

function defaultCompare(a: unknown, b: unknown) {
  const va = a instanceof Date ? a.getTime() : a ?? '';
  const vb = b instanceof Date ? b.getTime() : b ?? '';
  if (typeof va === 'string' && typeof vb === 'string') {
    return va.localeCompare(vb, undefined, { sensitivity: 'base', numeric: true });
  }
  if (typeof va === 'number' && typeof vb === 'number') return va - vb;
  return String(va).localeCompare(String(vb), undefined, { sensitivity: 'base', numeric: true });
}

export default function ModuleListView<T extends Row>({
  columns,
  data,
  idKey = 'id',
  loading = false,
  emptyMessage = 'No records found',
  className,
  onRowClick,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  renderBulkActions,
  stickyHeader = true,
}: ModuleListViewProps<T>) {
  // Sorting
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  // Pagination
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [page, setPage] = useState(1); // 1-based

  // Selection (page-scoped)
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    const col = columns.find((c) => String(c.key) === sortKey);
    const accessor = (row: T) => {
      if (col?.sortAccessor) return col.sortAccessor(row);
      const raw = (row as Record<string, unknown>)[sortKey];
      return raw as unknown;
    };
    const copy = [...data];
    copy.sort((ra, rb) => {
      const a = accessor(ra);
      const b = accessor(rb);
      const cmp = defaultCompare(a, b);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [data, columns, sortKey, sortDir]);

  // Pagination slice
  const total = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const pageRows = sortedData.slice(startIdx, endIdx);

  // Key handling
  const idKeyStr = String(idKey as string);
  const getRowKey = useCallback(
    (row: T, idxInPage: number) => {
      const raw = (row as Record<string, unknown>)[idKeyStr];
      return raw === null || raw === undefined || raw === ''
        ? `__row_${startIdx + idxInPage}`
        : String(raw);
    },
    [idKeyStr, startIdx]
  );

  // Selected rows (current page only)
  const pageIds = pageRows.map((r, i) => getRowKey(r, i));
  const selectedCount = pageIds.filter((id) => selected[id]).length;
  const allPageSelected = pageIds.length > 0 && selectedCount === pageIds.length;
  const somePageSelected = selectedCount > 0 && selectedCount < pageIds.length;

  function toggleSort(key: string, enabled?: boolean) {
    if (!enabled) return;
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
      return;
    }
    if (sortDir === 'asc') setSortDir('desc');
    else if (sortDir === 'desc') setSortDir(null);
    else setSortDir('asc');
  }

  function toggleRow(idStr: string) {
    setSelected((prev) => ({ ...prev, [idStr]: !prev[idStr] }));
  }

  function toggleSelectAllPage() {
    if (allPageSelected) {
      setSelected((prev) => {
        const next = { ...prev };
        pageIds.forEach((id) => delete next[id]);
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = { ...prev };
        pageIds.forEach((id) => {
          next[id] = true;
        });
        return next;
      });
    }
  }

  const selectedRows = useMemo(
    () => pageRows.filter((r, i) => selected[getRowKey(r, i)]),
    [pageRows, selected, getRowKey]
  );

  // UI
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500 dark:text-gray-400">
        Loading…
      </div>
    );
  }

  if (!loading && total === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={clsx('flex flex-col', className)}>
      {/* Bulk actions */}
      {renderBulkActions && selectedRows.length > 0 && (
        <div className="flex items-center justify-between gap-3 px-3 py-2 mb-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a]">
          <div className="text-sm text-gray-700 dark:text-gray-200">{selectedRows.length} selected</div>
          <div className="flex items-center gap-2">{renderBulkActions(selectedRows)}</div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className={clsx('bg-gray-100 dark:bg-gray-800', stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {/* Select column */}
              <th className="px-3 py-2 w-[44px] text-left border-b border-gray-200 dark:border-gray-700">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    aria-label="Select all on page"
                    checked={allPageSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = somePageSelected;
                    }}
                    onChange={toggleSelectAllPage}
                    className="h-4 w-4 accent-blue-600"
                  />
                </label>
              </th>

              {columns.map((col) => {
                const keyStr = String(col.key);
                const isSorted = sortKey === keyStr && !!sortDir;
                const align = col.align ?? 'left';
                return (
                  <th
                    key={keyStr}
                    className={clsx(
                      'px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap',
                      col.widthClass,
                      align === 'center' && 'text-center',
                      align === 'right' && 'text-right',
                      col.sortable && 'cursor-pointer select-none'
                    )}
                    onClick={() => toggleSort(keyStr, col.sortable)}
                    title={col.sortable ? 'Click to sort' : undefined}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>{col.label}</span>
                      {col.sortable && <span className="text-xs opacity-70">{isSorted ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}</span>}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {pageRows.map((row, idx) => {
              const rowKey = getRowKey(row, idx);
              const clickable = !!onRowClick;
              return (
                <tr
                  key={rowKey}
                  className={clsx(
                    'border-b border-gray-200 dark:border-gray-700',
                    clickable ? 'hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer' : 'hover:bg-gray-50/60 dark:hover:bg-gray-900/60'
                  )}
                  onClick={() => clickable && onRowClick!(row)}
                >
                  {/* Checkbox */}
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label="Select row"
                      checked={!!selected[rowKey]}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleRow(rowKey)}
                      className="h-4 w-4 accent-blue-600"
                    />
                  </td>

                  {columns.map((col) => {
                    const keyStr = String(col.key);
                    const value = (row as Record<string, unknown>)[keyStr];
                    const align = col.align ?? 'left';

                    // Safe default cell rendering:
                    const cell =
                      col.render?.(value, row) ??
                      (value === null || value === undefined
                        ? '—'
                        : typeof value === 'object'
                        ? JSON.stringify(value)
                        : String(value));

                    return (
                      <td
                        key={keyStr}
                        className={clsx(
                          'px-4 py-2 text-gray-800 dark:text-gray-100',
                          col.widthClass,
                          align === 'center' && 'text-center',
                          align === 'right' && 'text-right'
                        )}
                        onClick={(e) => {
                          // prevent row click from firing when interacting inside cells (links, buttons)
                          if ((e.target as HTMLElement).closest('button,a,input,svg')) {
                            e.stopPropagation();
                          }
                        }}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <div className="text-xs text-gray-600 dark:text-gray-300">
          Showing <span className="font-medium">{total === 0 ? 0 : startIdx + 1}</span>–
          <span className="font-medium">{endIdx}</span> of <span className="font-medium">{total}</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="h-8 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-sm px-2"
            value={pageSize}
            onChange={(e) => {
              const next = Number(e.target.value);
              setPageSize(next);
              const nextTotalPages = Math.max(1, Math.ceil(total / next));
              setPage((p) => Math.min(p, nextTotalPages));
            }}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <button
              className="px-2 h-8 rounded-md border border-gray-300 dark:border-gray-700 disabled:opacity-50"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="mx-1 text-sm">
              Page <span className="font-medium">{safePage}</span> / {totalPages}
            </span>
            <button
              className="px-2 h-8 rounded-md border border-gray-300 dark:border-gray-700 disabled:opacity-50"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
