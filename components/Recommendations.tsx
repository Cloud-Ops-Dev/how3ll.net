import { Recommendation } from '@/lib/linkedin-data';

export interface RecommendationsProps {
  recommendations: Recommendation[];
  limit?: number;
}

export default function Recommendations({ recommendations, limit = 6 }: RecommendationsProps) {
  const displayed = recommendations.slice(0, limit);

  return (
    <section id="recommendations" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-slate-900">Recommendations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((rec, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border-t-2 border-blue-500">
              <div className="mb-4">
                <p className="text-slate-700 italic leading-relaxed">"{rec.text}"</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">{rec.author}</p>
                {rec.authorTitle && (
                  <p className="text-sm text-slate-600">{rec.authorTitle}</p>
                )}
                {rec.authorCompany && (
                  <p className="text-sm text-blue-600">{rec.authorCompany}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {recommendations.length > limit && (
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              +{recommendations.length - limit} more recommendations from colleagues and managers
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
