export default function CreateSegmentPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create Segment</h1>
      <p className="opacity-70 text-sm">
        Choose sources (Contacts, specific Data Tables) and define criteria.
      </p>

      <div className="rounded-md border p-4 space-y-4">
        <div className="opacity-70 text-sm">Source picker UI (chips) goes here.</div>
        <div className="opacity-70 text-sm">Criteria builder UI (groups, conditions) goes here.</div>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-md border">Cancel</button>
        <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground">Save Segment</button>
      </div>
    </div>
  );
}
