import { ProjectEntry } from '@/lib/linkedin-data';

export interface ProjectsProps {
  projects: ProjectEntry[];
  limit?: number;
}

export default function Projects({ projects, limit }: ProjectsProps) {
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white">Featured Projects</h2>

        <div className="space-y-8">
          {displayProjects.map((project, idx) => (
            <div
              key={idx}
              className="bg-slate-800 rounded-lg p-8 border-l-4 border-blue-500 hover:bg-slate-750 transition"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold text-white flex-1">
                  {project.title}
                </h3>
                <div className="text-blue-400 text-3xl">→</div>
              </div>

              <p className="text-slate-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                {(project.startDate || project.endDate) && (
                  <div className="text-sm text-slate-400">
                    <span className="font-medium">Timeline:</span>{' '}
                    {project.startDate && project.endDate
                      ? `${project.startDate} – ${project.endDate}`
                      : project.startDate || project.endDate || 'Ongoing'}
                  </div>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-medium"
                  >
                    View Project
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length > (limit || projects.length) && (
          <div className="mt-12 text-center">
            <p className="text-slate-400">
              +{projects.length - (limit || projects.length)} more projects
            </p>
          </div>
        )}

        {displayProjects.length === 0 && (
          <p className="text-slate-400 text-center py-8">
            No projects available
          </p>
        )}
      </div>
    </section>
  );
}
