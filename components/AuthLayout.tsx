"use client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#cbddd1] flex items-center justify-center">
      <div className="w-[500px] p-4 rounded-xl bg-[#0f2b22] text-white">
        {/* Brand Header */}
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-semibold">Saltify</h1>
        </div>

        {children}
      </div>
    </main>
  );
}
