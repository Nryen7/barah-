export function AcademicCredits() {
  return (
    <section
      lang="ar"
      dir="rtl"
      aria-labelledby="academic-credits-title"
      className="border-b border-white/10 py-10 text-center font-sans-ar text-sm leading-loose text-[#F8F5EF]/85 sm:py-12"
    >
      <div className="mx-auto max-w-xl space-y-5">
        <div className="space-y-2">
          <h2 id="academic-credits-title" className="text-xl font-bold text-[#E0D3BE]">
            براح | <bdi lang="en">BARAH</bdi>
          </h2>
          <p>مشروع مقدم لاستكمال متطلبات التخرج في بكالوريوس السياحة</p>
        </div>
        <div>
          <h3 className="mb-2 font-bold text-[#E0D3BE]">إعداد الطالبات:</h3>
          <p>منار زكريا الشروقي</p>
          <p>ملاك السيد حيدر محمد</p>
        </div>
        <div className="space-y-1">
          <p><strong className="font-bold text-[#E0D3BE]">المقرر:</strong> <bdi lang="en">TOUR498</bdi></p>
          <p className="text-xs leading-loose text-[#F8F5EF]/70 sm:text-sm">
            جامعة البحرين | العام الجامعي <bdi dir="ltr">2026–2027</bdi>
          </p>
        </div>
      </div>
    </section>
  );
}
