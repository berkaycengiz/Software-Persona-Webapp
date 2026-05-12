import React, { useState, useEffect } from 'react';
import type { IProject, IService } from '../interfaces';
import { X, Plus, Save } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: IProject) => void;
  initialData?: IProject | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<IProject>({
    id: '',
    name: '',
    description: '',
    techStack: [],
    environment: 'Development',
    services: []
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } 
    else {
      setFormData({
        id: crypto.randomUUID(),
        name: '',
        description: '',
        techStack: [],
        environment: 'Development',
        services: []
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.techStack.includes(techInput.trim())) {
        setFormData({ ...formData, techStack: [...formData.techStack, techInput.trim()] });
      }
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({ ...formData, techStack: formData.techStack.filter(t => t !== tech) });
  };

  const handleAddService = () => {
    const newService: IService = {
      id: crypto.randomUUID(),
      serviceName: '',
      endpoint: '',
      method: 'GET',
      authType: 'None'
    };
    setFormData({ ...formData, services: [...formData.services, newService] });
  };

  const handleUpdateService = (id: string, field: keyof IService, value: string) => {
    setFormData({
      ...formData,
      services: formData.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const handleRemoveService = (id: string) => {
    setFormData({ ...formData, services: formData.services.filter(s => s.id !== id) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {initialData ? 'Edit Project' : 'New Project'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Project Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g. Auth Service"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Environment</label>
                  <select
                    value={formData.environment}
                    onChange={(e) => setFormData({ ...formData, environment: e.target.value as IProject['environment'] })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="Development">Development</option>
                    <option value="Staging">Staging</option>
                    <option value="Production">Production</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all h-20 resize-none"
                  placeholder="Brief description of the project..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tech Stack</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.techStack.map(tech => (
                    <span key={tech} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {tech}
                      <button type="button" onClick={() => removeTech(tech)} className="ml-1.5 hover:text-indigo-800 dark:hover:text-indigo-200 focus:outline-none">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleAddTech}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Type a technology and press Enter..."
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">API Endpoints</h3>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="inline-flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Endpoint
                </button>
              </div>

              {formData.services.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 border-dashed">
                  <p className="text-sm text-slate-400 dark:text-slate-500">No endpoints added yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.services.map((service) => (
                    <div key={service.id} className="p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service.id)}
                        className="absolute -top-2 -right-2 bg-slate-200 dark:bg-slate-700 hover:bg-rose-500 text-slate-600 dark:text-slate-300 hover:text-white p-1 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          required
                          type="text"
                          value={service.serviceName}
                          onChange={(e) => handleUpdateService(service.id, 'serviceName', e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Endpoint Name (e.g. Get Users)"
                        />
                        <div className="flex gap-2">
                          <select
                            value={service.method}
                            onChange={(e) => handleUpdateService(service.id, 'method', e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-24"
                          >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="PATCH">PATCH</option>
                            <option value="DELETE">DELETE</option>
                          </select>
                          <select
                            value={service.authType}
                            onChange={(e) => handleUpdateService(service.id, 'authType', e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-1"
                          >
                            <option value="None">No Auth</option>
                            <option value="Bearer">Bearer Token</option>
                            <option value="API Key">API Key</option>
                            <option value="Basic">Basic Auth</option>
                          </select>
                        </div>
                      </div>
                      <input
                        required
                        type="text"
                        value={service.endpoint}
                        onChange={(e) => handleUpdateService(service.id, 'endpoint', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-mono rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="/api/v1/users"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            form="project-form"
            type="submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};
