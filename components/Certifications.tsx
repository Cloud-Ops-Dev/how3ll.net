import { Certification } from '@/lib/linkedin-data';

export interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  // Remove duplicates by name
  const uniqueCertifications = Array.from(
    new Map(certifications.map(c => [c.name, c])).values()
  );

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-slate-900">Certifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueCertifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl">🏆</div>
                <h3 className="text-lg font-semibold text-slate-900 flex-1">
                  {cert.name}
                </h3>
              </div>
              {cert.issuer && (
                <p className="text-slate-600 text-sm mb-2">
                  <span className="font-medium">Issuer:</span> {cert.issuer}
                </p>
              )}
              {cert.date && (
                <p className="text-slate-500 text-sm">
                  <span className="font-medium">Date:</span> {cert.date}
                </p>
              )}
              {cert.credentialId && (
                <p className="text-slate-500 text-sm mt-2">
                  <span className="font-medium">ID:</span> {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </div>

        {uniqueCertifications.length === 0 && (
          <p className="text-slate-500 text-center py-8">
            No certifications available
          </p>
        )}
      </div>
    </section>
  );
}
