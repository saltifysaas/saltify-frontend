export default function NotFound() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-1">Contact not found</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        The contact you’re looking for doesn’t exist or was removed.
      </p>
    </div>
  );
}
