export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to SALTify</h1>
      <p className="text-lg leading-relaxed max-w-xl">
        The AI-powered commerce engine built for scalability, speed, and seamless multi-tenant onboarding.
      </p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
