export type FieldType = 'text' | 'email' | 'phone' | 'number' | 'date';

export type DataTable = {
  id: string;
  name: string;
  records: number;
  fields: number;
  updatedAt: string; // ISO
};

export type Segment = {
  id: string;
  tableId: string;
  name: string;
  criteria: string;   // human summary for now
  records: number;
  updatedAt: string;  // ISO
};
