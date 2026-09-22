import React from 'react';
import TelemetryBadge from './TelemetryBadge';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  telemetry: string;
  tags: string[];
  loopSteps?: string[];
}

interface ProjectGridProps {
  projects: ProjectItem[];
}

/**
 * ProjectGrid Component with 'Circuit Isolation' Hover Effect
 * Implements Tailwind CSS group classes (group/grid) so hovering over one card
 * dims all sibling cards to opacity-30 while hovered card stays opacity-100 & scale-[1.01].
 */
export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="group/grid grid grid-cols-1 gap-12 max-w-6xl mx-auto py-12">
      {projects.map((project) => (
        <article
          key={project.id}
          className="group/card group-hover/grid:opacity-30 hover:!opacity-100 transition-all duration-300 ease-out transform hover:scale-[1.01] bg-[#121212] border border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-stretch"
        >
          {/* Glassmorphic Telemetry Status Badge */}
          <div className="absolute top-6 right-6 z-20">
            <TelemetryBadge statusText={project.telemetry} />
          </div>

          {/* Project Visual Container */}
          <div className="md:w-1/2 bg-[#1a1a1a] border border-white/5 rounded-xl p-8 flex flex-col justify-between relative min-h-[260px] overflow-hidden">
            <span className="text-4xl font-black text-white/20 tracking-tighter font-serif">
              {project.title}
            </span>
            {project.loopSteps && project.loopSteps.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400/90 pt-6">
                {project.loopSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span>{step}</span>
                    {idx < project.loopSteps!.length - 1 && (
                      <span className="text-white/30">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="md:w-1/2 flex flex-col justify-between pt-2">
            <div>
              <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">
                {project.index}
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white mt-1">
                {project.title}
              </h3>
              <p className="text-xs font-mono tracking-wider text-neutral-400 mt-1 uppercase">
                {project.subtitle}
              </p>
              <p className="text-sm text-neutral-300 mt-4 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[0.7rem] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white hover:text-emerald-400 transition-colors uppercase font-bold"
              >
                VIEW PROJECT ↗
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
