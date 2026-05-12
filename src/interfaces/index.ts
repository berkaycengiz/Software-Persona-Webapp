export interface IService {
  id: string;
  serviceName: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  authType: 'None' | 'Bearer' | 'API Key' | 'Basic';
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  environment: 'Development' | 'Staging' | 'Production';
  services: IService[];
}
