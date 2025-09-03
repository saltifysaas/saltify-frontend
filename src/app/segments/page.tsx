import ModuleHomeHeader from '@/components/module/ModuleHomeHeader';
import { MOCK_SEGMENTS } from '@/utils/mockData';
import SegmentsClient from '@/components/segments/SegmentsClient';

export default function SegmentsHome() {
  return (
    <div className="p-6">
      <ModuleHomeHeader
        title="Segments"
        subtitle="Build criteria-based audiences across Contacts and Data Tables."
        actions={[{ label: 'Create Segment', href: '/segments/create' }]}
      />
      <div className="mt-6">
        <SegmentsClient data={MOCK_SEGMENTS} />
      </div>
    </div>
  );
}
