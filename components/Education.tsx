import { Education } from '@/lib/linkedin-data';

export interface EducationProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationProps) {
  // Remove duplicates by school name
  const uniqueEducation = Array.from(
    new Map(education.map(e => [e.school, e])).values()
  );

  return (
    <section id="education" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-slate-900">Education</h2>

        <div className="space-y-6">
          {uniqueEducation.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-1">
                {edu.school}
              </h3>
              {edu.fieldOfStudy && (
                <p className="text-slate-600 mb-3">{edu.fieldOfStudy}</p>
              )}
              {(edu.startDate || edu.endDate) && (
                <p className="text-sm text-slate-500">
                  {edu.startDate && edu.endDate
                    ? `${edu.startDate} – ${edu.endDate}`
                    : edu.startDate || edu.endDate}
                </p>
              )}
            </div>
          ))}
        </div>

        {uniqueEducation.length === 0 && (
          <p className="text-slate-500 text-center py-8">
            No education information available
          </p>
        )}
      </div>
    </section>
  );
}
