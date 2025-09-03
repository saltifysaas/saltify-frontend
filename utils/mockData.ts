import { type DataTable } from '@/types/datatable';
import { type Segment } from '@/types/segment';

export const MOCK_TABLES: DataTable[] = [
  { id: 'tbl_contacts', name: 'Contacts', records: 1289, fields: 16, updatedAt: new Date().toISOString() },
  { id: 'tbl_products', name: 'Products', records: 312,  fields: 12, updatedAt: new Date().toISOString() },
];

export const MOCK_SEGMENTS: Segment[] = [
  {
    id: 'seg_active_buyers',
    name: 'Active Buyers (last 30d)',
    sources: [
      { id: 'contacts', type: 'contacts', name: 'Contacts' },
      { id: 'tbl_products', type: 'datatable', name: 'Products' },
    ],
    rule: {
      logic: 'AND',
      conditions: [
        { sourceId: 'contacts', field: 'status', op: 'eq', value: 'active' },
      ],
      groups: [
        {
          logic: 'OR',
          conditions: [
            { sourceId: 'contacts', field: 'last_seen_days', op: 'lt', value: 30 },
            { sourceId: 'tbl_products', field: 'purchases_30d', op: 'gt', value: 0 },
          ],
        },
      ],
    },
    records: 342,
    updatedAt: new Date().toISOString(),
    criteriaText: "Contacts.status = 'active' AND (Contacts.last_seen_days < 30 OR Products.purchases_30d > 0)",
  },
  {
    id: 'seg_high_value',
    name: 'High Value Customers',
    sources: [{ id: 'contacts', type: 'contacts', name: 'Contacts' }],
    rule: {
      logic: 'AND',
      conditions: [
        { sourceId: 'contacts', field: 'lifetime_value', op: 'gte', value: 50000 },
      ],
    },
    records: 88,
    updatedAt: new Date().toISOString(),
    criteriaText: 'Contacts.lifetime_value >= 50000',
  },
];
