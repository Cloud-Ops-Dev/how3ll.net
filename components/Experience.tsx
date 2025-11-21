import { Position } from '@/lib/linkedin-data';

export interface ExperienceProps {
  positions: Position[];
}

export default function Experience({ positions }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-slate-900">Professional Experience</h2>

        <div className="space-y-8">
          {positions.map((position, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-blue-500 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{position.title}</h3>
                  <p className="text-lg text-blue-600 font-semibold">{position.company}</p>
                </div>
                <div className="text-sm text-slate-500 mt-2 md:mt-0">
                  {position.startDate}
                  {position.endDate && ` – ${position.endDate}`}
                </div>
              </div>

              {position.description && (
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {position.description.substring(0, 500)}
                  {position.description.length > 500 && '...'}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
