import data from './projects.json';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  image: string;
  live: string;
  github: string;
  research: string;
}

export const initialProjects: Project[] = data;
