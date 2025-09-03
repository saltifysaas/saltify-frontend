export type SegmentSourceType = 'contacts' | 'datatable';

export type SegmentSource = {
  id: string;                 // 'contacts' OR datatable id e.g., 'tbl_products'
  type: SegmentSourceType;
  name: string;               // Human label: 'Contacts', 'Products'
};

export type SegmentConditionOp =
  | 'eq' | 'neq' | 'in' | 'nin'
  | 'gt' | 'gte' | 'lt' | 'lte'
  | 'contains' | 'startsWith' | 'endsWith'
  | 'isEmpty' | 'notEmpty';

export type SegmentCondition = {
  sourceId: string;           // which source this field belongs to
  field: string;              // e.g., 'email', 'status', 'price'
  op: SegmentConditionOp;
  value?: string | number | boolean | Array<string | number>;
};

export type SegmentLogic = 'AND' | 'OR';

export type SegmentRuleGroup = {
  logic: SegmentLogic;        // how to combine conditions/groups at this level
  conditions?: SegmentCondition[];
  groups?: SegmentRuleGroup[];
};

export type Segment = {
  id: string;
  name: string;
  sources: SegmentSource[];   // one or more sources
  rule: SegmentRuleGroup;     // tree of conditions
  records: number;            // matched count (computed)
  updatedAt: string;          // ISO
  // Optional human-friendly preview
  criteriaText?: string;
};
