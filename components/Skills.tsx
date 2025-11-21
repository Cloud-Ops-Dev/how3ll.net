import { Skill } from '@/lib/linkedin-data';

export interface SkillsProps {
  skills: Skill[];
  topCount?: number;
}

export default function Skills({ skills, topCount = 20 }: SkillsProps) {
  const topSkills = skills.slice(0, topCount);
  const maxEndorsements = topSkills[0]?.endorsements || 1;

  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white">Skills & Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSkills.map((skill, idx) => {
            const percentage = (skill.endorsements / maxEndorsements) * 100;
            return (
              <div key={idx} className="bg-slate-800 rounded-lg p-5 hover:bg-slate-700 transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  {skill.endorsements > 0 && (
                    <span className="text-sm text-blue-300 font-medium bg-blue-900 px-2 py-1 rounded">
                      {skill.endorsements}
                    </span>
                  )}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {skills.length > topCount && (
          <div className="mt-8 text-center">
            <p className="text-slate-400">
              +{skills.length - topCount} more skills at the intersection of cloud ops, security, and automation
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
