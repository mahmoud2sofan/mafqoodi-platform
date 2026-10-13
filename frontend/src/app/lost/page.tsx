import React from "react";

export default function LostItemsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
          قريباً | Coming Soon
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
          تصفح المفقودات
        </h1>
        <p className="text-slate-500 mb-6 leading-relaxed">
          صفحة تصفح المفقودات قيد التطوير وستكون متاحة في المرحلة الثالثة من المشروع.
        </p>
        <a
          href="/"
          className="inline-block px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
        >
          ← العودة إلى الرئيسية
        </a>
      </div>
    </main>
  );
}

