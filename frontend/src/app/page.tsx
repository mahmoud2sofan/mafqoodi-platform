import React from "react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
          مرحباً بكم في مفقودي | Mafqoodi
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
          المنصة الذكية للمفقودات في فلسطين
        </h1>
        <p className="text-slate-600 mb-6 leading-relaxed">
          نساعدك في الإبلاغ عن المقتنيات المفقودة والمعثور عليها، والتحقق الآمن من الملكية باستخدام الذكاء الاصطناعي.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/report-item"
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            الإبلاغ عن مفقود أو معثور عليه
          </a>
          <a
            href="/lost"
            className="px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
          >
            تصفح المفقودات
          </a>
        </div>
      </div>
    </main>
  );
}

