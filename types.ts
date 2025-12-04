export type ArtifactType = 'image' | 'photo' | 'blueprint' | 'model3d';

export interface Artifact {
  id: string;
  title: string;
  description: string;
  type: ArtifactType;
  url: string; // Image URL or model thumbnail
  modelUrl?: string; // Optional specific URL for 3D viewer
  date?: string;
}

export interface Collection {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  artifacts: Artifact[];
  themeColor: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}