import React from 'react';
import type { IProject } from '../interfaces';
import { Server, Settings, Trash2, Edit2, Activity, Shield, Box } from 'lucide-react';

interface ProjectCardProps {
  project: IProject;
  onEdit: (project: IProject) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const getEnvColor = (env: IProject['environment']) => {
    switch (env) {
      case 'Production':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Staging':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Development':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <Box className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{project.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{project.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors"
              title="Edit Project"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getEnvColor(project.environment)}`}>
            <Activity className="w-3.5 h-3.5 mr-1.5" />
            {project.environment}
          </span>
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 flex-1 bg-white dark:bg-slate-900">
        <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
          <Server className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
          API Endpoints
          <span className="ml-2 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-xs font-semibold">
            {project.services.length}
          </span>
        </div>

        {project.services.length > 0 ? (
          <div className="space-y-3">
            {project.services.map((service) => (
              <div key={service.id} className="group/service p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{service.serviceName}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide ${
                    service.method === 'GET' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    service.method === 'POST' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                    service.method === 'DELETE' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {service.method}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <code className="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50 px-1.5 py-0.5 rounded font-mono truncate max-w-45" title={service.endpoint}>
                    {service.endpoint}
                  </code>
                  <div className="flex items-center text-slate-400 dark:text-slate-500">
                    <Shield className="w-3 h-3 mr-1" />
                    {service.authType}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-24 text-slate-400 dark:text-slate-500">
            <Settings className="w-6 h-6 mb-2 opacity-50" />
            <span className="text-sm">No services configured</span>
          </div>
        )}
      </div>
    </div>
  );
};
